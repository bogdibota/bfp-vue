import UserService from './user-service';
import { BACKEND_URL } from '../env';

const graphQLServer = BACKEND_URL;

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

function getAccessToken() {
  return UserService.getAccessToken();
}

async function call(query) {
  const resp = await fetch(graphQLServer, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ query }),
  });
  if (!resp) return;
// eslint-disable-next-line consistent-return
  return resp.json();
}

// Queries

export const myFriends = async (excludeGroupId, fieldDescriptions) => {
  let excludeQuery = '';
  if (excludeGroupId) {
    excludeQuery = `, excludeGroupId: "${excludeGroupId}"`;
  }
  return call(`query {
    myFriends(accessToken: "${getAccessToken()}"${excludeQuery}) ${fieldDescriptions}
  }`);
};

export const myGroups = async (fieldDescriptions) => call(`query {
    myGroups(accessToken: "${getAccessToken()}") ${fieldDescriptions}
  }`);

export const getGroupById = async (id, fieldDescriptions) => call(`query {
    groupById(accessToken: "${getAccessToken()}", id: "${id}") ${fieldDescriptions}
  }`);

// Mutations

export const login = async (fieldDescriptions) => call(`mutation {
    login(accessToken: "${getAccessToken()}") ${fieldDescriptions}
  }`);

export const createGroup = async (name, fieldDescriptions) => call(`mutation {
    createGroup(accessToken: "${getAccessToken()}", name: "${name}") ${fieldDescriptions}
  }`);

export const updateGroup = async (id, name, addUserId, removeUserId, fieldDescriptions) => {
  const argsObj = { name, addUserId, removeUserId };
  const args = Object.keys(argsObj)
  // eslint-disable-next-line no-confusing-arrow
    .map((key) => argsObj[key] ? `, ${key}: "${argsObj[key]}"` : null)
    .filter(it => it);
  return call(`mutation {
    updateGroup(accessToken: "${getAccessToken()}", id: "${id}"${args.join('')}) ${fieldDescriptions}
  }`);
};

export const removeGroup = async (id, fieldDescriptions) => call(`mutation {
    removeGroup(accessToken: "${getAccessToken()}", id: "${id}") ${fieldDescriptions}
  }`);
