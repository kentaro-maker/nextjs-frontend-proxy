'use client'

import { useState, useTransition } from 'react'
import { register } from '../_action'
import { Button } from 'flowbite-react';
import { HiPlay, HiPause } from 'react-icons/hi2'
import { SubmitHandler } from 'react-hook-form';
import { type RegsiterSchemaType } from "@/lib/schema";
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/providers/auth';
import { useTimer } from 'react-timer-hook';
import DefaultAlert from '@/components/DefaultAlert';
import RegisterForm from '@/components/RegisterForm';

export default function Page() {

  const [message, setMessage] = useState<string>('')
  const { auth, setAuth } = useAuthContext()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10)
  const { totalSeconds, isRunning, start, pause, resume } = useTimer({ autoStart: false, expiryTimestamp: time, onExpire: () => router.replace('/') })

  const onSubmit: SubmitHandler<RegsiterSchemaType> = async (data) => {
    startTransition(async () => {
      const res =await register(data)
      if(res.user){
        setAuth({
          user: res.user,
          loggedin: true
        })
        start()
        return
      }
      setMessage(res.message)
    })
  }

  return (
    <>
    <div className="container mx-auto">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">アカウント登録</h1>
          { auth.loggedin ? (
            <div className="mt-2">
              <p className="mb-2 text-2xl">ようこそ<span className='font-bold'>{ auth.user?.name }</span>様</p>
              <p className="mb-2">{ totalSeconds }秒後にページ遷移します</p>
              <Button className="mx-auto" onClick={ isRunning ? pause() : resume() }>
                { isRunning ? '遷移ストップ': '遷移スタート' }
                { isRunning ? <HiPause className="ml-2 h-5 w-5" />: <HiPlay className="ml-2 h-5 w-5" /> }
              </Button>
            </div>
          ):(<>
            { message && <DefaultAlert message={message} onDismiss={()=> setMessage('')} /> }
            <RegisterForm onSubmit={onSubmit} isPending={isPending} />
          </>)}
        </div>
      </section>
    </div>
  </>
  )
}