'use client';

import React from 'react';

const DistanceAxis = () => {
  const markers = [
    { distance: '384,400 km', position: 'top-0' },
    { distance: '288,300 km', position: 'top-1/4' },
    { distance: '192,200 km', position: 'top-1/2' },
    { distance: '96,100 km', position: 'top-3/4' },
    { distance: '0 km', position: 'bottom-0' },
  ];

  return (
    <div className="absolute left-4 top-0 bottom-0 flex items-stretch">
      {/* Vertical line */}
      <div className="relative w-0.5 bg-white/30">
        {markers.map((marker, index) => (
          <div
            key={index}
            className={`absolute ${marker.position} -translate-y-1/2 flex items-center flex-row-reverse`}
          >
            {/* Distance label */}
            <span className="mr-2 text-xs text-white/70 whitespace-nowrap font-medium">
              {marker.distance}
            </span>

            {/* Tick mark */}
            <div className="w-3 h-0.5 bg-white/50"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistanceAxis;
