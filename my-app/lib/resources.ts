import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
    query,       
    orderBy,     
    limit
  } from "firebase/firestore";
import { db } from "./firebase";
import { ResourceWrapper } from "@/types/resource";

const COLLECTION = "resources";

export async function getResources(): Promise<ResourceWrapper[]> {
    const q = query(
        collection(db, COLLECTION),
        orderBy("resource.metadata.fetchTime", "desc"),
        limit(20)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ resource: doc.data() } as ResourceWrapper));
    }

export async function addResource(resource: ResourceWrapper) {
    await addDoc(collection(db, COLLECTION), {
      resource: {
        ...resource.resource,
        metadata: {
          ...resource.resource.metadata,
            createdTime: serverTimestamp(),
            fetchTime: serverTimestamp(),
        },
      },
    });
}
      