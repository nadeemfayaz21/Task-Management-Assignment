'use client';

import { useState } from 'react';

interface InputProps {
  label: string;
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export default function Input({ label, type, name, value, onChange, required = false, placeholder }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none ${
          isFocused
            ? 'border-blue-500 bg-blue-50 shadow-md'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
      />
    </div>
  );
}
