"use client";

import { useEffect, useState } from "react";
import { getResources } from "@/lib/resources";
import { ResourceWrapper } from "@/types/resource";
import { columns } from "../app/columns"; 
import { DataTable } from "@/app/data-table";
import FirestoreData from "@/components/FirestoreData";

export default function Page() {
  const [data, setData] = useState<ResourceWrapper[]>([]);

  useEffect(() => {
    getResources().then(setData);
  }, []);

  return (
    <FirestoreData>
      {(data) => <DataTable columns={columns} data={data} />}
    </FirestoreData>
  );
}
