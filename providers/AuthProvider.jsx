import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { authInitial, authReducer } from "../reducers/authReducer";
import * as SecureStore from 'expo-secure-store';
import { useReducer } from "reinspect"
import { createContext } from "react";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authState, authDispatch] = useReducer(
        authReducer, authInitial
    )

    const logIn = useCallback((email, password) => {

        (async function () {
            const avaliableStore = await SecureStore.isAvailableAsync();

            if (avaliableStore)

                authDispatch({
                    type: "LOAD_TOKEN"
                })

            try {
                const response = await axios.post(
                    "http://160.153.254.153/api/login",
                    {
                        "email": email,
                        "password": password
                    },
                    {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                )

                authDispatch({
                    type: "SET_TOKEN",
                    token: response.data.token.token,
                    isAdmin: response.data.user.is_admin
                })

                await SecureStore.setItemAsync(
                    "userToken",
                    JSON.stringify(response.data.token.token)
                )
                await SecureStore.setItemAsync(
                    "userIsAdmin",
                    JSON.stringify(response.data.user.is_admin)
                )

            } catch (error) {
                console.log(error);

                authDispatch({
                    type: "ERROR_TOKEN",
                    payload: error
                })
            }

        })()

    }, [])

    // const contextValue = useMemo(() => {
    //     return { authState, authDispatch };
    //   }, [authState, authDispatch]);

    return (
        <AuthContext.Provider value={{ authState, authDispatch, logIn }}>
            {children}
        </AuthContext.Provider>
    )
}