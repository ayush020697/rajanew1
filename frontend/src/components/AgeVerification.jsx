import React, { useState, useEffect } from 'react';
import { X, Wine } from 'lucide-react';

export const AgeVerification = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified');
    if (!isVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleVerify = (isOfAge) => {
    if (isOfAge) {
      localStorage.setItem('ageVerified', 'true');
      setIsOpen(false);
    } else {
      alert('You must be 21 or older to access this website.');
      window.location.href = 'https://www.google.com';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="relative bg-zinc-900 border border-amber-500/30 rounded-lg p-8 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500/10 p-4 rounded-full">
              <Wine size={48} className="text-amber-500" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-amber-500 mb-2">Age Verification</h2>
          <p className="text-gray-300 mb-6 text-sm">
            This website contains alcoholic beverages. You must be of legal drinking age to enter.
          </p>

          {/* Logo */}
          <img
            src="https://customer-assets.emergentagent.com/job_d3158cd7-9e2a-4764-8ae8-32eafb7d67a9/artifacts/9wxmcvnh_image.png"
            alt="Rajan Wines"
            className="h-20 w-20 object-contain mx-auto mb-6"
          />

          {/* Question */}
          <p className="text-gray-200 font-semibold mb-6">
            Are you 21 years of age or older?
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => handleVerify(true)}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-300"
            >
              Yes, I am
            </button>
            <button
              onClick={() => handleVerify(false)}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-semibold py-3 px-6 rounded border border-zinc-700 transition-colors duration-300"
            >
              No, I'm not
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-gray-500 text-xs mt-6 leading-relaxed">
            By entering this website, you affirm that you are of legal drinking age in your country of residence.
          </p>
        </div>
      </div>
    </div>
  );
};
