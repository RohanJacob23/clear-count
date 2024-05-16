"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import AddTransactionModal from "../AddTransactionModal";
import { Category } from "@/types/type";
import { DataTablePagination } from "./DataTablePagination";
import { Separator } from "../ui/separator";
import FacetedFilter from "./FacetedFilter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  userId,
  categories,
}: DataTableProps<TData, TValue> & { userId: string; categories: Category[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // filter
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    // facet filter
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
        <Input
          placeholder="Search Transaction..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex space-x-4">
          {/* filter buttons */}
          <FacetedFilter
            title="Category"
            column={table.getColumn("category")}
            options={categories}
          />
          <FacetedFilter
            title="Type"
            column={table.getColumn("type")}
            options={[{ name: "income" }, { name: "expense" }]}
          />
        </div>

        <div className="flex grow sm:justify-end">
          <AddTransactionModal categories={categories} userId={userId} />
        </div>
      </div>

      <Card className="p-0 flex flex-1 rounded-lg">
        <CardContent className="p-6 flex-1 w-0">
          <Table className="w-full min-w-max">
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
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
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
          <Separator />
          <DataTablePagination table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
