import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { gql } from '@apollo/client';
import { createApolloClient } from '@/lib/apolloClient';


const USERS_QUERY = gql`
  query{
    users{
      name
      email
    }
  }
`;

export async function GET(request: Request, response: Response) {
  try {
    const client = createApolloClient()
    
    const res = await client.query({
      query: USERS_QUERY,
      errorPolicy: 'all'
    })

    // console.log('[api/getAllUsers/route.ts] GET: await client.query: ', JSON.stringify(res, null, 2))
    console.log('[api/getAllUsers/route.ts] GET: await client.query: ', JSON.stringify(res))

    const users = res.data.users

    // return NextResponse.json({ users: cookeValue })
    return NextResponse.json({ users: users })
  } catch (error: unknown) {
    console.error('[api/getAllUsers/route.ts] GET: error.message: ', (error as Error).message)
    return new Response(JSON.stringify({ message: (error as Error).message }), { status: 500 })
  }
}