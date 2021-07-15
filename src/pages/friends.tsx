import { useState, useMemo } from 'react';
import { GetServerSideProps } from 'next';

import { AlurakutMenu } from 'lib/AlurakutCommons';

import { Friend } from 'components/Friends/FriendsList';

import { FriendsList } from 'components/Friends/FriendsList';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { Wrapper } from 'styles/pages/Friends';

interface FriendsProps {
  userName: string;
}

export default function Friends({ userName = 'mathwcruz' }: FriendsProps) {
  const [friends, setFriends] = useState<Friend[]>([]);

  useMemo(async () => {
    const { data } = await api.get(
      `https://api.github.com/users/${userName}/followers`
    );

    const friends = data?.map((friend) => {
      return {
        id: friend?.id,
        userName: friend?.login,
        avatarUrl: friend?.avatar_url,
      };
    });

    setFriends(friends);
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={userName} />
      <Wrapper>
        <div className='profile' style={{ gridArea: 'profile' }}>
          <ProfileSidebar userName={userName} />
        </div>
        <div className='friends' style={{ gridArea: 'friends' }}>
          <Box>
            <h1 className='title'>Meus amigos</h1>
            <FriendsList friends={friends} />
          </Box>
        </div>
      </Wrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // salvar o userName nos cookies, puxar aq e fazer a requisição pro github trazendo todos os followers

  return {
    props: {},
  };
};