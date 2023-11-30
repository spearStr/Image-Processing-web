import React from 'react';
import Option from './Option';
import styled from 'styled-components';

export default function AddOption() {
    return (
        <OptionContainer>
            <Option />
            <Option />
            <Option />
        </OptionContainer>
    );
}


const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`