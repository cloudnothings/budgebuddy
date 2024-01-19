"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, RowSelectionState, SortingState, VisibilityState, flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { clsx } from "clsx"
import React from "react"
import { IndeterminateCheckbox } from "../../_components/indeterminate-checkbox"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalculatorIcon } from "lucide-react"

export type TransactionItem = {
  id: string
  name: string
  amount: number
  available: number
  assigned: number
  subCategories: TransactionItem[]
  MonthlySubcategoryBudget: {
    id: string
    assigned: number
  }[]
}

const TransactionView = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const columns: ColumnDef<TransactionItem>[] = [
    {
      accessorKey: 'name',
      header: ({ table }) => (
        <div className="flex gap-1 items-center">
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />{' '}
          <button
            {...{
              onClick: table.getToggleAllRowsExpandedHandler(),
            }}
          >
            {table.getIsAllRowsExpanded() ? '👇' : '👉'}
          </button>
          <span>Category</span>
        </div>
      ),
      cell: ({ row, getValue, }) => {
        const [value, setValue] = React.useState<string>(getValue() as string)
        const handleSubmit = async () => {
          if (value === getValue()) {
            return;
          }
        }
        const cancelHandler = () => {
          setValue(getValue() as string)
        }
        return (
          <TableCell className="flex flex-row w-auto items-center gap-1 overflow-hidden h-11 justify-start">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />{' '}
            {row.getCanExpand()
              ? <button {...{ onClick: row.getToggleExpandedHandler(), style: { cursor: 'pointer' } }}>
                {row.getIsExpanded() ? '👇' : '👉'}
              </button>
              : (
                <span className="w-5"></span>
              )}{' '}
            <Dialog onOpenChange={cancelHandler}>
              <DialogTrigger>
                <div className={clsx(row.getIsSelected() && "hover:underline hover:cursor-pointer")} >{getValue() as string}</div>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-4 p-2 w-80">
                <Input onKeyDownCapture={(e) =>
                  e.key === "Enter" && getValue() !== value && handleSubmit()
                } defaultValue={getValue() as string} value={value} onChange={(e) => setValue(e.target.value)} />
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2">
                    <Button variant={"destructive"}>Delete</Button>
                  </div>
                  <div className="flex gap-2">
                    <DialogClose>
                      <Button onClick={cancelHandler}>Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                      <Button onClick={handleSubmit}>OK</Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TableCell>
        )
      },
    },
    {
      accessorKey: "assigned",
      header: () => <div className="text-right min-w-16">Assigned</div>,
      cell: ({ row }) => {
        const [monthlyBudgetId, setMonthlyBudgetId] = React.useState<string | null>(row.original.MonthlySubcategoryBudget?.length > 0 ? row.original.MonthlySubcategoryBudget[0].id : null);
        const [hovered, setHovered] = React.useState<boolean>(false)
        const [editMode, setEditMode] = React.useState<boolean>(row.getIsSelected);
        const [input, setInput] = React.useState<string>(row?.original?.MonthlySubcategoryBudget?.length > 0
          ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.original.MonthlySubcategoryBudget[0].assigned)
          : "0.00");

        const [value, setValue] = React.useState<number>(row?.original?.MonthlySubcategoryBudget?.length > 0
          ? row.original.MonthlySubcategoryBudget[0].assigned
          : 0)

        const inputRef = React.useRef<HTMLInputElement>(null);

        React.useEffect(() => {
          if (editMode) {
            inputRef.current?.focus();
            inputRef.current?.select();
          }
        }, [editMode]);

        const isMainRow = row.getCanExpand()
        const rowId = row.original.id;
        const formattedValue = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value)
        const handleBlur = async () => {
          await handleSubmit();
        };

        const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            await handleSubmit();
          }
        }

        const handleInput = (e: { target: { value: string } }) => {
          setInput(e.target.value);
        }

        const handleSubmit = async () => {
          const cleanedInput = parseFloat(input.replace(/[^0-9.-]+/g, ""));
          if (value === cleanedInput) {
            return;
          }
          setValue(cleanedInput);

        }
        return (
          <TableCell
            className="w-[15%] items-center overflow-hidden"
            onClick={() => setEditMode(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {isMainRow
              ? (<div className="h-6 flex  items-center text-right justify-end">
                <div>
                  {
                    row.original.subCategories.length > 0 && new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(row.original.subCategories?.reduce((acc, subCategory) => {
                      if (subCategory.MonthlySubcategoryBudget.length > 0) {
                        return acc + subCategory.MonthlySubcategoryBudget[0].assigned
                      }
                      return acc
                    }, 0))
                  }
                </div>
              </div>
              ) : (
                <div className={clsx(hovered || editMode ? 'border-foreground' : "border-transparent",
                  "h-6 flex items-center text-right justify-between border rounded-sm overflow-hidden")}>
                  <button type="button" className={clsx(hovered || editMode ? "block" : "hidden")}>
                    <CalculatorIcon size={16} />
                  </button>
                  <div className="flex items-center flex-auto w-full justify-end -mr-4.5">
                    <input
                      ref={inputRef}
                      className={clsx(
                        editMode
                          ? "block"
                          : "hidden", "w-full outline-none bg-background text-right"
                      )}
                      type="text"
                      value={input}
                      onChange={handleInput}
                      onKeyDownCapture={handleEnter}
                      onBlur={handleBlur}
                    />
                    {!editMode ? <button className={clsx(editMode ? "hidden" : "block", "w-full flex justify-end")}>
                      {formattedValue}
                    </button> : null}
                  </div>
                </div>
              )
            }
          </TableCell >
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount") ?? 0)

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <TableCell className="text-right font-medium w-[15%]">{formatted}</TableCell>
      },
    },
    {
      accessorKey: "available",
      header: () => <div className="text-right">Available</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("available") ?? 0)

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <TableCell className="text-right font-medium w-[15%]">{formatted}</TableCell>
      },
    }
  ]
  const table = useReactTable({
    data: [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row) => row.subCategories ?? [],
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
      <Table>
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
              const isRoot = row.original.subCategories && row.original.subCategories.length > 0 ? true : false
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