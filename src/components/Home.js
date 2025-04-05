import React, { useEffect, useState } from 'react';
import { FiInfo, FiPlay, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useItems } from '../context/ItemsContext';
import ItemCard from './ItemCard';

const Container = styled.div`
  padding: 15px;
  padding-top: 0;
  
  @media (min-width: 768px) {
    padding: 20px;
    padding-top: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
  
  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const SectionTitle = styled.h2`
  color: #e5e5e5;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
  
  @media (min-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const ItemsGrid = styled.div`
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

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #e5e5e5;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(229, 9, 20, 0.1);
  color: #e50914;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const HeroSection = styled.div`
  position: relative;
  height: 60vh;
  min-height: 400px;
  margin-bottom: 30px;
  overflow: hidden;
  margin: -15px;
  margin-bottom: 30px;
  
  @media (min-width: 768px) {
    height: 70vh;
    min-height: 500px;
    margin: -20px;
    margin-bottom: 40px;
  }
  
  @media (min-width: 1024px) {
    height: 80vh;
    min-height: 600px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
  transition: background-image 0.8s ease-in-out;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70%;
    background: linear-gradient(to top, #141414 5%, transparent 95%);
  }
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 80px;
  left: 20px;
  max-width: 90%;
  color: #fff;
  z-index: 10;

  @media (min-width: 768px) {
    bottom: 120px;
    left: 40px;
    max-width: 70%;
  }
  
  @media (min-width: 1024px) {
    bottom: 150px;
    left: 50px;
    max-width: 600px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    font-size: 36px;
    margin-bottom: 15px;
  }
  
  @media (min-width: 1024px) {
    font-size: 48px;
    margin-bottom: 20px;
  }
`;

const HeroDescription = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: 768px) {
    font-size: 16px;
    -webkit-line-clamp: 3;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  
  @media (min-width: 1024px) {
    font-size: 18px;
    margin-bottom: 25px;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 10px;
  
  @media (min-width: 768px) {
    gap: 15px;
  }
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  background-color: ${props => props.primary ? '#e50914' : 'rgba(109, 109, 110, 0.7)'};
  color: white;

  &:hover {
    background-color: ${props => props.primary ? '#f40612' : 'rgba(109, 109, 110, 0.9)'};
  }
  
  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 15px;
    gap: 8px;
  }
  
  @media (min-width: 1024px) {
    padding: 12px 25px;
    font-size: 16px;
  }
`;

const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  
  @media (min-width: 768px) {
    gap: 15px;
    margin-bottom: 15px;
  }
  
  @media (min-width: 1024px) {
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const HeroRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ffcc00;
  font-weight: 600;
  font-size: 14px;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const HeroYear = styled.span`
  color: #ccc;
  font-size: 14px;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

function Home() {
  const { items, loading, error } = useItems();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // Seleciona filmes para o carrossel de hero
  useEffect(() => {
    if (items.length > 0) {
      // Filtra apenas filmes com descrição e imagem de fundo
      const moviesWithBackdrop = items.filter(
        item => item.type === 'movie' && item.description && item.backdrop
      );
      
      if (moviesWithBackdrop.length > 0) {
        // Pega até 5 filmes para o carrossel
        const selected = moviesWithBackdrop.slice(0, Math.min(5, moviesWithBackdrop.length));
        setFeaturedItems(selected);
        setCurrentItemIndex(0);
      }
    }
  }, [items]);

  // Alternar filme em destaque a cada 5 segundos
  useEffect(() => {
    if (featuredItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
      }, 5000);
      
      // Limpar intervalo quando o componente for desmontado
      return () => clearInterval(interval);
    }
  }, [featuredItems]);

  // Função para filtrar itens por tipo (movie ou series)
  const filterByType = (type) => {
    return items.filter(item => item.type === type);
  };

  if (loading) {
    return <LoadingMessage>Carregando conteúdo...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const movies = filterByType('movie');
  const series = filterByType('series');
  const featuredItem = featuredItems[currentItemIndex];

  return (
    <Container>
      {featuredItem && (
        <HeroSection>
          <HeroBackground style={{ backgroundImage: `url(${featuredItem.backdrop})` }} />
          <HeroContent>
            <HeroMeta>
              {featuredItem.vote_average && (
                <HeroRating>
                  <FiStar size={16} />
                  {(featuredItem.vote_average / 2).toFixed(1)}/5
                </HeroRating>
              )}
              <HeroYear>{featuredItem.year}</HeroYear>
            </HeroMeta>
            <HeroTitle>{featuredItem.title}</HeroTitle>
            <HeroDescription>{featuredItem.description}</HeroDescription>
            <HeroActions>
              <HeroButton to={`/item/${featuredItem.id}`} primary>
                <FiPlay size={16} />
                Assistir
              </HeroButton>
              <HeroButton to={`/item/${featuredItem.id}`}>
                <FiInfo size={16} />
                Mais Informações
              </HeroButton>
            </HeroActions>
          </HeroContent>
        </HeroSection>
      )}

      {movies.length > 0 && (
        <Section>
          <SectionTitle>Filmes</SectionTitle>
          <ItemsGrid>
            {movies.map(movie => (
              <ItemCard key={movie.id} item={movie} />
            ))}
          </ItemsGrid>
        </Section>
      )}

      {series.length > 0 && (
        <Section>
          <SectionTitle>Séries</SectionTitle>
          <ItemsGrid>
            {series.map(series => (
              <ItemCard key={series.id} item={series} />
            ))}
          </ItemsGrid>
        </Section>
      )}
    </Container>
  );
}

export default Home; 