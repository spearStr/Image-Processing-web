import React, { useState, useEffect } from 'react';
import '../styles/UploadImage.css';
import axios from '../api/axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import requests from '../api/requests';
import Change from '../modal/Change';
import Option from './Option';

function findIndexOfRectangle(rectangles, point) {
    // rectangles: [[x1, y1, x2, y2], [x1, y1, x2, y2], ...], point: [x, y]
    for (let i = 0; i < rectangles.length; i++) {
        const rectangle = rectangles[i];

        const x1 = rectangle[0];
        const y1 = rectangle[1];
        const x2 = rectangle[2];
        const y2 = rectangle[3];

        const x = point[0];
        const y = point[1];

        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
            return i;
        }
    }

    return -1;
}

const CropImage = () => {
    const [image, setImage] = useState(null);
    const [selectedFaces, setSelectedFaces] = useState([]);
    const [selectedFaceIndex, setSelectedFaceIndex] = useState(null);
    const [addOptionComponents, setAddOptionComponents] = useState([]);
    const [addCount, setAddCount] = useState(0);

    const location = useLocation();
    const imageInfo = { ...location.state };
    const minNum =
        3 > imageInfo.coordinates.length ? imageInfo.coordinates.length : 3;

    const navigate = useNavigate();

    const asciiToBlob = (asciiString) => {
        const byteCharacters = atob(asciiString);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'image/jpeg' }); // Adjust the type according to your image format
    };

    // const handleImageClick = (event) => {
    //     const clickX = event.clientX - event.target.offsetLeft;
    //     const clickY = event.clientY - event.target.offsetTop;
    //     // coordinates console
    //     console.log(clickX);
    //     console.log(clickY);
    //     console.log(imageInfo.coordinates);

    //     // Check if the click is inside any of the selected faces
    //     const clickedFaceIndex = findIndexOfRectangle(imageInfo.coordinates, [
    //         clickX,
    //         clickY,
    //     ]);
    //     console.log('answer', clickedFaceIndex);
    //     if (clickedFaceIndex !== -1) {
    //         setSelectedFaceIndex(clickedFaceIndex);
    //     }

    //     if (selectedFaces.length < 3) {
    //         setSelectedFaces((prevFaces) => [
    //             ...prevFaces,
    //             {
    //                 number: selectedFaceIndex,
    //                 file_id: imageInfo.name[selectedFaceIndex],
    //             },
    //         ]);
    //         console.log('selectedFaces', selectedFaces);
    //     }
    // };

    const handleSubmit = async () => {
        try {
            //const cropInfo = selectedFaces;
            const cropInfo = [
                { number: 0, change: 'pouting', box: imageInfo.coordinates[0] },
                {
                    number: 1,
                    change: 'big_laugh',
                    box: imageInfo.coordinates[1],
                },
                { number: 2, change: 'sad', box: imageInfo.coordinates[2] },
            ];
            let timerInterval;
            Swal.fire({
                title: 'Analyzing Face Detection...',
                html: '<b></b>ms left!!',
                timer: 4000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector('b');
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
            const response = await axios.post(
                `${requests.fetchChange}/${imageInfo.file_id}`,
                cropInfo
            );

            // print uploaded image's URL to console
            console.log('Uploaded Image URL:', response.data.change);
            navigate('/result', {
                state: {
                    image: response.data.change,
                },
            });
        } catch (error) {
            console.error('Image upload error', error);
        }
    };

    const handleAddOption = (option) => {
        if (addCount < minNum) {
            setAddOptionComponents((prev) => [...prev, option]);
            console.log(addOptionComponents);
        }
    };

    const handleRemoveOption = (number) => {
        setAddOptionComponents((prev) =>
            prev.filter((option) => option.number !== number)
        );
        setAddCount(addCount - 1);
    };

    const handleAdd = () => {
        setAddCount((prev) => prev + 1);
        handleAddOption({
            number: addCount,
            change: '', // Set the appropriate initial value
            box: [0, 0, 0, 0], // Set the appropriate initial value
        });
    };

    useEffect(() => {
        const blob = asciiToBlob(imageInfo.image);
        setImage(blob);
    }, []);

    return (
        <FileUploadContainer>
            {image && (
                <FileUploadImage
                    src={URL.createObjectURL(asciiToBlob(imageInfo.image))}
                    alt='image'
                />
            )}
            {addOptionComponents.map((option) => (
                <Option
                    key={option.number}
                    onAdd={(newOption) => handleAddOption(newOption)}
                    onRemove={(number) => handleRemoveOption(number)}
                    length={imageInfo.coordinates.length}
                />
            ))}
            <ButtonContainer>
                {addCount < minNum && (
                    <UploadButton onClick={handleAdd}>Add Option</UploadButton>
                )}
                <UploadButton onClick={handleSubmit}>Change Image</UploadButton>
            </ButtonContainer>
        </FileUploadContainer>
    );
};

export default CropImage;

const FileUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    width: 40rem;
    margin: 0 auto;
    padding: 1rem;
`;

const UploadButton = styled.button`
    width: 100%;
    margin: 0 0 1rem 0;
    color: #fff;
    background: #1fb264;
    border: none;
    padding: 1rem;
    border-radius: 4px;
    border-bottom: 4px solid #15824b;
    transition: all 0.2s ease;
    outline: none;
    text-transform: uppercase;
    font-weight: 700;

    &:hover {
        background: #1aa059;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    &:active {
        border: 0;
        transition: all 0.2s ease;
    }
`;

const FileUploadContent = styled.div`
    text-align: center;
    width: 100%;
`;

const FileUploadInput = styled.input`
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
`;

const FileUploadImage = styled.img`
    max-height: 30rem;
    max-width: 25rem;
    margin: auto;
    padding: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-between;
`;
