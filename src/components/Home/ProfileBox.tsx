import Link from 'next/link';
import { ProfileRelationsBoxWrapper } from 'styles/components/ProfileRelations';

type ProfileFriends = {
  id: number;
  userName: string;
  avatarUrl: string;
};

type ProfileComunity = {
  id: string;
  title: string;
  imageUrl: string;
};

interface ProfileBoxProps {
  title: string;
  type: 'friends' | 'communities';
  profileData: ProfileComunity[] | ProfileFriends[];
}

export function ProfileBox({ title, type, profileData }: ProfileBoxProps) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {title} ({profileData?.length})
      </h2>
      {type === 'friends' ? (
        <ul>
          {profileData?.map((friend) => (
            <li key={friend?.id}>
              <a
                href={`https://github.com/${friend?.userName}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={friend?.avatarUrl} alt={friend?.userName} />
                <span>{friend?.userName}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {profileData?.map((comunity) => (
            <li key={comunity?.id}>
              <a href={`/users/${comunity?.title}`}>
                <img alt={comunity?.title} src={comunity.imageUrl} />
                <span>{comunity?.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <hr />
      <Link href={`/${type}`}>
        <a>{type === 'friends' ? 'Ver todos' : 'Ver todas'}</a>
      </Link>
    </ProfileRelationsBoxWrapper>
  );
}
