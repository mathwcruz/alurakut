import { Box } from 'styles/components/Box';

interface NewCommunityFormProps {
  handleSubmit: (e) => void;
}

export function NewCommunityForm({ handleSubmit }: NewCommunityFormProps) {
  return (
    <Box>
      <h1 className='subTitle'>Quer criar uma comunidade?</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='title'
            placeholder='Qual vai ser o nome da sua comunidade?'
            aria-label='Qual vai ser o nome da sua comunidade?'
          />
        </div>
        <div>
          <input
            name='image'
            placeholder='Coloque uma URL para usarmos de capa'
            aria-label='Coloque uma URL para usarmos de capa'
          />
        </div>
        <button type='submit'>Criar comunidade</button>
      </form>
    </Box>
  );
}
