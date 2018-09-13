import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'https://dvkiin.xyz/graphql',
    // uri: 'http://localhost:8000/graphql',
});

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default new VueApollo({
    defaultClient: apolloClient,
});

// Install the vue plugin
Vue.use(VueApollo);