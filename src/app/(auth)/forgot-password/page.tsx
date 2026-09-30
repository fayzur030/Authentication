'use client'
import { requestPasswordReset } from '@/lib/auth-client'
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from '@heroui/react'
type ForgotPasswordType = {
  email: string
}

export default function ForgotPassword() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as ForgotPasswordType
    console.log(data, 'after submit')
    const restData = await requestPasswordReset({
      email: data.email,
      redirectTo: '/reset-password',
    })
    toast.success('An email sent to your email address please check')
    console.log(restData)
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <Form
        className='flex border p-6 shadow-2xl rounded-2xl w-96 flex-col gap-4'
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          name='email'
          type='email'
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return 'Please enter a valid email address'
            }
            return null
          }}
        >
          <Label>Email</Label>
          <Input placeholder='john@example.com' />
          <FieldError />
        </TextField>

        <div className='flex gap-2'>
          <Button type='submit'>
            {/* <Check /> */}
            Submit
          </Button>
          <Button type='reset' variant='secondary'>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  )
}
