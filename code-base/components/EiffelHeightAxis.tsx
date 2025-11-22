'use client';

import React from 'react';

const EiffelHeightAxis = () => {
  const markers = [
    { height: '330 m', position: 'top-0' },
    { height: '247 m', position: 'top-1/4' },
    { height: '165 m', position: 'top-1/2' },
    { height: '82 m', position: 'top-3/4' },
    { height: '0 m', position: 'bottom-0' },
  ];

  return (
    <div className="absolute left-4 top-0 bottom-0 flex items-stretch pointer-events-none">
      {/* Vertical line */}
      <div className="relative w-0.5 bg-white/40">
        {markers.map((marker, index) => (
          <div
            key={index}
            className={`absolute ${marker.position} -translate-y-1/2 flex items-center flex-row-reverse`}
          >
            {/* Height label */}
            <span className="mr-2 text-xs text-white/80 whitespace-nowrap font-medium drop-shadow-md">
              {marker.height}
            </span>

            {/* Tick mark */}
            <div className="w-3 h-0.5 bg-white/60"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EiffelHeightAxis;