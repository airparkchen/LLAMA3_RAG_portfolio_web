import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const CalorieEstimator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('http://localhost:8000/api/calories/estimate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Food Calorie Estimator</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Upload Area */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Food Image
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        {preview && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto rounded-lg"
              />
              <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {loading ? 'Analyzing...' : 'Start Analysis'}
              </button>
            </div>
          </div>
        )}

        {/* Results Area */}
        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Analysis Result</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieEstimator;