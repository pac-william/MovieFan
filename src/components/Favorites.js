import React from 'react';
import styled from 'styled-components';
import { useItems } from '../context/ItemsContext';
import ItemCard from './ItemCard';

const FavoritesContainer = styled.div`
  padding: 15px;
  
  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  color: #e5e5e5;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 32px;
    text-align: left;
  }
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  
  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
  @media (min-width: 1440px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  color: #999;
  text-align: center;
  padding: 20px;
  
  h2 {
    margin-bottom: 10px;
    color: #e5e5e5;
  }
  
  p {
    margin-bottom: 20px;
    max-width: 500px;
  }
`;

function Favorites() {
  const { items, loading } = useItems();
  
  // Filtrar itens favoritos
  const favoriteItems = items.filter(item => item.isFavorite);

  if (loading) {
    return (
      <FavoritesContainer>
        <Title>Carregando favoritos...</Title>
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer>
      <Title>Meus Favoritos</Title>
      
      {favoriteItems.length > 0 ? (
        <FavoritesGrid>
          {favoriteItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </FavoritesGrid>
      ) : (
        <EmptyState>
          <h2>Nenhum favorito encontrado</h2>
          <p>
            Adicione filmes e séries aos seus favoritos clicando no ícone de coração
            nos cards ou na página de detalhes.
          </p>
        </EmptyState>
      )}
    </FavoritesContainer>
  );
}

export default Favorites; 