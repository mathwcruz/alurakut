import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode';

import { AlurakutMenu } from 'lib/AlurakutCommons';

import { Friend } from 'components/Friends/FriendsList';

import { FriendsList } from 'components/Friends/FriendsList';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api, authApi } from 'services/api';

import { Box } from 'styles/components/Box';
import { Wrapper } from 'styles/pages/Friends';

interface FriendsProps {
  userName: string;
  friends: Friend[];
}

export default function Friends({ userName, friends }: FriendsProps) {
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

  const { githubUser } = decode<{ githubUser: string }>(token);

  const { data: githubFollowers } = await api.get(
    `https://api.github.com/users/${githubUser}/followers`
  );

  const friends = githubFollowers?.map((friend) => {
    return {
      id: friend?.id,
      userName: friend?.login,
      avatarUrl: friend?.avatar_url,
    };
  });

  return {
    props: {
      userName: githubUser,
      friends,
    },
  };
};
