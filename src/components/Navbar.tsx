'use client';

import { useAuthContext } from '@/providers/auth';
import {  Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarWithDropdown() {

  const pathname = usePathname()
  const { auth } = useAuthContext()

  return (
    <>
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand as={Link} href="/">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="/favicon.ico"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Next & Laravel
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          label={ auth.loggedin ? auth.user?.name : 'ゲスト' }
          size={'lg'}
          inline
        >
          <Dropdown.Header>
          { auth.loggedin ? (<>
            {/* ログイン時 */}
            <span className="block text-sm">
              { auth.user!.name }
            </span>
            <span className="block truncate text-sm font-medium">
              { auth.user!.email }
            </span>
          </>) : (<>
          {/* ログアウト時 */}
            <span className="block text-sm">
              ゲスト
            </span>
          </>) }
          </Dropdown.Header>
          
          { auth.loggedin ? (<>
          {/* ログイン時 */}
          {/* <Dropdown.Item as={Link} href="/account">
            アカウント
          </Dropdown.Item>
          <Dropdown.Item as={Link} href="/settings">
            設定
          </Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item as={Link} href="/logout">
            ログアウト
          </Dropdown.Item>
          </>) : (<>
          {/* ログアウト時 */}
          <Dropdown.Item as={Link} href="/register">
            アカウント登録
          </Dropdown.Item>
          <Dropdown.Item as={Link} href="/login">
            ログイン
          </Dropdown.Item>
          </>) }
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/" active={ pathname == '/' }>Home</Navbar.Link>

        { auth.loggedin ? (<>
          {/* ログイン時 */}
          <Navbar.Link as={Link} href="/posts" active={ pathname == '/posts' }>投稿一覧</Navbar.Link>
          <Navbar.Link as={Link} href="/accounts" active={ pathname == '/accounts' }>アカウント一覧</Navbar.Link>
        </>) : (<>
          {/* ログアウト時 */}
          <Navbar.Link as={Link} href="/register" active={ pathname == '/register' }>アカウント登録</Navbar.Link>
          <Navbar.Link as={Link} href="/login" active={ pathname == '/login' }>ログイン</Navbar.Link>
        </>)}
      </Navbar.Collapse>
    </Navbar>
    </>
  )
}
