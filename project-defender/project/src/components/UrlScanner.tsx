import React, { useState } from 'react';
import { Globe, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import isURL from 'validator/lib/isURL';
import { calculateUrlSignature } from '../utils/urlUtils';

export const UrlScanner = () => {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isURL(url)) {
      setError('Please enter a valid URL');
      return;
    }
    
    setError('');
    setScanning(true);
    try {
      const result = await calculateUrlSignature(url);
      setScanResult(result);
    } catch (err) {
      setError('Failed to scan URL. Please try again.');
    }
    setScanning(false);
  };

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-6">
          <Globe className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">URL Security Scanner</h2>
        </div>

        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Enter URL to scan
            </label>
            <div className="relative">
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={scanning}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn"
              >
                {scanning ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scanning...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Scan URL
                  </div>
                )}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>
        </form>

        {scanResult && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-medium">Scan Complete</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <span className="font-medium">Domain Analysis:</span>
                <p className="mt-1 text-gray-600">{scanResult.domain}</p>
              </div>
              
              <div>
                <span className="font-medium">SSL Certificate:</span>
                <p className={`mt-1 ${scanResult.ssl ? 'text-green-600' : 'text-red-600'}`}>
                  {scanResult.ssl ? 'Valid SSL Certificate' : 'No SSL Certificate'}
                </p>
              </div>

              <div>
                <span className="font-medium">Security Headers:</span>
                <ul className="mt-1 space-y-1">
                  {Object.entries(scanResult.headers).map(([header, present]: [string, any]) => (
                    <li key={header} className="flex items-center text-sm">
                      {present ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                      )}
                      {header}: {present ? 'Present' : 'Missing'}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-medium">Risk Assessment:</span>
                <div className={`mt-2 px-3 py-1 rounded-full inline-flex items-center
                  ${scanResult.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                    scanResult.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  <Shield className="h-4 w-4 mr-1" />
                  {scanResult.riskLevel} Risk
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};