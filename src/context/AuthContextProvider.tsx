import {ReactNode, useEffect, useState} from 'react'
import AuthContext from './AuthContext'
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from '../services/auth'
import {isExpired} from 'react-jwt'
import Keycloak from 'keycloak-js'

interface IWithChildren {
    children: ReactNode
}

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
}
const keycloak: Keycloak = new Keycloak(keycloakConfig)

export default function AuthContextProvider({children}: IWithChildren) {
    const [user, setLoggedInUser] = useState<string | undefined>(undefined)

    useEffect(() => {
        keycloak.init({onLoad: 'login-required'})
    }, [])

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.given_name)
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.given_name)
        })
    }

    function login() {
        keycloak.login()
    }

    function logout() {
        const logoutOptions = {redirectUri: import.meta.env.VITE_REACT_APP_URL}
        keycloak.logout(logoutOptions)
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token)
        else return false
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
