"use client";

import { useEffect, useState } from "react";
import { getResources } from "@/lib/resources";
import { ResourceWrapper } from "@/types/resource";
import { columns } from "../app/columns"; 
import { DataTable } from "@/app/data-table";

export default function Page() {
  const [data, setData] = useState<ResourceWrapper[]>([]);

  useEffect(() => {
    getResources().then(setData);
  }, []);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
