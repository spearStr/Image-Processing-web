import React from 'react';
import { styled } from 'styled-components';
import Header from '../component/Header';
import CropImage from '../component/CropImage';

export default function Crop() {
    return (
        <HomeContainer>
            <Header />
            <InfoMessage>
                <p>Write A Number You Want To Change (Maximum 3) And Select Menu</p>
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

const InfoMessage = styled.p`
    font-size: larger;
    font-weight: 600;
`;
