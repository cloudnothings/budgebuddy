/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LEA3jrdcMji
 */
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { DotIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-switcher"
import { auth } from "@/auth"
import { SignIn, SignOut } from "./auth-components"

function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ")
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`
  }
  return name[0]
}

export default async function Navbar() {
  const session = await auth()
  return (
    <>
      <header className="flex justify-between p-4 border-b shadow-sm">
        <div className="flex items-center">
          <DotIcon className="w-6 h-6 mr-2" />
          <Link className="text-2xl font-bold" href={session ? '/dashboard' : '/'}>
            Budge Buddy
          </Link>
        </div>
        <AccountNav />
      </header>
    </>
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
          <DropdownMenuContent>
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