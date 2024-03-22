"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { accountCreationFormSchema } from "@/lib/forms"
import { createAccountAction } from "../actions"
import { useRouter } from "next/navigation"

export const AccountCreationDialog = ({ budgetId }: { budgetId: string }) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof accountCreationFormSchema>>({
    resolver: zodResolver(accountCreationFormSchema),
    defaultValues: {
      name: "",
      balance: 0,
      type: "CHECKING"
    }
  })
  async function onSubmit(values: z.infer<typeof accountCreationFormSchema>) {
    const account = await createAccountAction({ ...values, budgetId })
    router.push(`/budgets/${budgetId}/accounts/${account.id}`)
  }
  return (
    <Dialog onOpenChange={() => {
      if (form.formState.isSubmitting) {
        form.reset()
      }
    }} >
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create an account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create an account
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starting Balance</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={(e) => field.onChange(e.currentTarget.value ? parseFloat(e.currentTarget.value) : 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Budget Accounts</SelectLabel>
                        <SelectItem value="CHECKING">Checking</SelectItem>
                        <SelectItem value="SAVINGS">Savings</SelectItem>
                        <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                        <SelectItem value="CASH">Cash</SelectItem>
                        <SelectItem value="LINE_OF_CREDIT">Line of Credit</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Mortgages and Loans</SelectLabel>
                        <SelectItem value="MORTGAGE">Mortgage</SelectItem>
                        <SelectItem value='AUTO_LOAN'>Auto Loan</SelectItem>
                        <SelectItem value="STUDENT_LOAN">Student Loan</SelectItem>
                        <SelectItem value="MEDICAL_DEBT">Medical Debt</SelectItem>
                        <SelectItem value="OTHER_DEBT">Other Debt</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Tracking Accounts</SelectLabel>
                        <SelectItem value="OTHER_ASSET">Other Asset</SelectItem>
                        <SelectItem value="OTHER_LIABILITY">Other Liability</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )} />
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AccountCreationDialog