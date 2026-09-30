
import React, { Suspense } from 'react'
import ResetPasswordForm from './Reset-Password-Form'


const ResetPasswordPage = () => {

  return (
    <div>
      <Suspense fallback={<p>Loading</p>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}

export default ResetPasswordPage
