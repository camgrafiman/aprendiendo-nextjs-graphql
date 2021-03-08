import gql from 'graphql-tag';

const GET_POST_BY_ID = gql`
    query postPorId($id: Int!) {
        posts(limit: 1, where: {id: {_eq: $id}}) {
            categoria
            id
            titulo
        }
    }
`;

export default GET_POST_BY_ID;