import React, { useState } from 'react';
import { Phone, MapPin, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';
import { getPhoneNumberInfo } from '../utils/phoneUtils';

export const PhoneTracker = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!isValidPhoneNumber(phoneNumber)) {
        setError('Please enter a valid phone number with country code (e.g., +1234567890)');
        return;
      }

      setAnalyzing(true);
      const info = await getPhoneNumberInfo(phoneNumber);
      setResult(info);
    } catch (err) {
      setError('Failed to analyze phone number. Please check the format and try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center mb-6">
          <Phone className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Phone Number Locator</h2>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Enter phone number with country code
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={analyzing}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn"
              >
                {analyzing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Locate
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

        {result && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-medium">Analysis Complete</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Country:</span>
                  <div className="mt-1 flex items-center">
                    <img 
                      src={`https://flagcdn.com/w40/${result.countryCode.toLowerCase()}.png`}
                      alt={result.country}
                      className="h-5 mr-2"
                    />
                    <span className="text-gray-600">{result.country}</span>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium">Region:</span>
                  <p className="mt-1 text-gray-600">{result.region || 'Not available'}</p>
                </div>

                <div>
                  <span className="font-medium">Carrier:</span>
                  <p className="mt-1 text-gray-600">{result.carrier || 'Not available'}</p>
                </div>

                <div>
                  <span className="font-medium">Time Zone:</span>
                  <p className="mt-1 text-gray-600">{result.timeZone}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-medium">Number Format:</span>
                    <div className="mt-1 space-y-1 text-sm text-gray-600">
                      <p>International: {result.formatInternational}</p>
                      <p>National: {result.formatNational}</p>
                      <p>Type: {result.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};