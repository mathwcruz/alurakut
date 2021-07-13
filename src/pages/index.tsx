import { FormEvent, useMemo, useState } from 'react';
import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';
import { ProfileSidebar } from 'components/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { MainGrid } from 'styles/components/MainGrid';
import { ProfileRelationsBoxWrapper } from 'styles/components/ProfileRelations';

interface favoritesPeopleData {
  id: string;
  userName: string;
  avatarUrl: string;
}

//TODO: estilizar página 404

export default function Home({ githubUserName = 'mathwcruz' }) {
  const [favoritesPeople, setFavoritesPeople] = useState<favoritesPeopleData[]>(
    []
  );
  const [comunities, setComunities] = useState(['Alurakut']);

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

  function handleCreateComunity(e: FormEvent) {
    e.preventDefault();

    console.log({ e });

    setComunities([...comunities]);
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

          {/* componentizar formulário */}
          <Box>
            <h1 className='subTitle'>O que você deseja fazer?</h1>
            <form onSubmit={handleCreateComunity}>
              <div>
                <input
                  type='text'
                  name='title'
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                />
              </div>
              <div>
                <input
                  name='image'
                  placeholder='Coloque uma URL para usarmos de capa'
                  aria-label='Coloque uma URL para usarmos de capa'
                />
              </div>
              <button type='submit'>Criar comunidade</button>
            </form>
          </Box>
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
                <li key={comunity}>
                  <a href={`https://github.com/mathwcruz`}>
                    <img
                      src={`https://github.com/mathwcruz.png`}
                      alt={`Matheus da Cruz`}
                    />
                    <span>{comunity}</span>
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
