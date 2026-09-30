'use client'
import { signIn } from '@/lib/auth-client'
// import { Check } from '@gravity-ui/icons'
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react'
import Link from 'next/link'
// import { redirect } from 'next/navigation'
type SignInFormData = {
  email: string
  password: string
  callbackURL: string
}

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as SignInFormData
    console.log('data from:', data)
    const { data: restData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: '/',
    })

    console.log('after submit', restData, error)
    // redirect('/')
  }
  return (
    <div>
      <div className='flex items-center justify-center h-screen '>
        <Form
          className='flex border p-6 shadow-2xl rounded-2xl w-96 flex-col gap-4'
          onSubmit={onSubmit}
        >
          <h2 className='font-semibold text-xl text-gray-700'>
            Please Sign in
          </h2>
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
          <TextField
            isRequired
            minLength={8}
            name='password'
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
            <div className='flex items-center justify-between'>
              <Label>Password</Label>{' '}
              <Link
                href={'/forgot-password'}
                className='text-xs font-medium text-black'
              >
                {' '}
                Forgot your password?
              </Link>
            </div>
            <Input placeholder='Enter your password' />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
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
    </div>
  )
}

export default SignInPage
