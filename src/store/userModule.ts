import {apolloProvider} from '../apollo/index'
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
        }
    }
}

