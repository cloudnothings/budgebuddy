'use client'

import { signOut } from "next-auth/react"
import React from "react"

const SignOutButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ ...props }, ref) => {
  return (
    <div onClick={() => signOut({ callbackUrl: '/' })}
      ref={ref}
      {...props}
    />
  )
})

export default SignOutButton