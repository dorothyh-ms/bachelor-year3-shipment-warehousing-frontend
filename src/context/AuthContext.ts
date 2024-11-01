import { createContext } from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean
    user: string | undefined
    login: () => void
    logout: () => void
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    user: undefined,
    login: () => {},
    logout: () => {},
})
