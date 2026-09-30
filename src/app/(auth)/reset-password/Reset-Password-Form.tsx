'use client'
import { resetPassword } from '@/lib/auth-client'
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from '@heroui/react'
import { useSearchParams } from 'next/navigation'

type ResetPasswordType = {
  newPassword: string
}

const ResetPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  if (!token) {
    return
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData.entries()) as ResetPasswordType

    const resetData = await resetPassword({
      newPassword: userData.newPassword,
      token: token,
    })
    console.log(resetData, 'after reset submit')
    toast.success('Reset password successfully')
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <Form
        className='flex border p-6 shadow-2xl rounded-2xl w-96 flex-col gap-4'
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          minLength={8}
          name='newPassword'
          type='password'
          validate={(value) => {
            if (value.length < 8) {
              return 'Password must be at least 8 characters'
            }
            if (!/[A-Z]/.test(value)) {
              return 'Password must contain at least one uppercase letter'
            }
            if (!/[0-9]/.test(value)) {
              return 'Password must contain at least one number'
            }
            return null
          }}
        >
          <Label>Password</Label> <Input placeholder='Enter your password' />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name='confirm-password'
          type='password'
          validate={(value) => {
            if (value.length < 8) {
              return 'Password must be at least 8 characters'
            }
            if (!/[A-Z]/.test(value)) {
              return 'Password must contain at least one uppercase letter'
            }
            if (!/[0-9]/.test(value)) {
              return 'Password must contain at least one number'
            }
            return null
          }}
        >
          <Label>Confirm password</Label>{' '}
          <Input placeholder='Enter your password' />
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

export default ResetPasswordForm
