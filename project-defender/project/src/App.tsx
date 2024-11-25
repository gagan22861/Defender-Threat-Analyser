import React from 'react';
import { Navigation } from './components/Navigation';
import { FileUploader } from './components/FileUploader';
import { UrlScanner } from './components/UrlScanner';
import { PhoneTracker } from './components/PhoneTracker';
import { Activity, Database, Lock, ChevronRight, Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Security Analysis Platform
          </h1>
          <p className="text-xl text-gray-600">
            Detect malware, analyze signatures, and secure your digital assets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">File Analysis</h2>
            <FileUploader />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">URL Scanner</h2>
            <UrlScanner />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Phone Number Locator</h2>
          <PhoneTracker />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Activity className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Advanced Analysis</h3>
            <p className="text-gray-600">Multiple hash algorithms and signature detection for comprehensive security analysis</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Database className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Encryption</h3>
            <p className="text-gray-600">AES-256 encryption with secure key management and JWT authentication</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Lock className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Digital Signatures</h3>
            <p className="text-gray-600">RSA key pair generation and secure file signatures</p>
          </div>
        </div>

        {/* Latest Threats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-16">
          <h2 className="text-2xl font-bold mb-6">Latest Detected Threats</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">Suspicious_file_{i}.exe</p>
                  <p className="text-sm text-gray-500">Detected 2 minutes ago</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Lock className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-lg font-bold">Defender</span>
              </div>
              <p className="mt-4 text-gray-600">
                Advanced security analysis platform with military-grade encryption
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Security</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">File Analysis</a></li>
                <li><a href="#" className="hover:text-blue-600">URL Scanner</a></li>
                <li><a href="#" className="hover:text-blue-600">Phone Tracker</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600">Security Blog</a></li>
                <li><a href="#" className="hover:text-blue-600">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 flex items-center">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </a>
                </li>
                <li><a href="#" className="hover:text-blue-600">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© {new Date().getFullYear()} Defender. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;