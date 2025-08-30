// components/data-table.tsx
"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResourceWrapper } from "@/types/resource";

interface DataTableProps {
  columns: ColumnDef<ResourceWrapper, any>[];
  data: ResourceWrapper[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              // normal row
              <React.Fragment key={row.id}>
                <TableRow
                  onClick={row.getToggleExpandedHandler()}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>

                {/* expanded row */}
                {row.getIsExpanded() && (
                  <TableRow key={row.id + "-expanded"} className="bg-gray-100">
                    <TableCell colSpan={columns.length} className="p-4">
                      <div className="space-y-2">
                        <p><strong>Description:</strong> {row.original.resource.humanReadableStr}</p>
                        <p><strong>AI Summary:</strong> {row.original.resource.aiSummary}</p>
                        <p><strong>State:</strong> {row.original.resource.metadata.state}</p>
                        <p><strong>Key:</strong> {row.original.resource.metadata.identifier.key}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
