import apolloProvider from '../apollo';
import gql from 'graphql-tag';

const initialState = {
    accessToken: null,
    name: 'Your name here',
    avatar: null,
};

const overrideProps = (to, from) => Object.keys(from).forEach(key => to[key] = from[key]);

export const userModule = {
    state: { ...initialState },
    mutations: {
        LOGIN_SUCCESS(state, accessToken) {
            state.accessToken = accessToken;
        },
        CURRENT_USER_LOADED(state, user) {
            state.name = user.name;
            state.avatar = user.avatar;
        },
        LOGOUT(state) {
            overrideProps(state, initialState);
        },
    },
    actions: {
        async login_success(context, accessToken) {
            context.commit('LOGIN_SUCCESS', accessToken);
            await context.dispatch('loadCurrentUser');
        },
        async loadCurrentUser(context) {
            const mutation = gql`
                mutation login($accessToken: String!) {
                     login(accessToken:$accessToken){
                          name
                          avatar
                    }
                }
                `;

            const variables = {
                accessToken: context.state.accessToken,
            };

            const response = await apolloProvider.defaultClient.mutate({
                mutation, variables,
            });

            context.commit('CURRENT_USER_LOADED', response.data.login);
        },
        logout(context) {
            context.commit('LOGOUT');
        },
    },
};

