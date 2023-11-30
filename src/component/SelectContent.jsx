import React, { useState } from 'react';
import styled from 'styled-components';

const SelectContent = ({ onChange, mode }) => {
    const defaultMode = 'big_laugh';
    const [selectedMode, setSelectedMode] = useState(defaultMode);

    const modeArray = [
        { key: 'Big Laugh', value: 'big_laugh' },
        { key: 'Smile', value: 'smile' },
        { key: 'Sad', value: 'sad' },
        { key: 'Pouting', value: 'pouting' },
        { key: 'Open Eyes', value: 'open_eyes' },
        { key: 'Mosaic', value: 'mosaic' },
    ];

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedMode(selectedValue);
        onChange(selectedValue);
    };

    return (
        <SelectBox onChange={handleSelectChange} value={selectedMode}>
            {!selectedMode && (
                <SelectOption value="" disabled hidden>
                    Select an option
                </SelectOption>
            )}
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
