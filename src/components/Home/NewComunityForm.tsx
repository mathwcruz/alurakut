import { Box } from 'styles/components/Box';

interface NewComunityFormProps {
  handleSubmit: (e) => void;
}

export function NewComunityForm({ handleSubmit }) {
  return (
    <Box>
      <h1 className='subTitle'>O que você deseja fazer?</h1>
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
