'use client'
 
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

export type User = {
  name: string
  email: string
}

export type Auth = {
  user: User | null,
  loggedin: boolean
}

const AuthContext = createContext({} as {
  auth: Auth
  setAuth: Dispatch<SetStateAction<Auth>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  increment: (defaultValue?: number) => void
  decrement: (defaultValue?: number) => void
});

export default function AuthProvider({ user, children }: { user: User | null, children: React.ReactNode }) {

  const initialState = {
    user: user,
    loggedin: user ? true : false
  }

  const [auth, setAuth] = useState<Auth>(initialState)
  const [count, setCount] = useState<number>(0)

  const increment = (defaultValue = 1) => {
    setCount((prev) => prev++)
  }

  const decrement = (defaultValue = 1) => {
    setCount((prev) => prev--)
  }


  return(
    <AuthContext.Provider value={{ auth, setAuth, count, increment, decrement, setCount }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context)
  throw new Error(
    "useAuthContext has to be used within AuthtProvider"
  );
  return context
}
