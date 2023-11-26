import React from 'react';
import { styled } from 'styled-components';
import Header from '../component/Header';
import CropImage from '../component/CropImage';

export default function Crop() {
    return (
        <HomeContainer>
            <Header />
            <InfoMessage>
                <p>1. Choose A Face (Maximum 3)</p>
                <p>2. Select Menu</p>
            </InfoMessage>
            <CropImage />
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const InfoMessage = styled.p``;
