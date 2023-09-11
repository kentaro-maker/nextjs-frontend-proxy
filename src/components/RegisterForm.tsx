import { RegsiterSchemaType, RegisterSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput, Checkbox, Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiInformationCircle, HiEye, HiEyeOff } from 'react-icons/hi';

export default function RegisterForm({
  onSubmit,
  isPending
}:{
  onSubmit: SubmitHandler<RegsiterSchemaType>,
  isPending: boolean
}) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegsiterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const [ passwordVisible, setPasswordVisible ] = useState<boolean>(false)
  const [ confirmVisible, setConfirmVisible ] = useState<boolean>(false)

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex mx-auto max-w-md flex-col gap-4 text-left">
      <div>
        <div className="mb-2 block">
          <Label color={errors.name?.message && "failure"} htmlFor="name1" value="ニックネーム"/>
        </div>
        <TextInput
            {...register('name')} color={errors.name?.message && "failure"}
            id="name1" name="name" type="text" placeholder="john"
            helperText={errors.name?.message && <>{errors.name?.message}</>}
            autoComplete="off"
          />
      </div>
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
      <div>
        <div className="mb-2 block">
          <Label color={errors.password?.message && "failure"} htmlFor="password2" value="パスワード(確認)"/>
        </div>
        <TextInput
            {...register('confirm')} color={errors.confirm?.message && "failure"}
            id="confirm" name="confirm"
            type={ confirmVisible ? 'text' : 'password' }
            helperText={errors.confirm?.message && <>{errors.confirm?.message}</>}
            autoComplete="off"
            rightIcon={ confirmVisible ? HiEye : HiEyeOff }
          />
          <div className="mt-1 flex items-center gap-2">
            <Checkbox id="confirmVisible" name="confirmVisible" onChange={()=>setConfirmVisible(b => !b)} checked={confirmVisible} />
            <Label htmlFor="confirmVisible">
              パスワード(確認)を表示
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