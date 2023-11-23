import React from 'react';
import { styled } from 'styled-components';
import Header from '../component/Header';
import UploadImage from '../component/UploadImage';

export default function Home() {
    return (
        <HomeContainer>
            <Header />
            <InfoMessage>
                Upload an image that clearly shows the person's face
            </InfoMessage>
            <UploadImage />
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const InfoMessage = styled.p``;
