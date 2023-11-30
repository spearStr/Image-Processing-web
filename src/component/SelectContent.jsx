import React, { useState } from 'react';
import styled from 'styled-components';

const SelectContent = ({ onChange, mode }) => {
    const [selectedMode, setSelectedMode] = useState('');

    const modeArray = [
        { key: 'Big Laugh', value: 'big_laugh' },
        { key: 'Smile', value: 'smile' },
        { key: 'Sad', value: 'sad' },
        { key: 'Pouting', value: 'pouting' },
        { key: 'Open Eyes', value: 'open_eyes' },
        { key: 'Mosaic', value: 'mosaic' },
        { key: 'Brightness', value: 'brightness' },
        { key: 'Blur', value: 'blur' },
    ];

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedMode(selectedValue);
        onChange(selectedValue);
    };

    return (
        <SelectBox onChange={handleSelectChange} value={selectedMode}>
            <SelectOption value="" disabled hidden>
                Select Mode
            </SelectOption>
            {modeArray.map((item) => (
                <SelectOption key={item.key} value={item.value}>
                    {item.key}
                </SelectOption>
            ))}
        </SelectBox>
    );
};

export default SelectContent;

const SelectBox = styled.select`
    display: flex;
    height: 2rem;
    max-width: 11.3rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
`;

const SelectOption = styled.option``;
