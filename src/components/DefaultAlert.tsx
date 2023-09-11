import { Alert, Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react'
import { GoAlert } from "react-icons/go"

export default function DefaultAlert({
  message,
  onDismiss
}:{
  message: string,
  onDismiss: () => void
}) {
  return (
    <Alert color="failure" className='mb-2 mx-auto max-w-md' icon={ GoAlert } onDismiss={ onDismiss }>
      <p><span className="font-medium">{ message }</span></p>
    </Alert>
  )
}