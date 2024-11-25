import React from 'react';
import { Shield } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Defender</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-600">Community</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">API</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};