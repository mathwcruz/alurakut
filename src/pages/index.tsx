import { Box, MainGrid } from 'styles/pages/Home';

export default function Home() {
  return (
    <MainGrid>
      <div style={{ gridArea: 'profile' }}>
        <Box>Imagem</Box>
      </div>
      <div style={{ gridArea: 'welcome' }}>
        <Box>Bem-vindo</Box>
      </div>
      <div style={{ gridArea: 'profileRelations' }}>
        <Box>Pessoas da comunidade</Box>
      </div>
    </MainGrid>
  );
}
