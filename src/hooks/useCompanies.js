import { useState, useCallback } from 'react';

const useCompanies = (initialCompanies = []) => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [loading, setLoading] = useState(false);

  const addCompany = useCallback((company) => {
    const newCompany = {
      id: Date.now(),
      ...company,
      enriched: false,
      createdAt: new Date(),
      enrichedAt: null
    };
    setCompanies(prev => [...prev, newCompany]);
    return newCompany;
  }, []);

  const updateCompany = useCallback((companyId, updates) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { ...company, ...updates, updatedAt: new Date() }
        : company
    ));
  }, []);

  const deleteCompany = useCallback((companyId) => {
    setCompanies(prev => prev.filter(company => company.id !== companyId));
  }, []);

  const enrichCompanies = useCallback(async (companyIds) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setCompanies(prev => prev.map(company => {
        if (companyIds.includes(company.id) && !company.enriched) {
          return {
            ...company,
            revenue: company.revenue || `$${Math.floor(Math.random() * 100) + 10}M-$${Math.floor(Math.random() * 100) + 50}M`,
            employees: company.employees || `${Math.floor(Math.random() * 500) + 50}-${Math.floor(Math.random() * 500) + 200}`,
            technologies: company.technologies || ['React', 'Node.js', 'AWS', 'PostgreSQL'],
            funding: company.funding || `Series ${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
            enriched: true,
            enrichedAt: new Date()
          };
        }
        return company;
      }));
    } catch (error) {
      console.error('Company enrichment error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const findSimilarCompanies = useCallback(async (companyId) => {
    setLoading(true);
    try {
      // Simulate API call for finding similar companies
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseCompany = companies.find(c => c.id === companyId);
      if (!baseCompany) return [];

      // Generate mock similar companies
      const similarCompanies = Array.from({ length: 5 }, (_, index) => ({
        id: `similar-${Date.now()}-${index}`,
        name: `Similar Corp ${index + 1}`,
        domain: `similar${index + 1}.com`,
        industry: baseCompany.industry,
        size: baseCompany.size,
        location: baseCompany.location,
        similarity: Math.floor(Math.random() * 30) + 70, // 70-100% similarity
        reason: ['Same industry', 'Similar size', 'Geographic proximity'][Math.floor(Math.random() * 3)]
      }));

      return similarCompanies;
    } catch (error) {
      console.error('Similar companies search error:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [companies]);

  const bulkImport = useCallback((companiesData) => {
    const newCompanies = companiesData.map((company, index) => ({
      id: Date.now() + index,
      ...company,
      enriched: false,
      source: 'csv-upload',
      createdAt: new Date(),
      enrichedAt: null
    }));
    
    setCompanies(prev => [...prev, ...newCompanies]);
    return newCompanies;
  }, []);

  const getCompanyStats = useCallback(() => {
    const total = companies.length;
    const enriched = companies.filter(c => c.enriched).length;
    const pending = companies.filter(c => !c.enriched).length;
    const successRate = total > 0 ? Math.round((enriched / total) * 100) : 0;

    // Get industry distribution
    const industries = companies.reduce((acc, company) => {
      acc[company.industry] = (acc[company.industry] || 0) + 1;
      return acc;
    }, {});

    // Get size distribution
    const sizes = companies.reduce((acc, company) => {
      acc[company.size] = (acc[company.size] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      enriched,
      pending,
      successRate,
      industries,
      sizes
    };
  }, [companies]);

  return {
    companies,
    setCompanies,
    loading,
    addCompany,
    updateCompany,
    deleteCompany,
    enrichCompanies,
    findSimilarCompanies,
    bulkImport,
    getCompanyStats
  };
};

export default useCompanies;
