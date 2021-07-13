import Link from 'next/link';

import { Wrapper } from 'styles/pages/404';

export default function NotFound() {
  return (
    <Wrapper>
      <div>
        <img src='/images/404-not-found.svg' alt='Página não encontrada' />
        <p>Esta página não foi encontrada</p>
        <h4>
          Siga para a{' '}
          <Link href='/'>
            <a>página inicial</a>
          </Link>
        </h4>
      </div>
    </Wrapper>
  );
}
