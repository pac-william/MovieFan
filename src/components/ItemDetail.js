import React from 'react';
import { FiCalendar, FiClock, FiFilm, FiHeart, FiStar } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useItems } from '../context/ItemsContext';

const DetailContainer = styled.div`
  position: relative;
  color: #fff;
  min-height: calc(100vh - 60px);
`;

const BackdropImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.25;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(20,20,20,1) 100%);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 30px;
    gap: 40px;
  }
`;

const PosterContainer = styled.div`
  margin-bottom: 20px;
  width: 70%;
  max-width: 300px;
  align-self: center;
  
  @media (min-width: 768px) {
    flex: 0 0 300px;
    margin-bottom: 0;
    align-self: flex-start;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
`;

const DetailContent = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  color: #fff;
  
  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const DetailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  
  @media (min-width: 768px) {
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const DetailBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 13px;
  
  @media (min-width: 768px) {
    gap: 8px;
    padding: 8px 12px;
    font-size: 14px;
  }
  
  svg {
    color: ${props => props.color || '#ccc'};
  }
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #ccc;
  
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 6px;
  
  @media (min-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
    padding-bottom: 8px;
  }
`;

const InfoList = styled.div`
  margin-bottom: 20px;
  
  @media (min-width: 768px) {
    margin-bottom: 24px;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
  
  @media (min-width: 768px) {
    margin-bottom: 8px;
    font-size: initial;
  }
  
  strong {
    color: #fff;
    margin-right: 8px;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
    margin-right: 15px;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FavoriteButton = styled.button`
  background-color: ${props => props.isFavorite ? 'rgba(229, 9, 20, 0.2)' : 'transparent'};
  color: ${props => props.isFavorite ? '#e50914' : '#fff'};
  border: 1px solid ${props => props.isFavorite ? '#e50914' : 'rgba(255, 255, 255, 0.5)'};
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
    gap: 8px;
  }
  
  &:hover {
    background-color: ${props => props.isFavorite ? 'rgba(229, 9, 20, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  }
  
  svg {
    fill: ${props => props.isFavorite ? '#e50914' : 'none'};
  }
`;

const TypeBadge = styled.span`
  background-color: ${(props) => (props.type === 'movie' ? '#e50914' : '#0077cc')};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: inline-block;
  
  @media (min-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, toggleFavorite } = useItems();
  
  const itemId = parseInt(id);
  const item = getItemById(itemId);
  
  if (!item) {
    return (
      <DetailContainer>
        <ContentWrapper>
          <h2>Item não encontrado</h2>
          <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
        </ContentWrapper>
      </DetailContainer>
    );
  }
  
  const handleToggleFavorite = () => {
    toggleFavorite(itemId);
  };
  
  return (
    <DetailContainer>
      <BackdropImage style={{ backgroundImage: `url(${item.backdrop || item.image})` }} />
      <ContentWrapper>
        <PosterContainer>
          <Poster src={item.image} alt={item.title} />
        </PosterContainer>
        <DetailContent>
          <TypeBadge type={item.type}>{item.type === 'movie' ? 'Filme' : 'Série'}</TypeBadge>
          <Title>{item.title}</Title>
          
          <DetailRow>
            {item.vote_average && (
              <DetailBadge color="#ffcc00">
                <FiStar />
                {(item.vote_average / 2).toFixed(1)}/5
              </DetailBadge>
            )}
            <DetailBadge>
              <FiCalendar />
              {item.year}
            </DetailBadge>
            <DetailBadge>
              <FiClock />
              {item.duration}
            </DetailBadge>
            <DetailBadge>
              <FiFilm />
              {item.rating}
            </DetailBadge>
          </DetailRow>
          
          <Description>{item.description}</Description>
          
          <InfoList>
            <SectionTitle>Informações</SectionTitle>
            <InfoItem>
              <strong>Diretor/Criador:</strong> {item.director}
            </InfoItem>
            <InfoItem>
              <strong>Elenco:</strong> {item.cast}
            </InfoItem>
          </InfoList>
          
          <DetailRow>
            <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
            <FavoriteButton 
              isFavorite={item.isFavorite} 
              onClick={handleToggleFavorite}
            >
              <FiHeart />
              {item.isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </FavoriteButton>
          </DetailRow>
        </DetailContent>
      </ContentWrapper>
    </DetailContainer>
  );
}

export default ItemDetail; 