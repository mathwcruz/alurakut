import { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AlurakutMenu, OrkutNostalgicIconSet } from 'lib/AlurakutCommons';

import { NewCommunityForm } from 'components/Home/NewCommunityForm';
import { ProfileBox } from 'components/Home/ProfileBox';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { MainGrid } from 'styles/components/MainGrid';

interface FriendsData {
  id: string;
  userName: string;
  avatarUrl: string;
}

interface CommunityData {
  id: string;
  title: string;
  image: string;
}

export default function Home({ githubUserName = 'mathwcruz' }) {
  const [friends, setFriends] = useState<FriendsData[]>([]);
  const [comunities, setComunities] = useState<CommunityData[]>([]);

  useMemo(async () => {
    const { data } = await api.get(
      `https://api.github.com/users/${githubUserName}/followers`
    );

    const friends = data?.slice(0, 6)?.map((people) => {
      return {
        id: people?.id,
        userName: people?.login,
        avatarUrl: people?.avatar_url,
      };
    });

    setFriends(friends);
  }, []);

  function handleCreateCommunity(e) {
    e.preventDefault();

    const data = new FormData(e?.target);
    const communityName = data.get('title');
    const communityImageUrl = data.get('image');

    const newCommunity = {
      id: uuid(),
      title: String(communityName),
      image: String(communityImageUrl),
    };

    setComunities([...comunities, newCommunity]);
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
            type='comunities'
            profileData={comunities}
          />
        </div>
      </MainGrid>
    </>
  );
}
