import { AlurakutProfileSidebarMenuDefault } from 'lib/AlurakutCommons';

import { Box } from 'styles/components/Box';

interface ProfileSidebarProps {
  userName: string;
}

export function ProfileSidebar({ userName }: ProfileSidebarProps) {
  return (
    <Box as='aside'>
      <img
        style={{ borderRadius: '8px' }}
        src={`https://github.com/${userName}.png`}
        alt='Matheus da Cruz'
      />
      <hr />
      <p>
        <a
          className='boxLink'
          href={`https://github.com/${userName}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {userName}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}
