import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { api } from 'services/api';

export default function Login() {
  const [githubUser, setGithubUser] = useState('');
  const router = useRouter();

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    if (githubUser.trim() !== '') {
      try {
        const { data } = await api.post(
          'https://alurakut.vercel.app/api/login',
          githubUser
        );

        console.log(data?.token);
      } catch (error) {
        console.log(error);
      }

      // setGithubUser('');
      // router.push('/');
    }

    return;
  }

  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className='loginScreen'>
        <section className='logoArea'>
          <img src='https://alurakut.vercel.app/logo.svg' />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className='formArea'>
          <form onSubmit={handleSignIn} className='box'>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              value={githubUser}
              onChange={(e) => setGithubUser(e.target.value)}
              placeholder='Usuário'
            />
            {githubUser?.length === 0 && <span>Campo obrigatório</span>}
            <button type='submit'>Login</button>
          </form>

          <footer className='box'>
            <p>
              Ainda não é membro? <br />
              <Link href='/login'>
                <a>
                  <strong>ENTRAR JÁ</strong>
                </a>
              </Link>
            </p>
          </footer>
        </section>

        <footer className='footerArea'>
          <p>
            © 2021 alura.com.br - <a href='/'>Sobre o Orkut.br</a> -{' '}
            <a href='/'>Centro de segurança</a> - <a href='/'>Privacidade</a> -{' '}
            <a href='/'>Termos</a> - <a href='/'>Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
