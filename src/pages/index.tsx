import { useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';

import { NewCommunityForm } from 'components/Home/NewCommunityForm';
import { ProfileBox } from 'components/Home/ProfileBox';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api } from 'services/api';

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
  userName: string;
  communities: CommunityData[];
}

export default function Home({
  userName = 'mathwcruz',
  communities: initialCommunities,
}: HomeProps) {
  const [friends, setFriends] = useState<FriendsData[]>([]);
  const [communities, setCommunities] =
    useState<CommunityData[]>(initialCommunities);

  useMemo(async () => {
    const { data: userFollowers } = await api.get(
      `https://api.github.com/users/${userName}/followers`
    );

    const friends = userFollowers?.slice(0, 6)?.map((people) => {
      return {
        id: people?.id,
        userName: people?.login,
        avatarUrl: people?.avatar_url,
      };
    });

    setFriends(friends);
  }, []);

  async function handleCreateCommunity(e) {
    e.preventDefault();

    const data = new FormData(e?.target);
    const communityName = data.get('title');
    const communityImageUrl = data.get('image');

    const newCommunity = {
      title: String(communityName),
      imageUrl: String(communityImageUrl),
      creatorSlug: String(userName),
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

    setCommunities([...communities, newCommunityRegistered?.register]);
  }

  return (
    <>
      <AlurakutMenu githubUser={userName} />
      <MainGrid>
        <div className='profile' style={{ gridArea: 'profile' }}>
          <ProfileSidebar userName={userName} />
        </div>

        <div className='welcome' style={{ gridArea: 'welcome' }}>
          <Box>
            <h1 className='title'>Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <NewCommunityForm handleSubmit={handleCreateCommunity} />
        </div>

        <div
          className='profileRelations'
          style={{ gridArea: 'profileRelations' }}
        >
          <ProfileBox title='Amigos' type='friends' profileData={friends} />

          <ProfileBox
            title='Comunidades'
            type='communities'
            profileData={communities}
          />
        </div>
      </MainGrid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryData = JSON.stringify({
    query: `query {
              allCommunities {
                id
                title
                imageUrl
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

  return {
    props: {
      communities: allCommunities?.data?.allCommunities,
    },
  };
};
