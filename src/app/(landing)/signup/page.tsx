/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eSwanlAQQDb
 */
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function SignupForm() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="max-w-sm mx-auto my-72">
        <h1 className="text-5xl font-bold mb-6 text-center">Sign up</h1>
        <div className="flex flex-col space-y-4">
          <label className="block text-sm font-medium " htmlFor="work-email">
            Personal Email
          </label>
          <Input id="work-email" placeholder="Enter your email address..." type="email" />
          <Button>Continue with email</Button>
          <Separator></Separator>
          <Button variant={"outline"}>
            Continue with Google{"\n          "}
          </Button>
        </div>
        <p className="mt-6 text-xs text-center">
          By clicking "Continue with Google/Email" above, you acknowledge that you have read and understood,
          and agree to Budge Buddy's {"\n      "}
          <a className="text-blue-600 underline" href="#">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a className="text-blue-600 underline" href="#">
            Privacy Policy
          </a>
          .{"\n      "}
        </p>
      </div>
    </div>
  )
}
