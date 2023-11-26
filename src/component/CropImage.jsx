import React, { useState, useEffect } from 'react';
import '../styles/UploadImage.css';
import axios from '../api/axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CropImage = () => {
    const [imageSrc, setImageSrc] = useState(null);
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
    const readURL = (input) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setImageSrc(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    const handleSubmit = async () => {
        try {
            // FormData : create object and add image
            const formData = new FormData();
            formData.append('image', dataURItoBlob(imageSrc));

            // upload image to server
            const response = await axios.post('/upload', formData);

            // print uploaded image's URL to console
            console.log('Uploaded Image URL:', response.data.imageUrl);
            navigate('/crop');
        } catch (error) {
            console.error('Image upload error', error);
        }
    };

    // Transfrom Data URI to Blob function
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
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
            <UploadButton onClick={handleSubmit}>Submit Image</UploadButton>
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

const ImageUploadWrap = styled.div`
    margin-bottom: 1rem;
    border: 4px dashed #1fb264;
    position: relative;

    &:hover {
        background-color: #1fb264;
        border: 4px dashed #ffffff;
    }
`;

const FileUploadImage = styled.img`
    max-height: 15rem;
    max-width: 15rem;
    margin: auto;
    padding: 1rem;
`;
