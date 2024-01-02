/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LEA3jrdcMji
 */
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

import { auth } from "@/auth"
import { ThemeToggle } from "@/components/theme-switcher"
import { SignIn, SignOut } from "@/components/auth-components"
import { Button } from "@/components/ui/button"


function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ")
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`
  }
  return name[0]
}

const ProductFeature = () => (
  <div className="mr-6 flex items-center space-x-2">
    <Link className="text-3xl font-bold" href={'/'}>
      Budge Buddy
    </Link>
  </div>
)

const Links = () => (
  <nav className='flex items-center gap-6 text-sm'>
    <Link href={'/'}>Home</Link>
    <Link href={'/budget'}>Budgets</Link>
  </nav>
)

export default async function LandingNavbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <ProductFeature />
          <Links />
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <AccountNav />
        </div>
      </div>
    </div>
  )
}

export async function AccountNav() {
  const session = await auth()
  return (
    <nav className="flex items-center gap-4">
      <ThemeToggle />
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9">
              <AvatarImage alt="User avatar" src={session.user.image!} />
              <AvatarFallback>{getInitials(session.user.name!)}</AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-4">
          <SignIn />
          <Link href={'/signup'}>
            <Button>Start for free</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}