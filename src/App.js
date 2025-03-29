import styled from 'styled-components';
import SidebarComponent from './components/Sidebar';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #1f2a33;
`;

function App() {
  return (
    <AppContainer>
      <SidebarComponent />
      <Content>
      </Content>
    </AppContainer>
  );
}

export default App;