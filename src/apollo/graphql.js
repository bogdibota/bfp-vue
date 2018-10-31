import gql from 'graphql-tag';

export const ALL_GROUPS_QUERY = gql`
    query myGroups($accessToken: String!) {
        myGroups(accessToken: $accessToken) {
            id
            name
        }
    }
`;

export const GET_PERSONS_QUERY = gql`
    query myFriends($accessToken: String!, $excludeGroupId:String) {
        myFriends(accessToken: $accessToken, excludeGroupId: $excludeGroupId) {
            id
            name
            avatar
        }
    }
`;


export const GET_GROUP_QUERY = gql`
    query groupById($accessToken: String!, $id:String!) {
        groupById(accessToken: $accessToken, id: $id) {
            name
            owner {
                id
                name
            }
            expenses {
                name
                price
            }
            transactions {
                from {
                    name
                }
                to {
                    name
                }
                price
            }
            users {
                id
                name
            }
            
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