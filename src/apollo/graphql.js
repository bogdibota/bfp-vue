import gql from 'graphql-tag';

const groupFields = `{
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
                    avatar
                }
                to {
                    name
                    avatar
                }
                price
                comment
            }
            users {
                id
                name
                avatar
            }
    }
`;

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
            ${groupFields}
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
           ${groupFields}
        }
    }
`;

export const UPDATE_GROUP_MUTATION = gql`
    mutation updateGroup($accessToken: String!, $id: String!, $addUserId: String, $name: String) {
        updateGroup(
            accessToken: $accessToken,
            id: $id,
            addUserId: $addUserId,
            name: $name
        )
        {
            id
            name
            users {
                id
                name
                avatar
            }
        }         
}
`;

export const ADD_EXPENSE_MUTATION = gql`
    mutation addExpense($accessToken: String!, $groupId: String!, $payerId: String!, $peopleIds: [String]!, $name: String!, $price: Float!) {
        addExpense(
             accessToken: $accessToken, 
             groupId: $groupId,
             payerId: $payerId,
             peopleIds: $peopleIds,
             name: $name,
             price: $price)
        {
            ${groupFields}
        }
    }
`;

export const ADD_TRANSACTION_MUTATION = gql`
        mutation addTransaction($accessToken: String!, $groupId: String!, $fromId: String!, $toId: String!, $comment: String!, $price: Float!) {
        addTransaction(
             accessToken: $accessToken, 
             groupId: $groupId,
             fromId: $fromId,
             toId: $toId,
             comment: $comment,
             price: $price)
        {
            ${groupFields}
        }
    }
`;