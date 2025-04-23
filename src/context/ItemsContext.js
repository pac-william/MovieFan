import React, { createContext, useContext, useEffect, useState } from 'react';

// Contexto para gerenciar os itens da biblioteca
const ItemsContext = createContext();

// Hook personalizado para acessar o contexto
export const useItems = () => useContext(ItemsContext);

// Configuração da API TMDb
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzg5NGI5N2QzNWEyOGQ1MzdlM2E5YzJmZTAwNjA3ZSIsIm5iZiI6MTc0Mzg3NTMxOC4wODUsInN1YiI6IjY3ZjE2Y2Y2YWE3N2UwOGFmNzk5OTA4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGr1DdwthBFqd-ObhJjjSEAnnuVi2qnciGVsLY4Td3k';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

// Provedor do contexto
export const ItemsProvider = ({ children }) => {
  // Estado local para os itens
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar filmes populares
  const fetchMovies = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      };

      const response = await fetch(`${BASE_URL}/movie/popular?language=pt-BR&page=1`, options);
      const data = await response.json();
      console.log(data);
      return data.results.map(movie => ({
        id: movie.id,
        type: 'movie',
        title: movie.title,
        description: movie.overview,
        image: `${IMAGE_BASE_URL}${movie.poster_path}`,
        director: 'Diretor não disponível na API básica',
        cast: 'Elenco não disponível na API básica',
        duration: movie?.duration ?? '',
        year: new Date(movie.release_date).getFullYear(),
        rating: movie.adult ? '18 anos' : 'Livre',
        isFavorite: false,
        backdrop: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
        vote_average: movie.vote_average
      }));
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      throw error;
    }
  };

  // Função para buscar séries populares
  const fetchTVShows = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      };

      const response = await fetch(`${BASE_URL}/tv/popular?language=pt-BR&page=1`, options);
      const data = await response.json();
      
      return data.results.map(show => ({
        id: show.id + 10000, // Para evitar conflitos de ID com filmes
        type: 'series',
        title: show.name,
        description: show.overview,
        image: `${IMAGE_BASE_URL}${show.poster_path}`,
        director: 'Criador não disponível na API básica',
        cast: 'Elenco não disponível na API básica',
        duration: `${show.number_of_seasons || '?'} temporadas`,
        year: new Date(show.first_air_date).getFullYear(),
        rating: show.adult ? '18 anos' : 'Livre',
        isFavorite: false,
        backdrop: `${IMAGE_BASE_URL}${show.backdrop_path}`,
        vote_average: show.vote_average
      }));
    } catch (error) {
      console.error('Erro ao buscar séries:', error);
      throw error;
    }
  };

  // Carregar dados da API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Buscar filmes e séries em paralelo
        const [movies, tvShows] = await Promise.all([
          fetchMovies(),
          fetchTVShows()
        ]);
        
        // Combinar os resultados
        const allItems = [...movies, ...tvShows];
        
        // Verificar se há favoritos salvos no localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('libraryFavorites')) || [];
        
        // Atualizar estado de favorito nos itens
        const itemsWithFavorites = allItems.map(item => ({
          ...item,
          isFavorite: savedFavorites.includes(item.id)
        }));
        
        setItems(itemsWithFavorites);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar dados da API. Verifique sua conexão.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Salvar apenas os IDs dos favoritos no localStorage quando eles mudarem
  useEffect(() => {
    const favoriteIds = items
      .filter(item => item.isFavorite)
      .map(item => item.id);
      
    localStorage.setItem('libraryFavorites', JSON.stringify(favoriteIds));
  }, [items]);

  // Função para alternar o estado de favorito de um item
  const toggleFavorite = (itemId) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, isFavorite: !item.isFavorite } 
          : item
      )
    );
  };

  // Função para obter um item pelo ID
  const getItemById = (itemId) => {
    return items.find(item => item.id === itemId);
  };

  // Valor do contexto
  const value = {
    items,
    loading,
    error,
    toggleFavorite,
    getItemById
  };

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider; 