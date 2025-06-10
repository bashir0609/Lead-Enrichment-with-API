// Simple test component - replace your LeadEnrichmentPlatform.js content with this temporarily
import React from 'react';

const LeadEnrichmentPlatform = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          LeadFlow - Lead Enrichment Platform
        </h1>
        <p className="text-gray-600 mb-8">
          Application is loading successfully!
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold mb-4">System Check</h2>
          <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>React App Running</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Tailwind CSS Loaded</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Components Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadEnrichmentPlatform;
