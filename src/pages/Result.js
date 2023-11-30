import React from 'react';
import { styled } from 'styled-components';
import Header from '../component/Header';
import ResultImage from '../component/ResultImage';

export default function Result() {
    return (
        <HomeContainer>
            <Header />
            <InfoMessage>
                <p>Outcome</p>
                <p>If you want to test another image, Retry</p>
            </InfoMessage>
            <ResultImage />
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
