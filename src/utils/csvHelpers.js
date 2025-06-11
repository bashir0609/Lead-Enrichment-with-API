// src/utils/csvHelpers.js - CSV processing utilities

/**
 * Parse CSV content and return structured data
 * @param {string} csvContent - Raw CSV content
 * @param {Object} options - Parsing options
 * @returns {Object} Parsed data with headers and rows
 */
export const parseCSV = (csvContent, options = {}) => {
  const {
    delimiter = ',',
    hasHeader = true,
    skipEmptyLines = true,
    trimWhitespace = true
  } = options;

  try {
    const lines = csvContent
      .split('\n')
      .filter(line => skipEmptyLines ? line.trim() : true)
      .map(line => trimWhitespace ? line.trim() : line);

    if (lines.length === 0) {
      throw new Error('CSV file is empty');
    }

    // Parse CSV line respecting quoted values
    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            // Escaped quote
            current += '"';
            i++; // Skip next quote
          } else {
            // Toggle quote state
            inQuotes = !inQuotes;
          }
        } else if (char === delimiter && !inQuotes) {
          // Field separator
          result.push(trimWhitespace ? current.trim() : current);
          current = '';
        } else {
          current += char;
        }
      }
      
      // Add the last field
      result.push(trimWhitespace ? current.trim() : current);
      
      return result;
    };

    const headers = hasHeader ? parseLine(lines[0]) : null;
    const dataStartIndex = hasHeader ? 1 : 0;
    const rows = lines.slice(dataStartIndex).map(parseLine);

    // Validate that all rows have the same number of columns
    const expectedColumns = headers ? headers.length : rows[0]?.length || 0;
    const invalidRows = rows.filter(row => row.length !== expectedColumns);
    
    if (invalidRows.length > 0) {
      console.warn(`Found ${invalidRows.length} rows with mismatched column count`);
    }

    return {
      headers,
      rows: rows.filter(row => row.length === expectedColumns),
      totalRows: rows.length,
      validRows: rows.filter(row => row.length === expectedColumns).length,
      invalidRows: invalidRows.length,
      columnCount: expectedColumns
    };
  } catch (error) {
    throw new Error(`CSV parsing failed: ${error.message}`);
  }
};

/**
 * Convert parsed CSV data to JSON objects
 * @param {Object} parsedData - Data from parseCSV
 * @param {Object} columnMapping - Mapping of CSV columns to object properties
 * @returns {Array} Array of objects
 */
export const csvToObjects = (parsedData, columnMapping = {}) => {
  const { headers, rows } = parsedData;
  
  if (!headers) {
    throw new Error('CSV must have headers to convert to objects');
  }

  return rows.map((row, index) => {
    const obj = { _csvRowIndex: index + 1 };
    
    headers.forEach((header, columnIndex) => {
      const value = row[columnIndex] || '';
      const mappedKey = columnMapping[header] || header;
      
      // Convert empty strings to null for cleaner data
      obj[mappedKey] = value.trim() === '' ? null : value.trim();
    });

    return obj;
  });
};

/**
 * Auto-detect column mappings for contacts
 * @param {Array} headers - CSV headers
 * @returns {Object} Suggested column mappings
 */
export const autoMapContactColumns = (headers) => {
  const mapping = {};
  
  const patterns = {
    firstName: [
      /^first[\s_-]*name$/i,
      /^fname$/i,
      /^f[\s_-]*name$/i,
      /^given[\s_-]*name$/i
    ],
    lastName: [
      /^last[\s_-]*name$/i,
      /^lname$/i,
      /^l[\s_-]*name$/i,
      /^surname$/i,
      /^family[\s_-]*name$/i
    ],
    email: [
      /^email$/i,
      /^e[\s_-]*mail$/i,
      /^email[\s_-]*address$/i,
      /^mail$/i
    ],
    phone: [
      /^phone$/i,
      /^tel$/i,
      /^telephone$/i,
      /^mobile$/i,
      /^cell$/i,
      /^phone[\s_-]*number$/i
    ],
    company: [
      /^company$/i,
      /^organization$/i,
      /^org$/i,
      /^employer$/i,
      /^business$/i
    ],
    jobTitle: [
      /^job[\s_-]*title$/i,
      /^title$/i,
      /^position$/i,
      /^role$/i,
      /^designation$/i
    ],
    location: [
      /^location$/i,
      /^address$/i,
      /^city$/i,
      /^country$/i,
      /^region$/i
    ],
    linkedinUrl: [
      /^linkedin$/i,
      /^linkedin[\s_-]*url$/i,
      /^linkedin[\s_-]*profile$/i,
      /^social$/i
    ]
  };

  headers.forEach(header => {
    const cleanHeader = header.trim();
    
    for (const [fieldName, regexArray] of Object.entries(patterns)) {
      if (regexArray.some(regex => regex.test(cleanHeader))) {
        mapping[header] = fieldName;
        break;
      }
    }
  });

  return mapping;
};

