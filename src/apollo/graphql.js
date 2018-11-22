import gql from 'graphql-tag';
import { getAccessToken } from '../lib/facebook';

const groupFields = `
    id
    name
    owner {
        id
        name
    }
    expenses {
        id
        name
        price
        date
        payer {
            id
            name
            avatar
        }
        people {
            id
            name
            avatar
        }
    }
    transactions {
        id
        from {
            id
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

export const updateGetGroupById = (mutationName, fieldUpdate) => (store, { data }) => {
    const variables = { accessToken: getAccessToken(), id: data[mutationName].id };
    const cachedData = store.readQuery({
        query: GET_GROUP_QUERY,
        variables,
    });

    cachedData.groupById[fieldUpdate] = data[mutationName][fieldUpdate];

    store.writeQuery({
        query: GET_GROUP_QUERY,
        variables,
        data: cachedData,
    });
};

export const CREATE_GROUP_MUTATION = gql`
    mutation createGroup($accessToken: String!, $name: String!) {
        createGroup(
            accessToken: $accessToken,
            name: $name
        ) {
           ${groupFields}
        }
    }
`;

export const UPDATE_GROUP_MUTATION = gql`
    mutation updateGroup($accessToken: String!, $id: String!, $addUserId: String, $removeUserId: String, $name: String) {
        updateGroup(
            accessToken: $accessToken,
            id: $id,
            addUserId: $addUserId,
            removeUserId: $removeUserId,
            name: $name
        ) {
            ${groupFields}
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
             price: $price
        ) {
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
             price: $price
        ) {
            ${groupFields}
        }
    }
`;

export const MAKE_MAGIC_QUERY = gql`
    query makeMagic($accessToken: String!, $groupId: String!) {
        makeMagic(
            accessToken: $accessToken,
            groupId: $groupId
        ) {
            pool {
                user {
                    id
                    name
                    avatar
                }          
                status
            }
           }
    }
`;

export const REMOVE_EXPENSE_MUTATION = gql`
    mutation removeExpense($accessToken: String!, $groupId: String!, $id: String!) {
        removeExpense(
            accessToken: $accessToken,
            groupId: $groupId,
            id: $id
        ) {
            ${groupFields}
          }
    }
`;

export const REMOVE_TRANSACTION_MUTATION = gql`
    mutation removeTransaction($accessToken: String!, $groupId: String!, $id: String!) {
        removeTransaction(
            accessToken: $accessToken,
            groupId: $groupId,
            id: $id
        ) {
            ${groupFields}
          }
    }
`;

export const DELETE_GROUP_MUTATION = gql`
    mutation removeGroup($accessToken: String!, $groupId: String!) {
        removeGroup (
             accessToken: $accessToken, 
             id: $groupId,
        ) 
    }
`;

export const UPDATE_EXPENSE_MUTATION = gql`
    mutation updateExpense($accessToken: String!, $groupId: String!, $id: String!, $peopleIds: [String], $name: String, $price: Float) {
        updateExpense (
            accessToken: $accessToken, 
            groupId: $groupId,
            id: $id,
            peopleIds: $peopleIds,
            name: $name, 
            price: $price
        ) {
            ${groupFields}
          }
    }
`;

export const UPDATE_TRANSACTION_MUTATION = gql`
    mutation updateTransaction($accessToken: String!, $groupId: String!, $id: String!, $toId: String, $comment: String, $price: Float) {
        updateTransaction (
            accessToken: $accessToken, 
            groupId: $groupId,
            id: $id,
            toId: $toId,
            comment: $comment, 
            price: $price
        ) {
            ${groupFields}
          }
    }
`;

