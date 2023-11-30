import React, { useState } from 'react';
import styled from 'styled-components';
import SelectContent from './SelectContent';
import { IoClose } from 'react-icons/io5';
import SelectNumber from './SelectNumber';

const Option = ({ onAdd, onRemove, length }) => {
    const [number, setNumber] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [mode, setMode] = useState('');
    const [saved, setSaved] = useState(false);

    const handleAddClick = () => {
        onAdd({ number: number, change: mode });
        console.log(number, mode);
        setSaved(true);
        setNumber('');
        setMode('');
    };

    const handleRemoveClick = (number) => {
        onRemove(number);
    };

    const handleSelectMode = (mode) => {
        setMode(mode);
    };

    const handleNumber = (number) => {
        setNumber(number);
    };

    return (
        <AddOptionContainer>
            <InputContainer>
                <InputLabel>Number</InputLabel>
                <SelectNumber onChange={handleNumber} length={length} />
            </InputContainer>
            <InputContainer>
                <InputLabel>Mode</InputLabel>
                <SelectContent onChange={handleSelectMode} mode={mode} />
            </InputContainer>
            <ButtonContainer>
                {!saved && (
                    <ActionButton onClick={handleAddClick}>Save</ActionButton>
                )}
                <IoClose
                    size={'2rem'}
                    onClick={() => handleRemoveClick(number)}
                />
            </ButtonContainer>
        </AddOptionContainer>
    );
};

export default Option;

const AddOptionContainer = styled.div`
    display: flex;
    margin-bottom: 1rem;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.div`
    display: flex;
    margin-bottom: 0.5rem;
    align-items: center;
`;

const InputLabel = styled.label`
    margin-right: 0.5rem;
    align-items: center;
`;

const InputField = styled.input`
    padding: 0.5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const ActionButton = styled.button`
    flex: 1;
    margin-right: 0.5rem;
    background: #1fb264;
    color: #fff;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
`;

const RemoveButton = styled.button`
    flex: 1;
    background: #e74c3c;
    color: #fff;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
`;
