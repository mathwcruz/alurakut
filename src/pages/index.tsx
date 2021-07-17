import { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode';
import { useValidateImageURL } from 'use-validate-image-url';
import { toast } from 'react-toastify';

import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';

import { ProfileBox } from 'components/Home/ProfileBox';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api, authApi } from 'services/api';
import { validateURL } from 'utils/validateUrl';

import { Box } from 'styles/components/Box';
import { MainGrid } from 'styles/components/MainGrid';

interface FriendsData {
  id: number;
  userName: string;
  avatarUrl: string;
}

interface CommunityData {
  id: string;
  title: string;
  imageUrl: string;
}

interface HomeProps {
  githubUser: string;
  totalFriends: number;
  friends: FriendsData[];
  communities: CommunityData[];
  totalCommunities: number;
}

export default function Home({
  githubUser,
  totalFriends,
  friends,
  communities: initialCommunities,
  totalCommunities,
}: HomeProps) {
  const [communities, setCommunities] =
    useState<CommunityData[]>(initialCommunities);
  const [communityName, setCommunityName] = useState('');
  const [communityImageUrl, setCommunityImageUrl] = useState('');
  const isImageURLValid = useValidateImageURL(communityImageUrl);

  async function handleCreateCommunity(e: FormEvent) {
    e.preventDefault();

    if (communityName.trim() === '' || communityImageUrl.trim() === '') {
      toast.error('Preencha os dois campos, por favor');
      return;
    }

    console.log({ isImageURLValid });

    if (isImageURLValid === 'invalid') {
      toast.error('Insira um endereço de imagem válido, por favor');
      return;
    }

    const newCommunity = {
      title: communityName,
      imageUrl: communityImageUrl,
      creatorSlug: githubUser,
    };

    const { data: newCommunityRegistered } = await api.post(
      '/api/communities',
      newCommunity,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    toast.success('Comunidade criada!');

    setCommunities([...communities, newCommunityRegistered?.register]);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profile' style={{ gridArea: 'profile' }}>
          <ProfileSidebar userName={githubUser} />
        </div>

        <div className='welcome' style={{ gridArea: 'welcome' }}>
          <Box>
            <h1 className='title'>Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          {/* <NewCommunityForm handleSubmit={handleCreateCommunity} /> */}
          <Box>
            <h1 className='subTitle'>Quer criar uma comunidade?</h1>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  type='text'
                  name='title'
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                />
              </div>
              <div>
                <input
                  name='image'
                  value={communityImageUrl}
                  onChange={(e) => setCommunityImageUrl(e.target.value)}
                  placeholder='Coloque uma URL para usarmos de capa'
                  aria-label='Coloque uma URL para usarmos de capa'
                />
              </div>
              <button type='submit'>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className='profileRelations'
          style={{ gridArea: 'profileRelations' }}
        >
          <ProfileBox
            title='Amigos'
            type='friends'
            profileData={friends}
            totalCount={totalFriends}
          />

          <ProfileBox
            title='Comunidades'
            type='communities'
            profileData={communities}
            totalCount={totalCommunities}
          />
        </div>
      </MainGrid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['alurakut.token'];

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { data } = await authApi.get(`/api/auth`, {
    headers: {
      authorization: token,
    },
  });

  const isAuthenticated = data?.isAuthenticated;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const queryData = JSON.stringify({
    query: `query {
              allCommunities(first: 6) {
                id
                title
                imageUrl
              }
              _allCommunitiesMeta {
                count
              }
            }`,
  });

  const { data: allCommunities } = await api.post(
    'https://graphql.datocms.com/',
    queryData,
    {
      headers: {
        Authorization: process.env.DATO_CMS_READ_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  const { githubUser } = decode<{ githubUser: string }>(token);

  const { data: userFollowers } = await api.get(
    `https://api.github.com/users/${githubUser}/followers`
  );

  const friends = userFollowers?.slice(0, 6)?.map((people) => {
    return {
      id: people?.id,
      userName: people?.login,
      avatarUrl: people?.avatar_url,
    };
  });

  return {
    props: {
      githubUser,
      friends,
      totalFriends: userFollowers?.length,
      communities: allCommunities?.data?.allCommunities,
      totalCommunities: allCommunities?.data?._allCommunitiesMeta?.count,
    },
  };
};
