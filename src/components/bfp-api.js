import UserService from './user-service';

const graphQLServer = 'http://be.gfp.dvkiin.xyz:8080/graphql';

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

export const myFriends = async (fieldDescriptions) => call(`query {
    myFriends(accessToken: "${getAccessToken()}") ${fieldDescriptions}
  }`);

export const myGroups = async (fieldDescriptions) => call(`query {
    myGroups(accessToken: "${getAccessToken()}") ${fieldDescriptions}
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
