import React, { useState } from 'react';
import '../styles/UploadImage.css';
import axios from '../api/axios';
import styled from 'styled-components';

const FileUpload = () => {
    const [imageSrc, setImageSrc] = useState(null);

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
        // 이미지가 업로드되었는지 확인
        if (!imageSrc) {
            console.error('No image uploaded');
            return;
        }

        try {
            // FormData 객체를 생성하고 이미지 데이터를 추가
            const formData = new FormData();
            formData.append('image', dataURItoBlob(imageSrc));

            // 서버에 이미지를 업로드
            const response = await axios.post('/api/upload', formData);

            // 업로드된 이미지의 URL을 콘솔에 출력
            console.log('Uploaded Image URL:', response.data.imageUrl);
        } catch (error) {
            console.error('Image upload error', error);
        }
    };

    // Data URI를 Blob으로 변환하는 함수
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

    return (
        <FileUploadContainer>
            <UploadButton
                type='button'
                onClick={() =>
                    document.querySelector('.file-upload-input').click()
                }
            >
                Add Image
            </UploadButton>
            {imageSrc && (
                <FileUploadContent>
                    <FileUploadImage src={imageSrc} alt='your image' />
                    <div className='image-title-wrap'>
                        <RemoveImageButton onClick={removeUpload}>
                            Remove Image
                        </RemoveImageButton>
                    </div>
                </FileUploadContent>
            )}
            {!imageSrc && (
                <ImageUploadWrap>
                    <FileUploadInput
                        className='file-upload-input'
                        type='file'
                        onChange={(e) => readURL(e.target)}
                        accept='image/*'
                    />
                    <DragText>
                        <DragTextH3>
                            Drag and drop a file or select add Image
                        </DragTextH3>
                    </DragText>
                </ImageUploadWrap>
            )}
            <UploadButton onClick={handleSubmit}>Submit Image</UploadButton>
        </FileUploadContainer>
    );
};

export default FileUpload;

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
    max-height: 15rem;
    max-width: 15rem;
    margin: auto;
    padding: 1rem;
`;