/**
 * Auto-detect column mappings for companies
 * @param {Array} headers - CSV headers
 * @returns {Object} Suggested column mappings
 */
export const autoMapCompanyColumns = (headers) => {
  const mapping = {};
  
  const patterns = {
    name: [
      /^name$/i,
      /^company[\s_-]*name$/i,
      /^business[\s_-]*name$/i,
      /^organization$/i
    ],
    domain: [
      /^domain$/i,
      /^website$/i,
      /^url$/i,
      /^web$/i,
      /^site$/i
    ],
    industry: [
      /^industry$/i,
      /^sector$/i,
      /^business[\s_-]*type$/i,
      /^category$/i
    ],
    size: [
      /^size$/i,
      /^employees$/i,
      /^employee[\s_-]*count$/i,
      /^headcount$/i,
      /^staff$/i
    ],
    location: [
      /^location$/i,
      /^address$/i,
      /^city$/i,
      /^country$/i,
      /^headquarters$/i
    ],
    revenue: [
      /^revenue$/i,
      /^sales$/i,
      /^income$/i,
      /^turnover$/i
    ],
    description: [
      /^description$/i,
      /^about$/i,
      /^summary$/i,
      /^overview$/i
    ]
  };

  headers.forEach(header => {
    const cleanHeader = header.trim();
    
    for (const [fieldName, regexArray] of Object.entries(patterns)) {
      if (regexArray.some(regex => regex.test(cleanHeader))) {
        mapping[header] = fieldName;
        break;
      }
    }
  });

  return mapping;
};

/**
 * Validate contact data
 * @param {Object} contact - Contact object
 * @returns {Object} Validation result
 */
export const validateContact = (contact) => {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!contact.firstName?.trim()) {
    errors.push('First name is required');
  }
  
  if (!contact.lastName?.trim()) {
    errors.push('Last name is required');
  }

  // Email validation
  if (contact.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      errors.push('Invalid email format');
    }
  }

  // Phone validation
  if (contact.phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{10,}$/;
    if (!phoneRegex.test(contact.phone)) {
      warnings.push('Phone number format may be invalid');
    }
  }

  // LinkedIn URL validation
  if (contact.linkedinUrl) {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-]+\/?$/i;
    if (!linkedinRegex.test(contact.linkedinUrl)) {
      warnings.push('LinkedIn URL format may be invalid');
    }
  }

  // Data completeness check
  const fields = ['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle'];
  const filledFields = fields.filter(field => contact[field]?.trim()).length;
  const completeness = Math.round((filledFields / fields.length) * 100);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completeness,
    score: errors.length === 0 ? 100 - warnings.length * 10 : 0
  };
};

/**
 * Validate company data
 * @param {Object} company - Company object
 * @returns {Object} Validation result
 */
export const validateCompany = (company) => {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!company.name?.trim()) {
    errors.push('Company name is required');
  }

  // Domain validation
  if (company.domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(company.domain.replace(/^https?:\/\//, '').replace(/^www\./, ''))) {
      warnings.push('Domain format may be invalid');
    }
  }

  // Size validation
  if (company.size) {
    const sizeRegex = /^\d+[\-\+]?\d*$/;
    if (!sizeRegex.test(company.size.replace(/\s/g, ''))) {
      warnings.push('Company size format may be invalid');
    }
  }

  const fields = ['name', 'domain', 'industry', 'size', 'location'];
  const filledFields = fields.filter(field => company[field]?.trim()).length;
  const completeness = Math.round((filledFields / fields.length) * 100);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completeness,
    score: errors.length === 0 ? 100 - warnings.length * 10 : 0
  };
};

/**
 * Generate CSV content from data array
 * @param {Array} data - Array of objects
 * @param {Array} columns - Column definitions
 * @returns {string} CSV content
 */
