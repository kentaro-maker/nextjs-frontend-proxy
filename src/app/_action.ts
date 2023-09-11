'use server';

import { getServerActionSession, getSession } from '@/lib/session';
import { createApolloClient } from '@/lib/apolloClient';
import { LoginSchema, LoginSchemaType, RegisterSchema, RegsiterSchemaType } from "@/lib/schema";
import { User } from '@/providers/auth';
import { REGISTER_MUTATE, LOGIN_MUTATE, LOGOUT_MUTATE } from '@/graphql/mutate';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client';
import { NextRequest } from 'next/server';


export async function register(formData: RegsiterSchemaType): Promise<{ user: User | null , message: string }> {
  try {
    
    const session = await getServerActionSession()
    const client = createApolloClient()

    console.log('[_action.ts] register(...): formData: ',formData)

    const parsed = RegisterSchema.parse(formData)
    console.log('[_action.ts] register(...): parsed: ', parsed)
    
    const result = await client.mutate({
      mutation: REGISTER_MUTATE,
      variables: { 
        name: parsed.name,
        email: parsed.email,
        password: parsed.password,
        passwordConfirm: parsed.confirm,
      },
      errorPolicy: 'all'
    })

    const { me: user, token } =  await result.data.register
    console.log('[_action.ts] register(...): result.data: ', result.data)

    session.user = { name: user.name, email: user.email, token: token}
    await session.save()

    return { 
      user: {name: user.name, email: user.email},
      message: 'アカウント登録成功'
    }
  } catch (error) {
    console.log('[_action.ts] register(...): catch(e): ', (error as Error).message )
    return { 
      user: null,
      message: 'アカウント登録できません'
    }
  } 
}

export async function login(formData: LoginSchemaType): Promise<{ user: User | null , message: string }> {
  try {
    const session = await getServerActionSession()
    const client = createApolloClient()

    console.log('[_action.ts] login(...): formData: ',formData)
    // const parsed = LoginSchema.parse({
    //   email: formData.email,
    //   password: formData.password
    // })
    const parsed = LoginSchema.parse(formData)
    console.log('[_action.ts] login(...): parsed: ', parsed)
    
    const result = await client.mutate({
      mutation: LOGIN_MUTATE,
      variables: {email: parsed.email, password: parsed.password},
      errorPolicy: 'all'
    })

    // result.data があるば login　を得ることがでいｋるが
    // result.error があると login が undefined property で readできないとなる
    const { me: user, token } =  await result.data.login
    console.log('[_action.ts] login(...): result.data: ', result.data)

    session.user = { name: user.name, email: user.email, token: token}
    await session.save()

    return { 
      user: {name: user.name, email: user.email},
      message: 'ログイン成功'
    }
  } catch (error) {
    console.log('[_action.ts] login(...): catch(e): ', (error as Error).message )
    return { 
      user: null,
      message: 'ログインできません'
    }
  } 
}


export async function logout(request:NextRequest): Promise<{ message: string }> {
  try {
    const res = new Response
    const session = await getSession(request, res)
    const client = createApolloClient()
    const result = await client.mutate({
      context: {
        headers: {
            authorization: session.user?.token ? `Bearer ${session.user?.token}` : "",
          }
        },
        mutation: LOGOUT_MUTATE,
        errorPolicy: 'all'
    })

    const { message } =  await result.data.logout
    console.log('[_action.ts] logout(...): result.data: ', result.data)

    await session.destroy()

    return { 
      message: 'ログアウト成功'
    }
  } catch (error) {
    console.log('[_action.ts] logout(...): catch(e): ', (error as Error).message )
    return { 
      message: 'ログアウト失敗'
    }
  } 
}


// export async function post(formData: LoginSchemaType): Promise<{ user: User } | { message: string }> {
//   try {
//     const session = await getServerActionSession()
//     const client = createApolloClient()
    
//     console.log('[_action.ts] login(...): formData: ',formData)
//     const parsed = LoginSchema.parse({
//       email: formData.email,
//       password: formData.password
//     })
//     console.log('[_action.ts] login(...): parsed: ', parsed)
    
//     const result = await client.mutate({
//       mutation: LOGIN_MUTATE,
//       variables: {email: parsed.email, password: parsed.password},
//       errorPolicy: 'all'
//     })

//     const { me: user, token } =  await result.data.login
//     console.log('[_action.ts] login(...): result.data: ', result.data)

//     session.user = { name: user.name, email: user.email, token: token}
//     await session.save()


//     return { 
//       user: {name: user.name, email: user.email},
//     }
//   } catch (error) {
//     console.log('[_action.ts] login(...): catch(e): ', (error as Error).message )
//     return { message: (error as Error).message }
//   } 
// }