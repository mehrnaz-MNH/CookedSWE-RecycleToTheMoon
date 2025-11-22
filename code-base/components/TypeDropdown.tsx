'use client';

import React, { useState } from 'react';

type CounterType = 'individual' | 'group';

interface TypeDropdownProps {
  value: CounterType;
  onChange: (type: CounterType) => void;
}

const TypeDropdown = ({ value, onChange }: TypeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'individual' as CounterType, label: 'My Recycling' },
    { value: 'group' as CounterType, label: 'Group Recycling' },
  ];

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white bg-transparent hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">{selectedOption?.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-20 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors ${
                  value === option.value ? 'bg-gray-700' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TypeDropdown;
