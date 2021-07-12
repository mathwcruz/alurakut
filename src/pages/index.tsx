import { useEffect } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';
import { ProfileSidebar } from 'components/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { MainGrid } from 'styles/components/MainGrid';
import { ProfileRelationsBoxWrapper } from 'styles/components/ProfileRelations';

export default function Home() {
  const githubUserName = 'mathwcruz';
  let favoritesPeople = [
    'mathwcruz',
    'omariosouto',
    'juunegreiros',
    'marcobrunodev',
    'felipefialho',
  ];

  // async function loadFavoritesPeople() {
  //   const { data } = await api.get(
  //     `https://api.github.com/users/${githubUserName}/followers`
  //   );

  //   setFavoritesPeople(data);
  // }

  // buscar followers do github
  useEffect(() => {}, []);

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
                <li key={person}>
                  <a href={`/users/${person}`}>
                    <img src={`https://github.com/${person}.png`} />
                    <span>{person}</span>
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
