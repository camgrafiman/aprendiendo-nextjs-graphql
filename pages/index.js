import Head from 'next/head'
// Importo lo necesario para usar Apollo:
import { useQuery } from '@apollo/client';
import GET_POST_BY_ID from '../librerias/queries/get_post_by_id';
import { iniciarApollo } from '../librerias/apollo';

// Estilos:
import styles from '../styles/Home.module.css'

// Test con un id, en este caso un Int.
const VARIABLE = 1;

export default function Home() {
  // usar el hook useQuery para obtener datos:
  const { data, error, loading } = useQuery(GET_POST_BY_ID, { variables: { id: VARIABLE } });

  if (loading) return <h1>Cargando...</h1>;

  if (error || !data) return <h2>Error</h2>;
  if (data.posts.length === 0) return <h3> Post no encontrado. 404. </h3>
  
  console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {data?.posts[0].titulo}
        </h1>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

// método de next.js para conseguir datos del lado del servidor:
export const getServerSideProps = async () => {
  // primero inicio el cliente:
  const clienteApollo = iniciarApollo();
  await clienteApollo.query({
    query: GET_POST_BY_ID,
    variables: { id: VARIABLE }
  });

  // y ahora retorno la data al props, que será enviado a los props del componente Home.

  return {
    props: { initialApolloState: clienteApollo.cache.extract()}
  }
}