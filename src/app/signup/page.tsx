/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eSwanlAQQDb
 */
import { Button } from "@/components/ui/button"

export default function SignupForm() {
  return (
    <div className="max-w-sm mx-auto my-72">
      <h1 className="text-5xl font-bold mb-6 text-center">Sign up</h1>
      <div className="flex flex-col space-y-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="work-email">
          Personal Email
        </label>
        <input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="work-email"
          placeholder="Enter your email address..."
          type="email"
        />
        <Button variant={"destructive"}>Continue with email</Button>
        <hr className="border-t border-gray-300" />
        <Button variant={"outline"}>
          Continue with Google{"\n          "}
        </Button>
      </div>
      <p className="mt-6 text-xs text-center text-gray-600">
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
  )
}
