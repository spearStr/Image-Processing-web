import axios from '../api/axios';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import requests from '../api/requests';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';

export default function Change({ name }) {
    const handleSave = () => {
        // setChangeModalOpen(false);
    };

    return (
        <ModalContainer>
            <ModalTitle>
                <ModalDetail>ID : {name}</ModalDetail>
                <IoClose
                    size={'2rem'}
                    // onClick={() => setChangeModalOpen(false)}
                />
            </ModalTitle>
            <Menu>
                <MenuItem>Big Laugh</MenuItem>
                <MenuItem>Pouting</MenuItem>
                <MenuItem>Sad</MenuItem>
                <MenuItem>Smile</MenuItem>
                <MenuItem>Open Eyes</MenuItem>
                <MenuItem>Mosaic</MenuItem>
            </Menu>
            <UploadButton onClick={handleSave}>Save</UploadButton>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: relative;
    background-color: grey;
    border-radius: 0.5rem;
    transition: all 400ms ease-in-out 2s;
    padding: 2rem;
`;

const ModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    align-items: center;
    color: black;
`;

const ModalDetail = styled.p`
    font-weight: 600;
    font-size: 1.5rem;
`;

const InputList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;
    max-height: 60vh;

    &::-webkit-scrollbar {
        width: 5px;
    }

    /* &::-webkit-scrollbar-thumb {
      background-color: gray;
      border-radius: 1rem;
  } */

    &::-webkit-scrollbar-track {
        background-color: white;
    }
`;

const InputLabel = styled.div`
    display: flex;
    flex-direction: column;
    font-size: medium;
    margin: 0.5rem 0;
    gap: 0.5rem;
`;

const InputBox = styled.input`
    border: 0.1rem solid #de496e;
    border-radius: 0.5rem;
    height: 2rem;
    padding: 0 0.5rem;
`;

const SubmitButton = styled.button`
    background-color: #0acf83;
    color: black;
    font-size: large;
    border: 0.1rem solid #0acf83;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    &:hover {
        opacity: 0.7;
    }
`;

const Menu = styled.button`
    display: flex;
    color: black;
    background: white;
    border: 0.1rem solid #3a86ff;
`;

const MenuItem = styled.button`
    padding: 0.3rem 1rem;
    border: 0.5px solid #3a86ff;
    &:hover {
        background-color: #3a86ff;
        opacity: 0.7;
    }
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
