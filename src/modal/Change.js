import React, { useState } from 'react';
import { styled } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';
import SelectNumber from '../component/SelectNumber';
import SelectContent from '../component/SelectContent';

const Change = ({ setChangeModalOpen, onSave, imageInfo, selectedFaces }) => {
    const [mode, setMode] = useState('');
    const [number, setNumber] = useState(-1);

    const handleAddClick = () => {
        const newInfo = {
            number: number,
            change: mode,
            box: imageInfo.coordinates[number],
        };
        if (newInfo.number === -1 || newInfo.change === '') {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Value',
                text: 'Select A Value Both Number and Mode Correctly',
            });
            console.log('invalid');
        } else if (
            selectedFaces.some((face) => face.number === newInfo.number)
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicated Number',
                text: 'Select Another Number Because Of Duplication',
            });
            console.log('duplicated');
        } else {
            onSave(newInfo);
            setMode('');
            setChangeModalOpen(false);
            console.log('newInfo', newInfo);
        }
    };

    const handleSelectMode = (selectedMode) => {
        setMode(selectedMode);
    };

    const handleNumber = (selectedNumber) => {
        setNumber(selectedNumber);
        console.log(selectedNumber);
    };

    return (
        <AddOptionContainer>
            <InputContainer>
                <InputLabel>Number</InputLabel>
                <SelectNumber
                    onChange={handleNumber}
                    length={imageInfo.coordinates.length}
                />
            </InputContainer>
            <InputContainer>
                <InputLabel>Mode</InputLabel>
                <SelectContent onChange={handleSelectMode} mode={mode} />
            </InputContainer>
            <ButtonContainer>
                <ActionButton onClick={handleAddClick}>Save</ActionButton>
                <IoClose
                    size={'2rem'}
                    onClick={() => setChangeModalOpen(false)}
                />
            </ButtonContainer>
        </AddOptionContainer>
    );
};

export default Change;

const AddOptionContainer = styled.div`
    display: flex;
    margin-bottom: 1rem;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const InputLabel = styled.label`
    margin-right: 0.5rem;
    align-items: center;
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
