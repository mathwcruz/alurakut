import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';

import { api } from 'services/api';
import { GetServerSideProps } from 'next';

export default function Login() {
  const [githubUser, setGithubUser] = useState('');
  const router = useRouter();

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    if (githubUser.trim() !== '') {
      try {
        const body = JSON.stringify({
          githubUser,
        });

        const { data } = await api.post(
          'https://alurakut.vercel.app/api/login',
          body,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const token = data?.token;
        setCookie(undefined, 'alurakut.token', token, {
          maxAge: 86400,
        });

        router.push('/');
      } catch (error) {
        toast.error(`Ocorreu um erro, ${error}`);
      }

      return;
    }

    toast.error('Preencha o campo com o seu usuário');
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
            <button type='submit'>Login</button>
          </form>
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const cookies = parseCookies(ctx);
//   const token = cookies['alurakut.token'];

//   // if (token) {
//   //   return {
//   //     redirect: {
//   //       destination: '/',
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   return {
//     props: {},
//   };
// };
