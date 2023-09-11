import { LoginSchemaType, LoginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput, Checkbox, Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from 'react-icons/hi'

export default function LoginForm({
  onSubmit,
  isPending
}:{
  onSubmit: SubmitHandler<LoginSchemaType>,
  isPending: boolean
}) {

  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const [ passwordVisible, setPasswordVisible ] = useState<boolean>(false)

  return (
    <form
      noValidate
      onSubmit={ handleSubmit( onSubmit ) }
      className="flex mx-auto max-w-md flex-col gap-4 text-left">
      <div>
        <div className="mb-2 block">
          <Label color={errors.email?.message && "failure"} htmlFor="email1" value="メールアドレス"/>
        </div>
        <TextInput
            {...register('email')} color={errors.email?.message && "failure"}
            id="email1" name="email" type="email" placeholder="name@domain.com"
            helperText={errors.email?.message && <>{errors.email?.message}</>}
            autoComplete="off"
          />
      </div>
      <div>
        <div className="mb-2 block">
          <Label color={errors.password?.message && "failure"} htmlFor="password1" value="パスワード"/>
        </div>
        <TextInput
            {...register('password')} color={errors.password?.message && "failure"}
            id="password1" name="password"
            type={ passwordVisible ? 'text' : 'password' }
            helperText={errors.password?.message && <>{errors.password?.message}</>}
            autoComplete="off"
            rightIcon={ passwordVisible ? HiEye : HiEyeOff }
          />
          <div className="mt-1 flex items-center gap-2">
            <Checkbox id="passwordVisible1" name="passwordVisible1" onChange={()=>setPasswordVisible(b => !b)} checked={passwordVisible} />
            <Label htmlFor="passwordVisible1">
              パスワードを表示
            </Label>
          </div>
      </div>

      <Button type="submit" disabled={ isPending }>
      { isPending ? (
        <>
          <p>送信中...</p>
          <Spinner className="ml-2" aria-label="Spinner button example" />
        </>
      ):(
        <p>送信</p>
      )}
    </Button>
    </form>
  )
}