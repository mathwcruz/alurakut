import { Community } from 'pages/communities';

interface CommunitiesListProps {
  communities: Community[];
}

//ajustar quebra de layout no mobile

export function CommunitiesList({ communities }: CommunitiesListProps) {
  return (
    <ul>
      {communities?.map((community) => (
        <li key={community?.id}>
          <div>
            <div
              style={{
                backgroundImage: `url('${community?.imageUrl}')`,
              }}
            />
            <section className='community-main-info'>
              <p>{community?.title}</p>
              <strong>Criado por {community?.creatorSlug}</strong>
            </section>
          </div>
          <small>Criada no dia {community?.createdAt}</small>
        </li>
      ))}
    </ul>
  );
}
