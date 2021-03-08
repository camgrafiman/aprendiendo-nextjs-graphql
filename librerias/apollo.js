import { useMemo } from 'react';
import crearApolloCliente from './apolloCliente';

let clienteApollo;

export function iniciarApollo(initialState = null) {
    const _clienteApollo = clienteApollo ?? crearApolloCliente();

    // Si la página tiene algun metodo de fetching que usa Apollo Client, el estado inicial se instancia aqui.
    if (initialState) {
        const cacheExistente = _clienteApollo.extract();

        // Restaurar la cache usando la data pasada desde getStaticProps/getServerSideProps combinada con la data cacheada actualmente.
        _clienteApollo.cache.restore({ ...cacheExistente, ...initialState });
    }

    // Para SSG y SSR se necesita crear siempre un nuevo cliente de Apollo:
    if (typeof window === 'undefined') return _clienteApollo;

    // Crear un cliente Apollo una vez desde el cliente:
    if (!clienteApollo) clienteApollo = _clienteApollo;
    return _clienteApollo;
}
//useApollo hook:
export function useApollo(initialState) {
    const apolloStore = useMemo(() => iniciarApollo(initialState), [initialState]);
    return apolloStore;
}