import React, { useState } from 'react';
import styled from 'styled-components';

const SelectNumber = ({ onChange, length }) => {
  const [selectedNumber, setSelectedNumber] = useState('');

  const numbers = Array.from({ length }, (_, index) => index);

  const handleNumberChange = (event) => {
    const newNumber = parseInt(event.target.value, 10);
    setSelectedNumber(newNumber);
    onChange(newNumber);
  };

  return (
    <SelectBox value={selectedNumber} onChange={handleNumberChange}>
      <option value="" disabled hidden>
        Select Number
      </option>
      {numbers.map((number) => (
        <option key={number} value={number}>
          {number}
        </option>
      ))}
    </SelectBox>
  );
};

export default SelectNumber;


const SelectBox = styled.select`
    display: flex;
    height: 2rem;
    max-width: 11.3rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
`;

const SelectOption = styled.option``;
