import { GetServerSideProps } from 'next';

import { AlurakutMenu } from 'lib/AlurakutCommons';

import { CommunitiesList } from 'components/Communities/CommunitiesList';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api } from 'services/api';
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
  userName: string;
  communities: Community[];
}

export default function Communities({
  userName = 'mathwcruz',
  communities,
}: CommunitiesProps) {
  return (
    <>
      <AlurakutMenu githubUser={userName} />
      <Wrapper>
        <div className='profile' style={{ gridArea: 'profile' }}>
          <ProfileSidebar userName={userName} />
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

export const getServerSideProps: GetServerSideProps = async () => {
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
      communities: allCommunitiesFormatted,
    },
  };
};
