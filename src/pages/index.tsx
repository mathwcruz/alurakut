import { useMemo, useState } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';
import { ProfileSidebar } from 'components/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { MainGrid } from 'styles/components/MainGrid';
import { ProfileRelationsBoxWrapper } from 'styles/components/ProfileRelations';

interface favoritesPeopleData {
  id: string;
  userName: string;
  avatar_url: string;
}

export default function Home() {
  const [favoritesPeople, setFavoritesPeople] = useState<favoritesPeopleData[]>(
    []
  );

  const githubUserName = 'mathwcruz';

  useMemo(async () => {
    const { data } = await api.get(
      `https://api.github.com/users/${githubUserName}/followers`
    );

    const favoritesPeople = data?.slice(0, 6)?.map((people) => {
      return {
        id: people?.id,
        userName: people?.login,
        avatar_url: people?.avatar_url,
      };
    });

    setFavoritesPeople(favoritesPeople);
  }, []);

  console.log({ favoritesPeople });

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
        </div>
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
                    <img src={person?.avatar_url} alt={person?.userName} />
                    <span>{person?.userName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidade</Box>
        </div>
      </MainGrid>
    </>
  );
}
