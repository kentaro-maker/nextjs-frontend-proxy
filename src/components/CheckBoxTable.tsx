'use client';
import { HiOutlineArrowRight, HiShoppingCart } from 'react-icons/hi';
import { HiOutlineBars2 } from "react-icons/hi2";
import { Button, Card, Textarea, Label, TextInput } from 'flowbite-react';
import { Checkbox, Table } from 'flowbite-react';
import { Key } from 'react';

export function CheckboxTable({users}:any) {

  const Row = ({name, email}: {name:string, email:string }) => {
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="p-4">
            <Checkbox />
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {name}
          </Table.Cell>
          <Table.Cell>
            {email}
          </Table.Cell>
          <Table.Cell>
            不明
          </Table.Cell>
          <Table.Cell>
            不明
          </Table.Cell>
          <Table.Cell>
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              // href="/tables"
            >
              <p>
                Edit
              </p>
            </a>
          </Table.Cell>
        </Table.Row>
    )
  }
  const rows = users.map((user: { name: string; email: string; }, index: Key | null | undefined) => <Row key={index} name={user.name} email={user.email} />)

  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell className="p-4">
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>
          名前
        </Table.HeadCell>
        <Table.HeadCell>
          アドレス
        </Table.HeadCell>
        <Table.HeadCell>
          性別
        </Table.HeadCell>
        <Table.HeadCell>
          年齢
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            Edit
          </span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        { rows }
      </Table.Body>
    </Table>
  )
}


export function Loading() {
  return (
    <>
    <Table hoverable className="animate-pulse">
      <Table.Head>
        <Table.HeadCell className="p-4">
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>
          名前
        </Table.HeadCell>
        <Table.HeadCell>
          アドレス
        </Table.HeadCell>
        <Table.HeadCell>
          性別
        </Table.HeadCell>
        <Table.HeadCell>
          年齢
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            Edit
          </span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="p-4">
            <Checkbox />
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          </Table.Cell>
          <Table.Cell>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </Table.Cell>
          <Table.Cell>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </Table.Cell>
          <Table.Cell>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </Table.Cell>
          <Table.Cell>
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              // href="/tables"
            >
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            </a>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
      <span className="sr-only">Loading...</span>
  </>
  )
}

