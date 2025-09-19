import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, name, error, value: propValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(propValue || '');
  const [selectedLabel, setSelectedLabel] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (propValue !== undefined) {
      setSelectedValue(propValue);
      const selectedOption = options.find(opt => opt.value === propValue);
      if (selectedOption) {
        setSelectedLabel(selectedOption.label);
      }
    }
  }, [propValue, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value, label) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  const selectedOption = options.find(opt => opt.value === selectedValue) || options[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <input type="hidden" name={name} value={selectedValue} />
      <div 
        className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedValue ? 'text-gray-800' : 'text-gray-500'}>
          {selectedLabel || selectedOption?.label}
        </span>
        <span className="text-gray-500">
          <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </span>
      </div>

      {isOpen && (
        <div 
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-3 cursor-pointer transition-colors duration-200 ${
                option.value === selectedValue
                  ? 'bg-primary-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSelect(option.value, option.label)}
              role="option"
              aria-selected={option.value === selectedValue}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;