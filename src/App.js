import './App.css';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Crop from './pages/Crop';

function App() {
    return (
        <RootContainer>
            <OutterContainer>
                <InnerContainer>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/crop' element={<Crop />} />
                    </Routes>
                </InnerContainer>
            </OutterContainer>
        </RootContainer>
    );
}

export default App;

const RootContainer = styled.div`
    display: flex;
    max-height: 100vh;
    flex: 1;
`;

const OutterContainer = styled.div`
    display: flex;
    max-height: 100vh;
    justify-content: center;

    margin: 0 auto;
    flex: 1;
`;

const InnerContainer = styled.div`
    max-width: 100wh;
    flex: 1;
`;
