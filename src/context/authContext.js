import { createContext, useReducer } from 'react';
import { apiDiagrama } from '../api/apiDiagrama';
import { authReducer } from '../reducer/authReducer';
import { types } from '../type/types';

export const authContext = createContext(null);

const authInitialState = {
    id: null,
    name: null,
    email: null,
    isAuthenticated: false
}

export const AuthContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState);

    const login = async (email, password, callback) => {

        const res = await apiDiagrama("/user/login", "POST", { email, password });

        if (res.errors || !res.ok) {
            callback(true);
            return;
        }

        callback(false);

        const { data } = res;

        localStorage.setItem("keyID", btoa(JSON.stringify({ id: data._id })));

        dispatch({
            type: types.authLogin,
            payload: { id: data._id, name: data.name, email: data.email }
        });

    }

    const logout = () => {

        localStorage.removeItem("keyID");

        dispatch({
            type: types.authLogout
        });
    }

    const createUser = async (name, email, password, callback) => {

        const res = await apiDiagrama("/user/create", "POST", { name, email, password });

        if (res.errors || !res.ok) {
            callback(true);
        }
        callback(false);

        const { data } = res;

        localStorage.setItem("keyID", btoa(JSON.stringify({ id: data._id })));

        dispatch({
            type: types.authLogin,
            payload: { id: data._id, name: data.name, email: data.email }
        });
    }

    return (
        <authContext.Provider value={{
            auth: authState,
            login,
            logout,
            createUser,
            dispatch
        }}>
            {children}
        </authContext.Provider>
    )
}
