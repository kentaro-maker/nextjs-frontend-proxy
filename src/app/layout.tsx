import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavbarWithDropdown from '@/components/Navbar';
import AuthProvider, { User } from '@/providers/auth';
import { getServerActionSession } from '@/lib/session';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HOME',
  description: '...',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerActionSession()

  const user = session.user ? {
    name: session.user?.name,
    email: session.user?.email
  } as User : null
  
  console.log('[layout.tsx] getServerActionSession > session: ', JSON.stringify(session))

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider user={user}>
          <NavbarWithDropdown />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
