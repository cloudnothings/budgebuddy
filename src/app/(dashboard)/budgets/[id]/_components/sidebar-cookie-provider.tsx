import { cookies } from "next/headers"
import BudgetSidebar from "./budget-sidebar"

export default function SidebarCookieProvider(props: { children: React.ReactNode, params: { id: string } }) {
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")
  const defaultLayout = layout ? JSON.parse(layout.value) as number[] : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) as boolean : undefined

  return (
    <BudgetSidebar {...props}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={5}
    >
      {props.children}
    </BudgetSidebar>
  )
}