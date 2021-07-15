import { useMemo, useState } from 'react';

import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';

import { NewCommunityForm } from 'components/Home/NewCommunityForm';
import { ProfileBox } from 'components/Home/ProfileBox';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { MainGrid } from 'styles/components/MainGrid';
import axios from 'axios';

interface FriendsData {
  id: number;
  userName: string;
  avatarUrl: string;
}

interface CommunityData {
  id: string;
  title: string;
  imageUrl: string;
  creatorSlug?: string;
}

export default function Home({ githubUserName = 'mathwcruz' }) {
  const [friends, setFriends] = useState<FriendsData[]>([]);
  const [communities, setCommunities] = useState<CommunityData[]>([]);

  useMemo(async () => {
    const { data: userFollowers } = await api.get(
      `https://api.github.com/users/${githubUserName}/followers`
    );

    const friends = userFollowers?.slice(0, 6)?.map((people) => {
      return {
        id: people?.id,
        userName: people?.login,
        avatarUrl: people?.avatar_url,
      };
    });

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
          Authorization: 'eb231268f090758a55c2ffc120d0d5',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    setCommunities(allCommunities?.data?.allCommunities);
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
      creatorSlug: String(githubUserName),
    };

    const { data: newCommunityRegistered } = await axios.post(
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
