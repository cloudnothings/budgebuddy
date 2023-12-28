/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QYc6yeh3aoP
 */
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardContent } from "@/components/ui/card"
import { createBudgetAction } from "../actions"


export default function CreateBudgetModal() {

  return (
    <main key="1">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Budget</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <form action={createBudgetAction} >
            <DialogHeader>
              <DialogTitle>New Budget</DialogTitle>
              <DialogDescription>
                Create a new budget here. Fill in the details and click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Budget Name</Label>
                <Input id="name" name="name" placeholder="Enter budget name" />
              </div>
            </CardContent>
            <DialogFooter>
              <Button type="submit">Save Budget</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
