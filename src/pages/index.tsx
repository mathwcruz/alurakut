import { FormEvent, useMemo, useState } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';
import { ProfileSidebar } from 'components/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { MainGrid } from 'styles/components/MainGrid';
import { ProfileRelationsBoxWrapper } from 'styles/components/ProfileRelations';
import { NewComunityForm } from '~/components/NewComunityForm';

interface FavoritesPeopleData {
  id: string;
  userName: string;
  avatarUrl: string;
}

interface ComunityData {
  id: string;
  title: string;
  image: string;
}

//TODO: estilizar página 404

export default function Home({ githubUserName = 'mathwcruz' }) {
  const [favoritesPeople, setFavoritesPeople] = useState<FavoritesPeopleData[]>(
    []
  );
  const [comunities, setComunities] = useState<ComunityData[]>([]);

  useMemo(async () => {
    const { data } = await api.get(
      `https://api.github.com/users/${githubUserName}/followers`
    );

    const favoritesPeople = data?.slice(0, 6)?.map((people) => {
      return {
        id: people?.id,
        userName: people?.login,
        avatarUrl: people?.avatar_url,
      };
    });

    setFavoritesPeople(favoritesPeople);
  }, []);

  function handleCreateComunity(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const comunityName = data.get('title');
    const comunityImageUrl = data.get('image');

    const newComunity = {
      id: new Date().toISOString(),
      title: String(comunityName),
      image: String(comunityImageUrl),
    };

    setComunities([...comunities, newComunity]);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUserName} />
      <MainGrid>
        <div className='profile' style={{ gridArea: 'profile' }}>
          <ProfileSidebar userName={githubUserName} />
        </div>
        <div className='welcome' style={{ gridArea: 'welcome' }}>
          <Box>
            <h1 className='title'>Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <NewComunityForm handleSubmit={handleCreateComunity} />
        </div>
        {/* componentizar ProfileRelations */}
        <div
          className='profileRelations'
          style={{ gridArea: 'profileRelations' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade ({favoritesPeople?.length})
            </h2>
            <ul>
              {favoritesPeople?.map((person) => (
                <li key={person?.id}>
                  <a href={`/users/${person?.userName}`}>
                    <img src={person?.avatarUrl} alt={person?.userName} />
                    <span>{person?.userName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          {/* componentizar ProfileComunities */}
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>Comunidades ({comunities?.length})</h2>
            <ul>
              {comunities?.map((comunity) => (
                <li key={comunity?.id}>
                  <a href={`/users/${comunity?.title}`}>
                    <img alt={comunity?.title} src={comunity.image} />
                    <span>{comunity?.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
