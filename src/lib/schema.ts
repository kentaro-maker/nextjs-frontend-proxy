import { TypeOf, string, object } from "zod";

export const LoginSchema = object({
  email: string().email({ message: "メールアドレスとして不適切な形式" }),
  password: string().min(8, { message: "8文字以上の長さが必要" }),
})

export type LoginSchemaType = TypeOf<typeof LoginSchema>;

export const RegisterSchema = object({
  name: string().min(4, { message: "4文字以上の長さが必要" }),
  email: string().email({ message: "メールアドレスとして不適切な形式" }),
  password: string().min(8, { message: "8文字以上の長さが必要" }),
  confirm: string().min(8, { message: "8文字以上の長さが必要" }),
}).refine((data) => data.password === data.confirm, {
  message: "パスワードが一致していません",
  path: ["confirm"], // path of error
})

export type RegsiterSchemaType = TypeOf<typeof RegisterSchema>;