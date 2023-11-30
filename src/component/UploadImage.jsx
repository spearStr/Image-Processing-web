import React, { useState } from 'react';
import '../styles/UploadImage.css';
import axios from '../api/axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import requests from '../api/requests';

const UploadImage = () => {
    const [imageSrc, setImageSrc] = useState(null);

    const navigate = useNavigate();

    const readURL = (input) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setImageSrc(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    const removeUpload = () => {
        setImageSrc(null);
    };

    const handleSubmit = async () => {
        // check if image is uploaded
        if (!imageSrc) {
            console.error('No image uploaded');
            return;
        }

        try {
            // FormData : create object and add image
            const formData = new FormData();
            formData.append('file', dataURItoBlob(imageSrc), 'example.png');
            let timerInterval;
            Swal.fire({
                title: 'Analyzing Face Detection...',
                html: '<b></b>ms left!!',
                timer: 2000,
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
            // upload image to server
            const response = await axios.post(requests.fetchUpload, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // print uploaded image's URL to console
            console.log('Uploaded Image URL:', response);
            navigate('/crop', {
                state: {
                    image: response.data.Image,
                    coordinates: response.data.boxes,
                    name: response.data.crop_images_dir,
                    file_id: response.data.id,
                },
            });
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

    const removeContainer = () => (
        <FileUploadContent>
            <FileUploadImage src={imageSrc} alt='your image' />
            <div className='image-title-wrap'>
                <RemoveImageButton onClick={removeUpload}>
                    Remove Image
                </RemoveImageButton>
            </div>
        </FileUploadContent>
    );

    const renderContainer = () => (
        <ImageUploadWrap>
            <FileUploadInput
                className='file-upload-input'
                type='file'
                onChange={(e) => readURL(e.target)}
                accept='image/*'
                encType='multipart/form-data'
            />
            <DragText>
                <DragTextH3>
                    Drag and drop a file or select add Image
                </DragTextH3>
            </DragText>
        </ImageUploadWrap>
    );

    return (
        <FileUploadContainer>
            {!imageSrc && (
                <UploadButton
                    type='button'
                    onClick={() =>
                        document.querySelector('.file-upload-input').click()
                    }
                >
                    Add Image
                </UploadButton>
            )}
            {imageSrc ? removeContainer() : renderContainer()}
            <UploadButton onClick={handleSubmit}>Submit Image</UploadButton>
        </FileUploadContainer>
    );
};

export default UploadImage;

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

const RemoveImageButton = styled.button`
    width: 20rem;
    margin: 0;
    color: #fff;
    background: #cd4535;
    border: none;
    padding: 1rem;
    border-radius: 4px;
    border-bottom: 4px solid #b02818;
    transition: all 0.2s ease;
    outline: none;
    text-transform: uppercase;
    font-weight: 700;

    &:hover {
        background: #c13b2a;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    &:active {
        border: 0;
        transition: all 0.2s ease;
    }
`;

const DragText = styled.div`
    text-align: center;
`;

const DragTextH3 = styled.h3`
    font-weight: 100;
    color: #15824b;
    padding: 5rem 0;
`;

const FileUploadImage = styled.img`
    max-height: 30rem;
    max-width: 25rem;
    margin: auto;
    padding: 1rem;
`;
