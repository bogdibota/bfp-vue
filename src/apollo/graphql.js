import gql from 'graphql-tag';

export const ALL_GROUPS_QUERY = gql`
    query myGroups($accessToken: String!) {
        myGroups(accessToken: $accessToken) {
            id
            name
        }
    }
`;

export const CREATE_GROUP_MUTATION = gql`
    mutation createGroup($accessToken: String!, $name: String!) {
        createGroup(
            accessToken: $accessToken,
            name: $name
        )
        {
            id
            name
        }
    }
`;