import { ColumnDef } from "@tanstack/react-table";
import { ResourceWrapper } from "@/types/resource";
import { formatDistanceToNow } from "date-fns";
import { Timestamp } from "firebase/firestore";

// Type guard for Firestore Timestamp
function isTimestamp(value: any): value is Timestamp {
  return value && typeof value.toDate === "function";
}

export const columns: ColumnDef<ResourceWrapper>[] = [
  {
    header: "Resource Type",
    cell: ({ row }) => row.original.resource.metadata.resourceType,
  },
  {
    header: "Created",
    cell: ({ row }) => {
      const time = row.original.resource.metadata.createdTime;
      const date = isTimestamp(time) ? time.toDate() : new Date(time);
      return formatDistanceToNow(date, { addSuffix: true });
    },
  },
  {
    header: "Fetched",
    cell: ({ row }) => {
      const time = row.original.resource.metadata.fetchTime;
      const date = isTimestamp(time) ? time.toDate() : new Date(time);
      return formatDistanceToNow(date, { addSuffix: true });
    },
  },
];
