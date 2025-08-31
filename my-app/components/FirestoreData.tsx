"use client";

import { useEffect, useState, ReactNode } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../lib/firebase";

interface FirestoreItem extends DocumentData {
  id: string;
  [key: string]: any;
}

interface FirestoreDataProps {
  children: (data: FirestoreItem[]) => ReactNode;
}

export default function FirestoreData({ children }: FirestoreDataProps) {
  const [data, setData] = useState<FirestoreItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await getDocs(collection(db, "your-collection-name"));
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(docs);
      } catch (error) {
        console.error("Firestore fetch error:", error);
      }
    }
    fetchData();
  }, []);

  return <>{children(data)}</>;
}
