import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default async function AssignableMoneyDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        Assign
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Tabs defaultValue="auto">
          <TabsList className="w-72">
            <TabsTrigger value="auto" className="w-1/2">Auto</TabsTrigger>
            <TabsTrigger value="manually" className="w-1/2">Manually</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="manually">Change your password here.</TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}