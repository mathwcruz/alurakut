import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode';

import { AlurakutMenu } from 'lib/AlurakutCommons';

import { CommunitiesList } from 'components/Communities/CommunitiesList';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api, authApi } from 'services/api';
import { dateFormatter } from 'utils/dateFormatter';

import { Box } from 'styles/components/Box';
import { Wrapper } from 'styles/pages/Communities';

export type Community = {
  id: string;
  title: string;
  imageUrl: string;
  creatorSlug: string;
  createdAt: string;
};

interface CommunitiesProps {
  githubUser: string;
  communities: Community[];
}

export default function Communities({
  githubUser,
  communities,
}: CommunitiesProps) {
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <Wrapper>
        <div className='profile' style={{ gridArea: 'profile' }}>
          <ProfileSidebar userName={githubUser} />
        </div>
        <div className='communities' style={{ gridArea: 'communities' }}>
          <Box>
            <h1 className='title'>Minhas Comunidades</h1>
            <CommunitiesList communities={communities} />
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

  const queryData = JSON.stringify({
    query: `query {
              allCommunities {
                id
                title
                imageUrl
                creatorSlug
                createdAt
              }
            }`,
  });

  const { githubUser } = decode<{ githubUser: string }>(token);

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

  const allCommunitiesFormatted = allCommunities?.data?.allCommunities?.map(
    (community) => {
      return {
        ...community,
        createdAt: dateFormatter(community?.createdAt, 'dd-MMM-yy'),
      };
    }
  );

  return {
    props: {
      githubUser,
      communities: allCommunitiesFormatted,
    },
  };
};
