'use client'

import { HiOutlineArrowRight, HiShoppingCart } from 'react-icons/hi';
import { HiOutlineBars2 } from "react-icons/hi2";
import { Button, Card, Textarea, Label, TextInput } from 'flowbite-react';

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: '投稿一覧',
  description: '...',
}
 
type ItemType = {
  name: string,
  email: string,
  title: string,
  desc: string
}

const data = [
  {
    name: 'Neil Sims',
    email: 'email@windster.com',
    title: '$320',
    desc: 'dadaadaadadaaaa' ,
  },
  {
    name: 'Neil Sims',
    email: 'email@windster.com',
    title: '$320',
    desc: 'dadaadaadadaaaa' ,
  },
  {
    name: 'Neil Sims',
    email: 'email@windster.com',
    title: '$320',
    desc: 'dadaadaadadaaaa' ,
  },
]

export default function Page() {  
 
  return (
    <>
    <div className="container mx-auto">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">投稿一覧</h1>

          <div className="mt-6 mx-auto gap-5 flex flex-row items-start">
              {/* {[...Array(3)].map((_, i) => (
                <CardWithActionButton key={i} />
              ))} */}

              <CardWithList head='全員' data={data} />
              <CardWithList head='自分' data={[]} />

              <CardWithFormInputs />
          </div> 
        </div>
      </section>
    </div>
    </>
  )
}

function CardWithFormInputs() {
  return (
    <Card>
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="title"
              value="タイトル"
            />
          </div>
          <TextInput
            id="title"
            placeholder="何する"
            required
            type="text"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="description"
              value="具体的な内容"
            />
          </div>
          <Textarea
            id="description"
            placeholder="どんなことか教えて..."
            required
            rows={4}
          />
        </div>
        <Button type="submit">
          送信
        </Button>
      </form>
    </Card>
  )
}





function CardWithActionButton() {
  return (
    <Card className="max-w-md">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      <Button>
        <p>Read more</p>
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Card>
  )
}



function CardWithList({ head, data }: { head:string, data:Array<any> }) {
  const Item = ({name, email, title, desc }: ItemType) => {
    return (
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="shrink-0">
            <HiOutlineBars2 />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              { name }
            </p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
              { email }
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            { title }
          </div>
        </div>
      </li>
    )
  }

  const items = data.map((el, i) => <Item  key={i} {...el} />)

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          { head }
        </h5>
        <a
          className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          href="#"
        >
          <p>
            View all
          </p>
        </a>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
         { items }
        </ul>
      </div>
    </Card>
  )
}


