"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, RowSelectionState, SortingState, VisibilityState, flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { clsx } from "clsx"
import React, { useMemo } from "react"
import { IndeterminateCheckbox } from "../../_components/indeterminate-checkbox"
import { Category, FinancialAccount, Payee, SubTransaction, Transaction } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { getTransactionsForAccountsAction } from "../actions"

export interface TransactionItem extends Transaction {
  category: Category | null
  subTransactions: (SubTransaction & { category: Category | null, transaction: Transaction | null })[]
  payee: Payee | null
  financialAccount: FinancialAccount | null
}

const TransactionView = ({ accounts }: { accounts: FinancialAccount[] }) => {
  const accountIds = useMemo(() => accounts.map(account => account.id), [accounts])
  const query = useQuery(['accounts', accountIds], {
    queryFn: async () => {
      return await getTransactionsForAccountsAction(accountIds)
    },
    initialData: [],
    refetchOnWindowFocus: false,
  })

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const columns: ColumnDef<TransactionItem>[] = [
    {
      accessorKey: 'id',
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row, }) => {
        return (
          <TableCell>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </TableCell>
        )
      },
    },
    {
      accessorKey: "financialAccount",
      header: () => <div>Account</div>,
      cell: ({ row }) => {
        return (
          <TableCell>
            {row.original.financialAccount?.name}
          </TableCell>
        );
      },
    },
    {
      accessorKey: "date",
      header: () => <div>Date</div>,
      cell: ({ row }) => {
        return (
          <TableCell >
            {row.original.date.toLocaleDateString()}
          </TableCell>
        );
      },
    },
    {
      accessorKey: "payee",
      header: () => <div>Payee</div>,
      cell: ({ row }) => {
        return (
          <TableCell>
            {row.original.payee?.name}
          </TableCell>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <div>Category</div>,
      cell: ({ row }) => {
        return (
          <TableCell>
            {row.original.category?.name}
          </TableCell>
        );
      },
    },
    {
      accessorKey: "memo",
      header: () => <div>Memo</div>,
      cell: ({ row }) => {
        return (
          <TableCell>
            {row.original.memo}
          </TableCell>
        );
      },
    },
    {
      accessorKey: "outflow",
      header: () => <div>Outflow</div>,
      cell: ({ row }) => {
        const amount = row.original.amount

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <TableCell>
          {amount < 0 ? formatted : null}
        </TableCell>
      },
    },
    {
      accessorKey: "inflow",
      header: () => <div className="">Inflow</div>,
      cell: ({ row }) => {
        const amount = row.original.amount

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <TableCell >{amount >= 0 ? formatted : null}</TableCell>
      },
    }
  ]
  const table = useReactTable({
    data: query.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <div className="w-full">
      <Table >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const isRoot = row.original.subTransactions && row.original.subTransactions.length > 0 ? true : false
              return <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={clsx(isRoot
                  ? "bg-foreground/10"
                  : '', 'h-11')}
                onClick={() => {
                  if (!isRoot) {
                    if (row.getIsSelected()) {
                      return;
                    }
                    setRowSelection({})
                    row.toggleSelected(true)
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <React.Fragment key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </React.Fragment>
                ))}
              </TableRow>
            })) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TransactionView