export const generateCSV = (data, columns = null) => {
  if (!data || data.length === 0) {
    return '';
  }

  // Auto-detect columns if not provided
  if (!columns) {
    const allKeys = new Set();
    data.forEach(row => {
      Object.keys(row).forEach(key => {
        if (!key.startsWith('_')) { // Skip internal fields
          allKeys.add(key);
        }
      });
    });
    columns = Array.from(allKeys);
  }

  // Escape CSV values
  const escapeCSVValue = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    
    const stringValue = String(value);
    
    // If value contains comma, newline, or quote, wrap in quotes
    if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  };

  // Generate header row
  const headerRow = columns.map(escapeCSVValue).join(',');
  
  // Generate data rows
  const dataRows = data.map(row => 
    columns.map(col => escapeCSVValue(row[col])).join(',')
  );

  return [headerRow, ...dataRows].join('\n');
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV content
 * @param {string} filename - File name
 */
export const downloadCSV = (csvContent, filename = 'export.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Process uploaded file and return parsed data
 * @param {File} file - Uploaded file
 * @param {string} type - Type of data ('contacts' or 'companies')
 * @returns {Promise<Object>} Processed data
 */
export const processUploadedFile = (file, type = 'contacts') => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
      reject(new Error('File must be a CSV'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      reject(new Error('File size must be less than 10MB'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvContent = e.target.result;
        const parsedData = parseCSV(csvContent);
        
        if (parsedData.totalRows === 0) {
          reject(new Error('CSV file contains no data'));
          return;
        }

        // Auto-map columns
        const autoMapping = type === 'contacts' 
          ? autoMapContactColumns(parsedData.headers)
          : autoMapCompanyColumns(parsedData.headers);

        // Convert to objects
        const objects = csvToObjects(parsedData, autoMapping);
        
        // Validate data
        const validationResults = objects.map(obj => 
          type === 'contacts' ? validateContact(obj) : validateCompany(obj)
        );

        const validObjects = objects.filter((_, index) => validationResults[index].isValid);
        const invalidObjects = objects.filter((_, index) => !validationResults[index].isValid);

        resolve({
          parsedData,
          autoMapping,
          objects,
          validObjects,
          invalidObjects,
          validationResults,
          summary: {
            totalRows: parsedData.totalRows,
            validRows: validObjects.length,
            invalidRows: invalidObjects.length,
            successRate: Math.round((validObjects.length / parsedData.totalRows) * 100)
          }
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

/**
 * Generate sample CSV templates
 * @param {string} type - Type of template ('contacts' or 'companies')
 * @returns {string} Sample CSV content
 */
export const generateSampleTemplate = (type = 'contacts') => {
  if (type === 'contacts') {
    const headers = ['firstName', 'lastName', 'email', 'company', 'jobTitle', 'location', 'phone', 'linkedinUrl'];
    const sampleData = [
      ['John', 'Doe', 'john.doe@company.com', 'Tech Corp', 'Sales Manager', 'New York, NY', '+1-555-0123', 'https://linkedin.com/in/johndoe'],
      ['Jane', 'Smith', 'jane.smith@startup.io', 'StartupXYZ', 'Marketing Director', 'San Francisco, CA', '+1-555-0456', 'https://linkedin.com/in/janesmith'],
      ['Bob', 'Johnson', '', 'Global Inc', 'Product Manager', 'Chicago, IL', '', '']
    ];
    
    return generateCSV([
      ...sampleData.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      })
    ], headers);
  } else {
    const headers = ['name', 'domain', 'industry', 'size', 'location', 'revenue', 'description'];
    const sampleData = [
      ['Tech Corp', 'techcorp.com', 'Software', '201-500', 'New York, NY', '$50M-$100M', 'Enterprise software solutions'],
      ['StartupXYZ', 'startupxyz.com', 'Technology', '11-50', 'San Francisco, CA', '$1M-$10M', 'AI-powered analytics platform'],
      ['Global Inc', 'globalinc.com', 'Consulting', '1001-5000', 'Chicago, IL', '$500M+', 'Management consulting services']
    ];
    
    return generateCSV([
      ...sampleData.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      })
    ], headers);
  }
};

// Export default object with all functions
export default {
  parseCSV,
  csvToObjects,
  autoMapContactColumns,
  autoMapCompanyColumns,
  validateContact,
  validateCompany,
  generateCSV,
  downloadCSV,
  processUploadedFile,
  generateSampleTemplate
};
