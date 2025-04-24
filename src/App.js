import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Favorites from './components/Favorites';
import Home from './components/Home';
import ItemDetail from './components/ItemDetail';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import { ItemsProvider } from './context/ItemsContext';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #141414;
`;

const ContentContainer = styled.main`
  flex: 1;
  margin-left: 0;
  transition: margin-left 0.3s ease;
  width: 100%;
  overflow-x: hidden;
  
  @media (min-width: 769px) {
    margin-left: 250px;
  }
`;

const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  
  body {
    background-color: #141414;
    color: #e5e5e5;
    overflow-x: hidden;
  }
`;

function App() {
  return (
    <ItemsProvider>
      <Router>
        <GlobalStyle />
        <AppContainer>
          <Sidebar />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/perfil" element={<Profile />} />
            </Routes>
          </ContentContainer>
        </AppContainer>
      </Router>
    </ItemsProvider>
  );
}

export default App;
