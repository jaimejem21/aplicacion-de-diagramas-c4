import { types } from '../type/types';

// id: null,
// name: null,
// email: null,
// isAuthenticated: false

export const authReducer = (state, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            }

        case types.authLogout:
            return {
                id: null,
                name: null,
                email: null,
                isAuthenticated: false
            }

        default:
            return state;
    }

}
