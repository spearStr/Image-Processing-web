import React, { useState, useEffect } from 'react';
import '../styles/UploadImage.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ResultImage = () => {
    const [image, setImage] = useState(null);

    const location = useLocation();
    const imageInfo = { ...location.state };

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

    const handleSubmit = () => {
        navigate('/');
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
            <UploadButton onClick={handleSubmit}>Retry</UploadButton>
        </FileUploadContainer>
    );
};

export default ResultImage;

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
