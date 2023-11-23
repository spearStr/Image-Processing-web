import React, { useState } from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderContainer>
            <p>Image Processing</p>
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
