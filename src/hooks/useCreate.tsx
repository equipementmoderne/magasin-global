import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";

import initialize from "../firebase/initialize";

const app = initialize();
const firestore = getFirestore(app);

export default function useCreate(resource: string) {
  const ref = collection(firestore, resource);
  const mutation = useFirestoreCollectionMutation(ref);
  return mutation;
}
