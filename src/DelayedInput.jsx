import React, { useState, useEffect } from 'react';

const DelayedInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayedValue, setDisplayedValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayedValue(inputValue);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="number"
        step="0.1"
        min="0"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div>
        <label>Displayed Value:</label>
        <span>{displayedValue}</span>
      </div>
    </div>
  );
};

export default DelayedInput;
