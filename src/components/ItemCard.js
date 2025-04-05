import React from 'react';
import { FiHeart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useItems } from '../context/ItemsContext';

const Card = styled.div`
  position: relative;
  width: 100%;
  background-color: #141414;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

const CardImage = styled.div`
  height: 0;
  padding-top: 150%; /* Proporção de aspecto 2:3 para pôsteres */
  overflow: hidden;
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  }
`;

const CardContent = styled.div`
  padding: 15px;
  color: #ffffff;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 5px;
  color: #ffffff;
  font-weight: 700;
  
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const CardDescription = styled.p`
  font-size: 13px;
  color: #cccccc;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  
  @media (min-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    -webkit-line-clamp: 2;
  }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999999;
  font-size: 12px;
  
  @media (min-width: 768px) {
    font-size: 13px;
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  color: ${(props) => (props.isFavorite ? '#e50914' : '#ffffff')};
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

const TypeBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${(props) => (props.type === 'movie' ? '#e50914' : '#0077cc')};
  color: white;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 2;
  
  @media (min-width: 768px) {
    font-size: 12px;
    padding: 3px 8px;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 3px 6px;
  border-radius: 3px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #ffcc00;
  font-weight: bold;
  z-index: 2;
  font-size: 12px;
  
  @media (min-width: 768px) {
    font-size: 14px;
    padding: 3px 8px;
  }

  svg {
    margin-right: 4px;
  }
`;

function ItemCard({ item }) {
  const { toggleFavorite } = useItems();

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(item.id);
  };

  return (
    <Card>
      <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
        <TypeBadge type={item.type}>{item.type === 'movie' ? 'Filme' : 'Série'}</TypeBadge>
        <FavoriteButton onClick={handleToggleFavorite} isFavorite={item.isFavorite}>
          <FiHeart
            size={18}
            color={item.isFavorite ? '#e50914' : '#ffffff'}
            fill={item.isFavorite ? '#e50914' : 'none'}
          />
        </FavoriteButton>
        <CardImage
          style={{
            backgroundImage: `url(${item.image})`,
          }}
        />
        {item.vote_average && (
          <Rating>
            <FiStar size={14} />
            {(item.vote_average / 2).toFixed(1)}
          </Rating>
        )}
        <CardContent>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description || 'Sem descrição disponível.'}</CardDescription>
          <CardMeta>
            <div>{item.year}</div>
            <div>{item.type === 'movie' ? item.duration : item.duration}</div>
          </CardMeta>
        </CardContent>
      </Link>
    </Card>
  );
}

export default ItemCard; 