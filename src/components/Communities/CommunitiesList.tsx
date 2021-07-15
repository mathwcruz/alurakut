import { Community } from 'pages/communities';

interface CommunitiesListProps {
  communities: Community[];
}

export function CommunitiesList({ communities }: CommunitiesListProps) {
  return (
    <ul>
      {communities?.map((community) => (
        <li key={community?.id}>
          <section>
            <img src={community?.imageUrl} alt={community?.title} />
            <p>{community?.title}</p>
            <h3>{community?.creatorSlug}</h3>
            <small>{community?.createdAt}</small>
          </section>
        </li>
      ))}
    </ul>
  );
}
