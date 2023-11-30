import React, { useState } from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderContainer>
            <TitleBox>Image Processing</TitleBox>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    font-size: xx-large;
    padding: 1rem;
    background-color: #f5f5f5;
    justify-content: center;
    align-items: center;
`;

const TitleBox = styled.p`
    font-size: xx-large;
    font-weight: 800;
`