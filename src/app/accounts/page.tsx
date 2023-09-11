import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { CheckboxTable, Loading } from '@/components/CheckBoxTable' 
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'アカウント一覧',
  description: '...',
}

const getAllUsers = async () => {

  const headersData = headers()
  const host = headersData.get('host')
  const protocol = headersData.get('x-forwarded-proto') ?? host!.startsWith('localhost') ? 'http' : 'https' 
  const apiBase = `${protocol}://${host}`

  const res = await fetch(`${apiBase}/api/getAllUsers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(data => data.json())

  console.log(res)

  return res;
}

export default async function Page() {
 const res = await getAllUsers()
 const { users } = res
 
  return (
    <>
    <div className="container mx-auto">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">アカウント一覧</h1>

          <div className="mt-6 mx-auto gap-5 flex flex-row items-start justify-center">
              {/* {[...Array(3)].map((_, i) => (
                <CardWithActionButton key={i} />
              ))} */}
            
            <Suspense fallback={<Loading />}>
              <CheckboxTable users={users} />
            </Suspense>
          </div> 
        </div>
      </section>
    </div>
    </>
  )
}