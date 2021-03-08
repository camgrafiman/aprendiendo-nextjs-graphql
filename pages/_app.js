import '../styles/globals.css'
/* Aqui traemos todo lo necesario para usar el apolloClient */
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../librerias/apollo';

function MyApp({ Component, pageProps }) {

  // usar el hook para instanciar el cliente Apollo:
  const clienteApollo = useApollo(pageProps.initialApolloState);

  // envuelvo el componente madre en un proveedor de Apollo:

  return (
    <ApolloProvider client={clienteApollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
