import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaEdit, FaEnvelope, FaFilm, FaGlobe, FaMapMarkerAlt, FaPhone, FaSave, FaStar, FaUndo, FaUser, FaVenusMars } from 'react-icons/fa';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0f0f0f;
  padding: 40px 20px;
`;

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled.div`
  background-color: #1c1c1c;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  position: sticky;
  top: 20px;
`;

const ProfileContent = styled.div`
  background-color: #1c1c1c;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const Avatar = styled.div`
  position: relative;
  margin-bottom: 20px;
  
  &:hover .avatar-overlay {
    opacity: 1;
  }
`;

const AvatarImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid #e50914;
  object-fit: cover;
  transition: filter 0.3s ease;
`;

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  svg {
    color: #e50914;
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  color: #e50914;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? '#333' : '#e50914'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => props.secondary ? '#444' : '#f40612'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #e50914;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  input, select, textarea {
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #333;
    background-color: #222;
    color: white;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: #e50914;
      box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.3);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const InfoCard = styled.div`
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  
  svg {
    color: #e50914;
    margin-right: 10px;
    min-width: 20px;
  }
  
  span.label {
    font-weight: bold;
    color: #999;
    margin-right: 10px;
    min-width: 120px;
  }
  
  span.value {
    color: #fff;
  }
`;

const Badge = styled.span`
  background-color: #e50914;
  color: white;
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 12px;
  display: inline-block;
  margin: 5px;
`;

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #252525;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  
  .stat-value {
    font-size: 32px;
    font-weight: bold;
    color: #e50914;
  }
  
  .stat-label {
    font-size: 14px;
    color: #999;
    margin-top: 5px;
  }
