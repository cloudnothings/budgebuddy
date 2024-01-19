"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import { useState } from "react"
import BudgetSidebarNav from "./budget-sidebar-nav"

interface BudgetSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children: React.ReactNode
  params: { id: string }
}

const BudgetSidebar = ({ defaultLayout = [10, 400], defaultCollapsed = false, navCollapsedSize, children, params }: BudgetSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  return (
    <ResizablePanelGroup direction="horizontal" onLayout={(sizes: number[]) => { document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}` }}>
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={16}
        maxSize={30}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
        }}
        onExpand={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
        }}
        className={cn(isCollapsed && "ease-in-out transition-all")}
      >
        <BudgetSidebarNav params={params} isCollapsed={isCollapsed} />

      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default BudgetSidebar