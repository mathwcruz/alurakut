import { ProfileRelationsBoxWrapper } from 'styles/components/ProfileRelations';

type ProfileFavoritesPeople = {
  id: string;
  userName: string;
  avatarUrl: string;
};

type ProfileComunity = {
  id: string;
  title: string;
  image: string;
};

interface ProfileBoxProps {
  title: string;
  type: 'favoritesPeople' | 'comunities';
  profileData: ProfileComunity[] | ProfileFavoritesPeople[];
}

export function ProfileBox({ title, type, profileData }: ProfileBoxProps) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {title} ({profileData?.length})
      </h2>
      {type === 'favoritesPeople' ? (
        <ul>
          {profileData?.map((person) => (
            <li key={person?.id}>
              <a
                href={`https://github.com/${person?.userName}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={person?.avatarUrl} alt={person?.userName} />
                <span>{person?.userName}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {profileData?.map((comunity) => (
            <li key={comunity?.id}>
              <a href={`/users/${comunity?.title}`}>
                <img alt={comunity?.title} src={comunity.image} />
                <span>{comunity?.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </ProfileRelationsBoxWrapper>
  );
}
