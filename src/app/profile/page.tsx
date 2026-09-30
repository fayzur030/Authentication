'use client'

import { updateUser } from '@/lib/auth-client'
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react'
type UserUpdate = {
  name: string
}

export default function ProfilePage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData.entries()) as UserUpdate

    // alert('Form submitted successfully!')

    const changeUser = await updateUser({
      name: userData.name,
    })
    console.log(changeUser)
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Form
        className='w-full max-w-96 border rounded-2xl shadow-2xl p-6'
        onSubmit={onSubmit}
      >
        <Fieldset>
          <Fieldset.Legend>Profile Settings</Fieldset.Legend>
          <Description>Update your profile information.</Description>
          <FieldGroup>
            <TextField
              isRequired
              name='name'
              validate={(value) => {
                if (value.length < 3) {
                  return 'Name must be at least 3 characters'
                }

                return null
              }}
            >
              <Label>Name</Label>
              <Input placeholder='John Doe' />
              <FieldError />
            </TextField>
            {/* <TextField isRequired name='email' type='email'>
              <Label>Email</Label>
              <Input placeholder='john@example.com' />
              <FieldError />
            </TextField> */}
          </FieldGroup>
          <Fieldset.Actions>
            <Button type='submit'>Save changes</Button>
            <Button type='reset' variant='secondary'>
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  )
}
