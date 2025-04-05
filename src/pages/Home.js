import React, { useState } from 'react';
import styled from 'styled-components';
import ItemCard from '../components/ItemCard';
import { useItems } from '../context/ItemsContext';

const HomeContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #e5e5e5;
  margin-bottom: 20px;
  font-size: 32px;
`;

const CategoryTitle = styled.h2`
  color: #e5e5e5;
  margin: 40px 0 15px 0;
  font-size: 24px;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: none;
  width: 100%;
  max-width: 400px;
  background-color: rgba(51, 51, 51, 0.5);
  color: #e5e5e5;
  border: 1px solid #333333;

  &::placeholder {
    color: #8c8c8c;
  }

  &:focus {
    background-color: #333333;
    outline: none;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const NoItemsMessage = styled.p`
  color: #e5e5e5;
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
`;

const LoadingMessage = styled.div`
  color: #e5e5e5;
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  color: #e50914;
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  background-color: rgba(229, 9, 20, 0.1);
  border-radius: 4px;
`;

function Home() {
  const { items, loading, error, toggleFavorite } = useItems();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const movies = filteredItems.filter(item => item.type === 'movie');
  const series = filteredItems.filter(item => item.type === 'series');

  const renderContent = () => {
    if (loading) {
      return <LoadingMessage>Carregando itens...</LoadingMessage>;
    }
    
    if (error) {
      return <ErrorMessage>Erro ao carregar os itens: {error}</ErrorMessage>;
    }
    
    if (filteredItems.length === 0) {
      return <NoItemsMessage>Nenhum item encontrado.</NoItemsMessage>;
    }
    
    return (
      <>
        {searchTerm === '' ? (
          <>
            <CategoryTitle>Filmes</CategoryTitle>
            <ItemsGrid>
              {movies.map(item => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  onFavoriteToggle={() => toggleFavorite(item.id)} 
                />
              ))}
            </ItemsGrid>
            
            <CategoryTitle>Séries</CategoryTitle>
            <ItemsGrid>
              {series.map(item => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  onFavoriteToggle={() => toggleFavorite(item.id)} 
                />
              ))}
            </ItemsGrid>
          </>
        ) : (
          <>
            <CategoryTitle>Resultados da busca</CategoryTitle>
            <ItemsGrid>
              {filteredItems.map(item => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  onFavoriteToggle={() => toggleFavorite(item.id)} 
                />
              ))}
            </ItemsGrid>
          </>
        )}
      </>
    );
  };

  return (
    <HomeContainer>
      <Title>Filmes e Séries</Title>
      
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Pesquisar itens..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {renderContent()}
    </HomeContainer>
  );
}

export default Home; 