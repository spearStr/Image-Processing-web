import React, { useState } from 'react';
// import axios from 'axios';
import '../styles/UploadImage.css';

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
        // if (!imageSrc) {
        //     console.error('No image uploaded');
        //     return;
        // }

        // try {
        //     // FormData 객체를 생성하고 이미지 데이터를 추가
        //     const formData = new FormData();
        //     formData.append('image', dataURItoBlob(imageSrc));

        //     // 서버에 이미지를 업로드
        //     const response = await axios.post('/api/upload', formData);

        //     // 업로드된 이미지의 URL을 콘솔에 출력
        //     console.log('Uploaded Image URL:', response.data.imageUrl);
        // } catch (error) {
        //     console.error('Image upload error', error);
        // }
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
        <div className="file-upload">
            <div className="image-upload-wrap">
                <input className="file-upload-input" type="file" onChange={(e) => readURL(e.target)} accept="image/*" />
                <div className="drag-text">
                    <h3>Drag and drop a file or select add Image</h3>
                </div>
            </div>
            <button className="file-upload-btn" type="button" onClick={() => document.querySelector('.file-upload-input').click()}>
                Add Image
            </button>
            <button className="file-upload-btn" type="button" onClick={handleSubmit}>
                Submit Image
            </button>
            {imageSrc && (
                <div className="file-upload-content">
                    <img className="file-upload-image" src={imageSrc} alt="your image" />
                    <div className="image-title-wrap">
                        <button type="button" onClick={removeUpload} className="remove-image">
                            Remove <span className="image-title">Uploaded Image</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
