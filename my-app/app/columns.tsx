"use client"; 

import { formatDistanceToNow } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { ResourceWrapper } from "@/types/resource";

export const columns: ColumnDef<ResourceWrapper>[] = [
  {
    header: "Type",
    cell: ({ row }) => row.original.resource?.metadata?.resourceType ?? "—",
  },
  {
    header: "Created",
    cell: ({ row }) =>
      row.original.resource?.metadata?.createdTime
        ? formatDistanceToNow(new Date(row.original.resource.metadata.createdTime), { addSuffix: true })
        : "—",
  },
  {
    header: "Fetched",
    cell: ({ row }) =>
      row.original.resource?.metadata?.fetchTime
        ? formatDistanceToNow(new Date(row.original.resource.metadata.fetchTime), { addSuffix: true })
        : "—",
  },
];
