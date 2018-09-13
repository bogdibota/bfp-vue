import apolloProvider from '../apollo'
import gql from 'graphql-tag'

export const userModule = {
    state: {
        accessToken: null,
        name: 'Your name here',
        avatar: null,
    },
    mutations: {
        LOGIN(state, accessToken) {
            state.accessToken = accessToken
        },
        CURRENT_USER_LOADED(state, user) {
            state.name = user.name
            state.avatar = user.avatar
        },
        LOGOUT(state) {
            state.accessToken = null
            state.name = 'Your name here'
            state.avatar = null
        }
    },
    actions: {
        async login(context, accessToken) {
            context.commit('LOGIN', accessToken)
            await context.dispatch('loadCurrentUser')
        },
        async loadCurrentUser(context) {
            const mutation = gql`
                mutation login($accessToken: String!) {
                     login(accessToken:$accessToken){
                          name
                          avatar
                    }
                }
                `

            const variables = {
                accessToken: context.state.accessToken
            }

            const response = await apolloProvider.defaultClient.mutate({
                mutation, variables
            })

            context.commit('CURRENT_USER_LOADED', response.data.login);
        },
        logout(context) {
            context.commit('LOGOUT')
        },
    }
}

