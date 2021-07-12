import { Box } from 'styles/components/Box';

interface ProfileSidebarProps {
  userName: string;
}

export function ProfileSidebar({ userName }: ProfileSidebarProps) {
  return (
    <Box>
      <img
        style={{ borderRadius: '8px' }}
        src={`https://github.com/${userName}.png`}
        alt='Matheus da Cruz'
      />
    </Box>
  );
}
