type Friend = {
  id: number;
  userName: string;
  avatarUrl: string;
};

interface FriendsListProps {
  friends: Friend[];
}

export function FriendsList({ friends }: FriendsListProps) {
  return (
    <ul>
      {friends?.map((friend) => (
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
  );
}
