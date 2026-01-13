// components/TrailerModal.tsx
'use client';

import { useState, useEffect } from 'react';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export default function TrailerModal({ isOpen, onClose, videoId }: TrailerModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      {/* Close on Escape */}
      <div 
        className="relative w-full max-w-4xl max-h-[80vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 z-10"
          aria-label="Close trailer"
        >
          &times;
        </button>

        {/* YouTube Player */}
        <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&showinfo=0&controls=1`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
