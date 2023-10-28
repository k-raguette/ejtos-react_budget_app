import React, { useContext, useState, useRef } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
  const { currency, dispatch } = useContext(AppContext);

  const currencies = [
    { symbol: '$', label: '$ Dollar' },
    { symbol: '£', label: '£ Pound' },
    { symbol: '€', label: '€ Euro' },
    { symbol: '₹', label: '₹ Rupee' },
  ];

  const updateCurrency = (selectedCurrency) => {
    dispatch({
      type: 'CHG_CURRENCY',
      payload: selectedCurrency,
    });
    toggleDropdown();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown" style={{ cursor: 'pointer' }}>
      <button
        className="btn dropdown-toggle"
        type="button"
        style={{ backgroundColor: '#93e399', color: '#fff' }}
        onClick={toggleDropdown}
      >
        Currency {'('}
        {currencies.find((c) => c.symbol === currency)?.label || ''}
        {')'}
      </button>
      <ul
        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
        ref={dropdownRef}
      >
        {currencies.map((c) => (
          <li key={c.symbol}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => updateCurrency(c.symbol)}
            >
              {c.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Currency;