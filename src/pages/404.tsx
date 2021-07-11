import Link from 'next/link';

export default function NotFound() {
  return (
    <div className=''>
      <div>
        <img src='/images/404-not-found.svg' alt='Página não encontrada' />{' '}
        {/* pegar imagem no undraw com as cores do app */}
        <p>Esta página não foi encontrada</p>
        <h4>
          Siga para a{' '}
          <Link href='/'>
            <a>página inicial</a>
          </Link>
        </h4>
      </div>
    </div>
  );
}
