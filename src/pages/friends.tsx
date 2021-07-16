import { GetServerSideProps } from 'next';
import decode from 'jwt-decode';

import { AlurakutMenu } from 'lib/AlurakutCommons';

import { Friend } from 'components/Friends/FriendsList';

import { FriendsList } from 'components/Friends/FriendsList';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { Wrapper } from 'styles/pages/Friends';
import { parseCookies } from 'nookies';

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

  // trocar para if (!token || !isAuthenticated)
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { githubUser } = decode<{ githubUser: string }>(token);

  const { data } = await api.get('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token,
    },
  });
  const isAuthenticated = data?.isAuthenticated;

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