`;

function Profile() {
  // Estado inicial com dados fictícios
  const defaultUser = {
    nome: "Naruto Uzumaki",
    email: "narutouzumaki@email.com",
    genero: "Masculino",
    dataNascimento: "1990-01-01",
    telefone: "(11) 98765-4321",
    localizacao: "Konoha, País do Fogo",
    biografia: "Ninja determinado que sonha em se tornar Hokage! Adoro ramen e nunca desisto dos meus amigos.",
    generosFavoritos: ["Ação", "Aventura", "Ficção Científica", "Animação"],
    idiomas: ["Português", "Inglês", "Japonês"],
    estatisticas: {
      filmesAssistidos: 248,
      avaliados: 176,
      favoritos: 42
    },
    redesSociais: {
      instagram: "@naruto_uzumaki",
      twitter: "@narutouzumaki",
      facebook: "naruto.uzumaki"
    },
    plano: "Premium",
    membro_desde: "Janeiro 2020",
    avatar: require('../assets/foto_perfil.jpg')
  };
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(defaultUser);
  
  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Garantir que o avatar ainda esteja disponível
        parsedData.avatar = defaultUser.avatar;
        
        // Garantir que todos os campos estejam presentes
        const mergedData = {...defaultUser, ...parsedData};
        setUserData(mergedData);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
  }, []);
  
  // Função para salvar mudanças
  const handleSave = () => {
    // Criar uma cópia dos dados para salvar no localStorage
    const dataToSave = {...userData};
    // Remove o avatar que é um objeto importado antes de salvar
    delete dataToSave.avatar;
    
    localStorage.setItem('userData', JSON.stringify(dataToSave));
    setIsEditing(false);
  };
  
  // Função para lidar com alterações nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para lidar com alterações em arrays (gêneros favoritos, idiomas)
  const handleArrayChange = (e, field) => {
    const { value, checked } = e.target;
    
    setUserData(prev => {
      const currentValues = [...prev[field]];
      
      if (checked && !currentValues.includes(value)) {
        return { ...prev, [field]: [...currentValues, value] };
      } else if (!checked && currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(item => item !== value) };
      }
      
      return prev;
    });
  };
  
  // Função para resetar para os dados padrão
  const handleReset = () => {
    localStorage.removeItem('userData');
    setUserData(defaultUser);
    setIsEditing(false);
  };
  
  // Função para formatar a data no formato brasileiro
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const parts = dateString.split('-');
      if (parts.length !== 3) return dateString;
      
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Função para calcular idade
  const calculateAge = (birthdate) => {
    if (!birthdate) return '';
    
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Lista de opções para gêneros de filmes
  const generoOptions = [
    "Ação", "Aventura", "Animação", "Comédia", "Crime",
    "Documentário", "Drama", "Fantasia", "Horror",
    "Musical", "Mistério", "Romance", "Ficção Científica",
    "Suspense", "Guerra", "Faroeste"
  ];
  
  // Lista de opções para idiomas
  const idiomaOptions = [
    "Português", "Inglês", "Espanhol", "Francês", "Alemão",
    "Italiano", "Japonês", "Coreano", "Mandarim", "Russo"
  ];

  return (
    <PageContainer>
      <ProfileContainer>
        <ProfileSidebar>
          <Avatar>
            <AvatarImage src={userData.avatar} alt="Foto do Usuário" />
            {isEditing && (
              <AvatarOverlay className="avatar-overlay">
                <span style={{ color: 'white' }}>Alterar foto</span>
              </AvatarOverlay>
            )}
          </Avatar>
          
          <Title>
            <FaUser /> {!isEditing ? userData.nome : 'Editando Perfil'}
          </Title>
          
          <InfoCard>
            <InfoItem>
              <FaStar />
              <span className="label">Plano:</span>
              <span className="value">{userData.plano}</span>
            </InfoItem>
            <InfoItem>
              <FaCalendarAlt />
              <span className="label">Membro desde:</span>
              <span className="value">{userData.membro_desde}</span>
            </InfoItem>
          </InfoCard>
          
          {!isEditing ? (
            <ButtonGroup>
              <Button onClick={() => setIsEditing(true)}>
                <FaEdit /> Editar Perfil
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <Button onClick={handleSave}>
                <FaSave /> Salvar
              </Button>
              <Button secondary onClick={() => setIsEditing(false)}>
                <FaUndo /> Cancelar
              </Button>
            </ButtonGroup>
          )}
        </ProfileSidebar>
        
        <ProfileContent>
          {isEditing ? (
            // Formulário de edição
            <EditForm>
              <SectionTitle><FaUser /> Informações Pessoais</SectionTitle>
              <InputGroup>
                <label><FaUser /> Nome:</label>
                <input 
                  name="nome" 
                  value={userData.nome} 
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <label><FaEnvelope /> Email:</label>
                <input 
                  name="email" 
                  type="email"
                  value={userData.email} 
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <label><FaPhone /> Telefone:</label>
                <input 
                  name="telefone" 
                  value={userData.telefone} 
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <label><FaVenusMars /> Gênero:</label>
                <select 
                  name="genero" 
                  value={userData.genero} 
                  onChange={handleChange}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                  <option value="Prefiro não informar">Prefiro não informar</option>
                </select>
              </InputGroup>
              <InputGroup>
                <label><FaCalendarAlt /> Data de Nascimento:</label>
                <input 
                  type="date"
                  name="dataNascimento" 
                  value={userData.dataNascimento} 
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <label><FaMapMarkerAlt /> Localização:</label>
                <input 
                  name="localizacao" 
                  value={userData.localizacao} 
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <label><FaUser /> Biografia:</label>
                <textarea 
                  name="biografia" 
                  value={userData.biografia} 
                  onChange={handleChange}
                />
              </InputGroup>
              
              <SectionTitle><FaFilm /> Preferências de Filmes</SectionTitle>
              <InputGroup>
                <label>Gêneros Favoritos:</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {generoOptions.map(genero => (
                    <div key={genero} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="checkbox"
                        id={`genero-${genero}`}
                        value={genero}
                        checked={userData.generosFavoritos.includes(genero)}
                        onChange={e => handleArrayChange(e, 'generosFavoritos')}
                      />
                      <label htmlFor={`genero-${genero}`} style={{ color: 'white', fontWeight: 'normal' }}>{genero}</label>
                    </div>
                  ))}
                </div>
              </InputGroup>
              
              <SectionTitle><FaGlobe /> Idiomas</SectionTitle>
              <InputGroup>
                <label>Idiomas que você entende:</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {idiomaOptions.map(idioma => (
                    <div key={idioma} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="checkbox"
                        id={`idioma-${idioma}`}
                        value={idioma}
                        checked={userData.idiomas.includes(idioma)}
                        onChange={e => handleArrayChange(e, 'idiomas')}
                      />
                      <label htmlFor={`idioma-${idioma}`} style={{ color: 'white', fontWeight: 'normal' }}>{idioma}</label>
                    </div>
                  ))}
                </div>
              </InputGroup>
              
              <SectionTitle>Redes Sociais</SectionTitle>
              <InputGroup>
                <label>Instagram:</label>
                <input 
                  name="redesSociais.instagram" 
                  value={userData.redesSociais.instagram} 
                  onChange={e => setUserData({...userData, redesSociais: {...userData.redesSociais, instagram: e.target.value}})}
                />
              </InputGroup>
              <InputGroup>
                <label>Twitter:</label>
                <input 
                  name="redesSociais.twitter" 
                  value={userData.redesSociais.twitter} 
                  onChange={e => setUserData({...userData, redesSociais: {...userData.redesSociais, twitter: e.target.value}})}
                />
              </InputGroup>
              <InputGroup>
                <label>Facebook:</label>
                <input 
                  name="redesSociais.facebook" 
                  value={userData.redesSociais.facebook} 
                  onChange={e => setUserData({...userData, redesSociais: {...userData.redesSociais, facebook: e.target.value}})}
                />
              </InputGroup>
            </EditForm>
          ) : (
            // Visualização normal
            <>
              <SectionTitle><FaUser /> Informações Pessoais</SectionTitle>
              <InfoCard>
                <InfoItem>
                  <FaUser />
                  <span className="label">Nome:</span>
                  <span className="value">{userData.nome}</span>
                </InfoItem>
                <InfoItem>
                  <FaEnvelope />
                  <span className="label">Email:</span>
                  <span className="value">{userData.email}</span>
                </InfoItem>
                <InfoItem>
                  <FaPhone />
                  <span className="label">Telefone:</span>
                  <span className="value">{userData.telefone}</span>
                </InfoItem>
                <InfoItem>
                  <FaVenusMars />
                  <span className="label">Gênero:</span>
                  <span className="value">{userData.genero}</span>
                </InfoItem>
                <InfoItem>
                  <FaCalendarAlt />
                  <span className="label">Data de Nasc:</span>
                  <span className="value">{formatDate(userData.dataNascimento)} ({calculateAge(userData.dataNascimento)} anos)</span>
                </InfoItem>
                <InfoItem>
                  <FaMapMarkerAlt />
                  <span className="label">Localização:</span>
                  <span className="value">{userData.localizacao}</span>
                </InfoItem>
              </InfoCard>
              
              <SectionTitle><FaUser /> Biografia</SectionTitle>
              <InfoCard>
                <p style={{ lineHeight: '1.6', color: '#ddd' }}>{userData.biografia}</p>
              </InfoCard>
              
              <SectionTitle><FaFilm /> Preferências de Filmes</SectionTitle>
              <InfoCard>
                <InfoItem>
                  <FaFilm />
                  <span className="label">Gêneros Favoritos:</span>
                </InfoItem>
                <BadgesContainer>
                  {userData.generosFavoritos.map(genero => (
                    <Badge key={genero}>{genero}</Badge>
                  ))}
                </BadgesContainer>
              </InfoCard>
              
              <SectionTitle><FaGlobe /> Idiomas</SectionTitle>
              <InfoCard>
                <BadgesContainer>
                  {userData.idiomas.map(idioma => (
                    <Badge key={idioma}>{idioma}</Badge>
                  ))}
                </BadgesContainer>
              </InfoCard>
              
              <SectionTitle><FaStar /> Estatísticas</SectionTitle>
              <StatsContainer>
                <StatCard>
                  <div className="stat-value">{userData.estatisticas.filmesAssistidos}</div>
                  <div className="stat-label">Filmes Assistidos</div>
                </StatCard>
                <StatCard>
                  <div className="stat-value">{userData.estatisticas.avaliados}</div>
                  <div className="stat-label">Filmes Avaliados</div>
                </StatCard>
                <StatCard>
                  <div className="stat-value">{userData.estatisticas.favoritos}</div>
                  <div className="stat-label">Filmes Favoritos</div>
                </StatCard>
              </StatsContainer>
              
              <SectionTitle>Redes Sociais</SectionTitle>
              <InfoCard>
                <InfoItem>
                  <span style={{ fontSize: '20px' }}>📱</span>
                  <span className="label">Instagram:</span>
                  <span className="value">{userData.redesSociais.instagram}</span>
                </InfoItem>
                <InfoItem>
                  <span style={{ fontSize: '20px' }}>🐦</span>
                  <span className="label">Twitter:</span>
                  <span className="value">{userData.redesSociais.twitter}</span>
                </InfoItem>
                <InfoItem>
                  <span style={{ fontSize: '20px' }}>👤</span>
                  <span className="label">Facebook:</span>
                  <span className="value">{userData.redesSociais.facebook}</span>
                </InfoItem>
              </InfoCard>
            </>
          )}
        </ProfileContent>
      </ProfileContainer>
    </PageContainer>
  );
}

export default Profile;
