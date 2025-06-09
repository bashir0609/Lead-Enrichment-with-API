import React, { useState, useRef } from 'react';
import { 
  X, Upload, FileText, AlertCircle, CheckCircle, 
  Download, Eye, ArrowRight, Loader, Info
} from 'lucide-react';

const UploadModal = ({ onClose, onUpload, type = 'contacts' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1); // 1: Upload, 2: Preview, 3: Configure
  const [csvData, setCsvData] = useState([]);
  const [columnMapping, setColumnMapping] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Sample templates for different types
  const templates = {
    contacts: {
      name: 'contacts_template.csv',
      columns: ['firstName', 'lastName', 'email', 'company', 'jobTitle', 'location', 'phone', 'linkedinUrl'],
      sampleData: [
        ['John', 'Doe', 'john.doe@company.com', 'Tech Corp', 'Sales Manager', 'New York, NY', '+1-555-0123', 'https://linkedin.com/in/johndoe'],
        ['Jane', 'Smith', '', 'StartupXYZ', 'Marketing Director', 'San Francisco, CA', '', '']
      ]
    },
    companies: {
      name: 'companies_template.csv',
      columns: ['name', 'domain', 'industry', 'size', 'location', 'revenue', 'description'],
      sampleData: [
        ['Tech Corp', 'techcorp.com', 'Software', '201-500', 'New York, NY', '$50M-$100M', 'Enterprise software solutions'],
        ['StartupXYZ', 'startupxyz.com', 'Technology', '11-50', 'San Francisco, CA', '$1M-$10M', 'AI-powered analytics']
      ]
    }
  };

  const currentTemplate = templates[type];

  // Handle file selection
  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      parseCSV(selectedFile);
    } else {
      alert('Please select a valid CSV file.');
    }
  };

  // Parse CSV file
  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        alert('CSV file must contain at least a header row and one data row.');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const data = lines.slice(1, 6).map(line => // Show max 5 preview rows
        line.split(',').map(cell => cell.trim().replace(/"/g, ''))
      );

      setCsvData({ headers, data, totalRows: lines.length - 1 });
      
      // Auto-map columns
      const mapping = {};
      headers.forEach(header => {
        const normalized = header.toLowerCase().replace(/[^a-z]/g, '');
        const matches = {
          'firstname': 'firstName',
          'lastname': 'lastName',
          'email': 'email',
          'company': 'company',
          'jobtitle': 'jobTitle',
          'location': 'location',
          'phone': 'phone',
          'linkedin': 'linkedinUrl',
          'name': 'name',
          'domain': 'domain',
          'industry': 'industry',
          'size': 'size',
          'revenue': 'revenue',
          'description': 'description'
        };
        
        Object.keys(matches).forEach(key => {
          if (normalized.includes(key)) {
            mapping[header] = matches[key];
          }
        });
      });
      
      setColumnMapping(mapping);
      setStep(2);
    };
    reader.readAsText(file);
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Generate sample template
  const downloadTemplate = () => {
    const csvContent = [
      currentTemplate.columns.join(','),
      ...currentTemplate.sampleData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentTemplate.name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle upload
  const handleUpload = async () => {
    setUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onUpload(file, columnMapping);
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  // Get mapped field count
  const mappedFields = Object.values(columnMapping).filter(Boolean).length;
  const requiredFields = type === 'contacts' ? ['firstName', 'lastName'] : ['name'];
  const hasRequiredFields = requiredFields.every(field => 
    Object.values(columnMapping).includes(field)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Upload {type === 'contacts' ? 'Contacts' : 'Companies'} CSV
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Step {step} of 3: {step === 1 ? 'Select File' : step === 2 ? 'Preview Data' : 'Configure Mapping'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNum < step ? <CheckCircle className="h-4 w-4" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`flex-1 h-1 rounded ${
                    stepNum < step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Step 1: File Upload */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Drop your CSV file here
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  or click to browse and select a file
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
              </div>

              {/* Template Download */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Need a template?
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                      Download our CSV template with the correct column format for {type}.
                    </p>
                    <button
                      onClick={downloadTemplate}
                      className="inline-flex items-center space-x-2 text-sm bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded border border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Template</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  CSV Requirements
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• File must be in CSV format (.csv)</li>
                  <li>• First row should contain column headers</li>
                  <li>• {type === 'contacts' ? 'Required: First Name, Last Name' : 'Required: Company Name'}</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Maximum rows: 10,000</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Preview */}
          {step === 2 && csvData.headers && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Data Preview
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Found {csvData.totalRows} rows with {csvData.headers.length} columns
                  </p>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Configure Mapping</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Data Table */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        {csvData.headers.map((header, index) => (
                          <th
                            key={index}
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {csvData.data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                            >
                              {cell || (
                                <span className="text-gray-400 italic">empty</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {csvData.totalRows > 5 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Showing first 5 rows of {csvData.totalRows} total rows
                </p>
              )}
            </div>
          )}

          {/* Step 3: Column Mapping */}
          {step === 3 && csvData.headers && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Map CSV Columns
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Map your CSV columns to our database fields. {mappedFields} of {csvData.headers.length} columns mapped.
                </p>
              </div>

              {/* Mapping Interface */}
              <div className="space-y-3">
                {csvData.headers.map((header, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{header}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Sample: {csvData.data[0]?.[index] || 'No data'}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <select
                        value={columnMapping[header] || ''}
                        onChange={(e) => setColumnMapping(prev => ({
                          ...prev,
                          [header]: e.target.value
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Skip this column</option>
                        {type === 'contacts' ? (
                          <>
                            <option value="firstName">First Name *</option>
                            <option value="lastName">Last Name *</option>
                            <option value="email">Email Address</option>
                            <option value="company">Company</option>
                            <option value="jobTitle">Job Title</option>
                            <option value="location">Location</option>
                            <option value="phone">Phone Number</option>
                            <option value="linkedinUrl">LinkedIn URL</option>
                          </>
                        ) : (
                          <>
                            <option value="name">Company Name *</option>
                            <option value="domain">Domain</option>
                            <option value="industry">Industry</option>
                            <option value="size">Company Size</option>
                            <option value="location">Location</option>
                            <option value="revenue">Revenue</option>
                            <option value="description">Description</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Validation */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Validation Status</h4>
                <div className="space-y-2">
                  {requiredFields.map(field => {
                    const isMapped = Object.values(columnMapping).includes(field);
                    return (
                      <div key={field} className="flex items-center space-x-2">
                        {isMapped ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm ${
                          isMapped ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                        }`}>
                          {field === 'firstName' ? 'First Name' : 
                           field === 'lastName' ? 'Last Name' : 
                           field === 'name' ? 'Company Name' : field} (Required)
                        </span>
                      </div>
                    );
                  })}
                  
                  <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {mappedFields} columns will be imported, {csvData.headers.length - mappedFields} will be skipped
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center space-x-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
            )}
            
            {file && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
                <span>({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            {step === 3 ? (
              <button
                onClick={handleUpload}
                disabled={!hasRequiredFields || uploading}
                className="inline-flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                <span>
                  {uploading ? 'Uploading...' : `Import ${csvData.totalRows} ${type}`}
                </span>
              </button>
            ) : step === 2 ? (
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
