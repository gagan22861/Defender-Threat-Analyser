import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { calculateFileSignature } from '../utils/fileUtils';
import { encryptFile } from '../utils/cryptography';

export const FileUploader = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files?.length) {
      setProcessing(true);
      try {
        const file = files[0];
        const signatures = await calculateFileSignature(file);
        const encrypted = await encryptFile(file);
        
        setFileInfo({
          name: file.name,
          size: file.size,
          type: file.type,
          signatures,
          encrypted
        });
      } catch (error) {
        console.error('Error processing file:', error);
      }
      setProcessing(false);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div
        className={`
          p-8 rounded-xl border-2 border-dashed 
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} 
          transition-colors duration-200
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg text-gray-700">
            Drag and drop files here or
            <button className="mx-2 text-blue-600 hover:text-blue-700 font-medium">
              browse files
            </button>
          </p>
          <p className="mt-2 text-gray-500">Maximum file size: 650MB</p>
        </div>
      </div>

      {processing && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Processing file...</p>
        </div>
      )}

      {fileInfo && !processing && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">File Analysis Results</h3>
          <div className="space-y-3">
            <p><span className="font-medium">Name:</span> {fileInfo.name}</p>
            <p><span className="font-medium">Size:</span> {(fileInfo.size / 1024).toFixed(2)} KB</p>
            <p><span className="font-medium">Type:</span> {fileInfo.type || 'Unknown'}</p>
            <div>
              <p className="font-medium">Signatures:</p>
              <ul className="mt-2 space-y-1">
                <li>MD5: {fileInfo.signatures.md5}</li>
                <li>SHA-256: {fileInfo.signatures.sha256}</li>
              </ul>
            </div>
            <button 
              onClick={() => {
                const blob = new Blob([fileInfo.encrypted], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `encrypted_${fileInfo.name}`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="btn mt-4"
            >
              Download Encrypted File
            </button>
          </div>
        </div>
      )}
    </div>
  );
};