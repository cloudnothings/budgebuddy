"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QYc6yeh3aoP
 */
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function CreateBudgetModal() {
  const [name, setName] = useState("");
  // const createBudget = api.budget.create.useMutation({
  //   onSuccess: (data) => {
  //     router.push('/dashboard/' + data);
  //     setName("");
  //   },
  // });
  return (
    <main key="1">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Budget</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={(e) => {
            e.preventDefault();
            // createBudget.mutate({ name })
          }}
          >
            <DialogHeader>
              <DialogTitle>New Budget</DialogTitle>
              <DialogDescription>
                Create a new budget here. Fill in the details and click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Budget Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.currentTarget.value)} placeholder="Enter budget name" />
              </div>
            </CardContent>
            <DialogFooter>
              <Button disabled={!name} type="submit">Save Budget</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
