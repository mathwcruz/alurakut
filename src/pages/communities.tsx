import { useMemo, useState } from 'react';

import { AlurakutMenu } from 'lib/AlurakutCommons';

import { CommunitiesList } from 'components/Communities/CommunitiesList';
import { ProfileSidebar } from 'components/Home/ProfileSidebar';

import { api } from 'services/api';

import { Box } from 'styles/components/Box';
import { Wrapper } from 'styles/pages/Communities';
import { dateFormatter } from '~/utils/dateFormatter';

export type Community = {
  id: string;
  title: string;
  imageUrl: string;
  creatorSlug: string;
  createdAt: string;
};

interface CommunitiesProps {
  userName: string;
}

export default function Communities({
  userName = 'mathwcruz',
}: CommunitiesProps) {
  const [communities, setCommunities] = useState<Community[]>([]);

  // fazer chamada pelo server side
  useMemo(async () => {
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
          Authorization: 'eb231268f090758a55c2ffc120d0d5',
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

    setCommunities(allCommunitiesFormatted);
  }, []);

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
