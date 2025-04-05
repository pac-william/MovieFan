import React from 'react';
import styled from 'styled-components';
import ItemCard from '../components/ItemCard';
import { useItems } from '../context/ItemsContext';

const FavoritesContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #e5e5e5;
  margin-bottom: 20px;
  font-size: 32px;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const NoFavoritesMessage = styled.p`
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

function Favorites() {
  const { items, loading, error, toggleFavorite } = useItems();
  
  const favoriteItems = items.filter(item => item.isFavorite);

  return (
    <FavoritesContainer>
      <Title>Meus Favoritos</Title>
      
      {loading ? (
        <LoadingMessage>Carregando favoritos...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>
          Erro ao carregar os favoritos: {error}
        </ErrorMessage>
      ) : favoriteItems.length > 0 ? (
        <ItemsGrid>
          {favoriteItems.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onFavoriteToggle={() => toggleFavorite(item.id)}
            />
          ))}
        </ItemsGrid>
      ) : (
        <NoFavoritesMessage>Você ainda não tem favoritos.</NoFavoritesMessage>
      )}
    </FavoritesContainer>
  );
}

export default Favorites; 