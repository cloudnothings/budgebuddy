/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Category, Transaction } from "@prisma/client"
import { getBudgetDataAction, updateCategoryNameAction, updateMonthlySubcategoryBudgetAssignedAmountAction } from "../actions"
import { CalculatorIcon } from "lucide-react"
import clsx from "clsx"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export type BudgetItem = {
  budgetId: string
  id: string
  parentCategoryId: string | null
  MonthlySubcategoryBudget: {
    id: string,
    assigned: number,
    subcategoryId: string
    month: Date
  }[],
  name: string
  assigned: number
  available: number
  activity: number
  subCategories: Category & {
    transactions: Transaction[],
    MonthlySubcategoryBudget: { id: number, assigned: number, subcategoryId: string, month: Date }[]
  }[]
}


export default function BudgetCategoriesView({ month, data, budgetId }: { budgetId: string, month: Date, data: any[] }) {
  const query = useQuery(['budget', month], {
    queryFn: async () => {
      return await getBudgetDataAction(budgetId, month)
    },
    initialData: data,
    refetchOnWindowFocus: false,
    staleTime: 10000
  })

  const assignedValueMutator = useMutation({
    mutationFn: async (values: { subcategoryId: string, assigned: number, monthlyBudgetId: string | null }) => {
      return await updateMonthlySubcategoryBudgetAssignedAmountAction(month, values.subcategoryId, values.assigned, values.monthlyBudgetId)
    },
  })

  const categoryTitleMutator = useMutation({
    mutationFn: async (values: { categoryId: string, name: string }) => {
      return await updateCategoryNameAction(values.categoryId, values.name)
    },
  })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [expanded, setExpanded] = React.useState(() => {
    return data.reduce((acc, row, index) => {
      acc[index] = true;
      return acc;
    }, {});
  });

  const [cellBeingEdited, setEditingCell] = React.useState<string | null>(null);

  const columns: ColumnDef<BudgetItem>[] = [
    {
      accessorKey: 'name',
      header: ({ table }) => (
        <>
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
          </button>{' '}
          Category
        </>
      ),
      cell: ({ row, getValue, }) => {
        const [value, setValue] = React.useState<string>(getValue() as string)
        const handleSubmit = async () => {
          if (value === getValue()) {
            return;
          }
          await categoryTitleMutator.mutateAsync({ categoryId: row.original.id, name: value }, {
            onSuccess: () => {
              void query.refetch()
            }
          });
        }
        const cancelHandler = () => {
          setValue(getValue() as string)
        }
        return (
          <TableCell className="flex flex-row w-auto items-center overflow-hidden justify-start">
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
                '🔵'
              )}{' '}
            <Dialog onOpenChange={cancelHandler}>
              <DialogTrigger>
                <div className="hover:underline hover:cursor-pointer">{getValue() as string}</div>
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
      footer: props => props.column.id,
    },
    {
      accessorKey: "assigned",
      header: () => <div className="text-right min-w-16">Assigned</div>,
      cell: ({ row, cell }) => {
        const [monthlyBudgetId, setMonthlyBudgetId] = React.useState<string | null>(row.original.MonthlySubcategoryBudget?.length > 0 ? row.original.MonthlySubcategoryBudget[0].id : null);
        const [hovered, setHovered] = React.useState<boolean>(false)
        const [editMode, setEditMode] = React.useState<boolean>(cellBeingEdited === cell.id);
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
        const formattedValue = React.useMemo(() => {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(value)
        }, [value])
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
          await assignedValueMutator.mutateAsync({ subcategoryId: rowId, assigned: cleanedInput, monthlyBudgetId }, {
            onSuccess: (e) => {
              setMonthlyBudgetId(e.id)
              void query.refetch()
              setEditMode(false);
            }
          });
        }
        return (
          <TableCell className="w-[15%] items-center overflow-hidden" onClick={() => setEditMode(true)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {isMainRow
              ? (<div className="h-6 flex items-center text-right justify-between">
                <div></div>
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

              </div>)
              : (
                <div className={clsx(hovered || editMode ? 'border-foreground' : "border-transparent",
                  "h-6 flex items-center text-right justify-between border rounded-sm overflow-hidden")}>
                  <button type="button" className={clsx(hovered || editMode ? "block" : "hidden")}>
                    <CalculatorIcon size={16} />
                  </button>
                  <div className="flex items-center flex-auto w-full justify-end -mr-4.5">
                    <input ref={inputRef} className={clsx(editMode ? "block" : "hidden", "w-full outline-none bg-background text-right")}
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
    data: query.data ?? [],
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
    onExpandedChange: setExpanded,
    state: {
      sorting,
      expanded,
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
                onClick={(e) => {
                  if (!isRoot) {
                    row.getToggleSelectedHandler()
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
function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}


