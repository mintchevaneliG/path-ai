"use client";

import { useEffect, useState, ReactNode } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust path if needed

interface FirestoreItem extends DocumentData {
  id: string;
  [key: string]: any;
}

interface Props {
  children: (data: FirestoreItem[]) => ReactNode;
}

export default function FirestoreData({ children }: Props) {
  const [data, setData] = useState<FirestoreItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // 🔹 Firestore fetch with debug logging
        const snapshot = await getDocs(collection(db, "your-collection-name"));
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Firestore documents:", docs); // check console
        setData(docs);
      } catch (e) {
        console.error("Error fetching Firestore data:", e);
      }
    }

    fetchData();
  }, []);

  return <>{children(data)}</>;
}
