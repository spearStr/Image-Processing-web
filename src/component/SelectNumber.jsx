import React, { useState } from 'react';
import styled from 'styled-components';

const SelectNumber = ({ onChange, length }) => {
    const [selectedNumber, setSelectedNumber] = useState(0);

    const numbers = Array.from({ length: length }, (_, index) => index + 1);

    const handleSelectChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setSelectedNumber(selectedValue);
        onChange(selectedValue);
    };

    return (
        <SelectBox onChange={handleSelectChange} value={selectedNumber}>
            {numbers.map((number) => (
                <SelectOption key={number} value={number}>
                    {number}
                </SelectOption>
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
