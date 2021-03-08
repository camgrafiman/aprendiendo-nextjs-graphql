import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import getConfig from 'next/config';

// const { publicRuntimeConfig } = getConfig();

function crearApolloCliente() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: process.env.API_URL,
            headers: {
                'X-hasura-admin-secret': process.env.API_KEY,
                lang: 'en'
            }
        }),
        cache: new InMemoryCache()
    })
}

export default crearApolloCliente;