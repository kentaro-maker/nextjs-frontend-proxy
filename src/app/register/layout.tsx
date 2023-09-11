import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'アカウント登録',
  description: '...',
}

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}