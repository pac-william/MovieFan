import React, { useState } from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #e5e5e5;
  margin-bottom: 30px;
  font-size: 32px;
`;

const AdminPanel = styled.div`
  background-color: #181818;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const AdminSection = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: #e5e5e5;
  margin-bottom: 20px;
  font-size: 24px;
`;

const Button = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  font-weight: 600;
  margin-bottom: 10px;
  
  &:hover {
    background-color: #ff0a16;
  }
  
  &:disabled {
    background-color: #4d4d4d;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  font-size: 16px;
  background-color: ${props => props.isError ? 'rgba(229, 9, 20, 0.1)' : 'rgba(51, 153, 51, 0.1)'};
  color: ${props => props.isError ? '#e50914' : '#33cc33'};
`;

function Admin() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  
  const handleResetLocalStorage = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        localStorage.removeItem('libraryFavorites');
        setStatus({
          message: 'Dados do localStorage limpos com sucesso. Recarregue a página para ver as mudanças.',
          isError: false
        });
      } catch (error) {
        setStatus({
          message: `Erro ao limpar dados: ${error.message}`,
          isError: true
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <AdminContainer>
      <Title>Administração</Title>
      
      <AdminPanel>
        <AdminSection>
          <SectionTitle>Gerenciar Aplicação</SectionTitle>
          <p style={{ color: '#e5e5e5', marginBottom: '15px' }}>
            Este aplicativo agora utiliza imagens locais da pasta assets/movies_images e armazena favoritos no localStorage.
          </p>
          <p style={{ color: '#e5e5e5', marginBottom: '20px' }}>
            Para testar novas imagens, adicione-as à pasta assets/movies_images e atualize o arquivo ItemsContext.js.
          </p>
          
          <Button 
            onClick={handleResetLocalStorage}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Limpar Favoritos (localStorage)'}
          </Button>
          
          {status && (
            <StatusMessage isError={status.isError}>
              {status.message}
            </StatusMessage>
          )}
        </AdminSection>
      </AdminPanel>
    </AdminContainer>
  );
}

export default Admin; 