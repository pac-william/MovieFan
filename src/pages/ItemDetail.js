import React from 'react';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useItems } from '../context/ItemsContext';

const DetailContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #e5e5e5;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    color: #ffffff;
  }
`;

const ItemCard = styled.div`
  background-color: #181818;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemImage = styled.div`
  width: 300px;
  height: 450px;
  background-color: #232323;
  margin-right: 30px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    height: 450px;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h1`
  color: #e5e5e5;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemType = styled.span`
  background-color: #e50914;
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 2px;
  display: inline-block;
  margin-bottom: 15px;
`;

const ItemSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #8c8c8c;
  margin-bottom: 10px;
  font-size: 16px;
`;

const SectionContent = styled.p`
  color: #e5e5e5;
  line-height: 1.6;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
`;

const MetaItem = styled.div`
  background-color: #232323;
  padding: 8px 12px;
  border-radius: 4px;
  color: #e5e5e5;
  font-size: 14px;
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${props => props.isFavorite ? '#e50914' : '#333333'};
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  
  &:hover {
    background-color: ${props => props.isFavorite ? '#ff0a16' : '#454545'};
  }
`;

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, toggleFavorite, loading, error } = useItems();
  
  const item = getItemById(parseInt(id));
  
  if (loading) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft /> Voltar
        </BackButton>
        <p style={{ color: '#e5e5e5', textAlign: 'center' }}>Carregando...</p>
      </DetailContainer>
    );
  }
  
  if (error) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft /> Voltar
        </BackButton>
        <p style={{ color: '#e50914', textAlign: 'center' }}>Erro ao carregar o item: {error}</p>
      </DetailContainer>
    );
  }
  
  if (!item) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft /> Voltar
        </BackButton>
        <p style={{ color: '#e5e5e5', textAlign: 'center' }}>Item não encontrado.</p>
      </DetailContainer>
    );
  }

  // Renderização detalhada para filmes e séries
  const renderDetails = () => {
    return (
      <>
        <ItemSection>
          <SectionTitle>Descrição</SectionTitle>
          <SectionContent>{item.description}</SectionContent>
        </ItemSection>
        
        <ItemSection>
          <SectionTitle>Direção</SectionTitle>
          <SectionContent>{item.director}</SectionContent>
        </ItemSection>
        
        <ItemSection>
          <SectionTitle>Elenco</SectionTitle>
          <SectionContent>{item.cast}</SectionContent>
        </ItemSection>
        
        <MetaInfo>
          <MetaItem>Ano: {item.year}</MetaItem>
          <MetaItem>Duração: {item.duration}</MetaItem>
          <MetaItem>Classificação: {item.rating}</MetaItem>
        </MetaInfo>
      </>
    );
  };

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FiArrowLeft /> Voltar
      </BackButton>
      
      <ItemCard>
        <ItemHeader>
          <ItemImage>
            <img src={item.image} alt={item.title} />
          </ItemImage>
          
          <ItemInfo>
            <ItemTitle>
              {item.title}
            </ItemTitle>
            
            <ItemType>{item.type === 'movie' ? 'Filme' : 'Série'}</ItemType>
            
            {renderDetails()}
            
            <FavoriteButton 
              isFavorite={item.isFavorite}
              onClick={() => toggleFavorite(item.id)}
            >
              <FiStar /> {item.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            </FavoriteButton>
          </ItemInfo>
        </ItemHeader>
      </ItemCard>
    </DetailContainer>
  );
}

export default ItemDetail; 