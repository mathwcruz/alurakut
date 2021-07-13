import { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';

import { NewComunityForm } from 'components/NewComunityForm';
import { ProfileBox } from 'components/ProfileBox';
import { ProfileSidebar } from 'components/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { MainGrid } from 'styles/components/MainGrid';

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
      id: uuid(),
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

        <div
          className='profileRelations'
          style={{ gridArea: 'profileRelations' }}
        >
          <ProfileBox
            title='Pessoas da comunidade'
            type='favoritesPeople'
            profileData={favoritesPeople}
          />

          <ProfileBox
            title='Comunidades'
            type='comunities'
            profileData={comunities}
          />
        </div>
      </MainGrid>
    </>
  );
}
