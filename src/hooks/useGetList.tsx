import { collection, getFirestore, query } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";

import initialize from "../firebase/initialize";
import select from "../utils/select";

const app = initialize();
const firestore = getFirestore(app);

export default function useGetList<T>(resource: string) {
  const ref = query(collection(firestore, resource));
  const result = useFirestoreQuery(
    [resource],
    ref,
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        return snapshot.docs.map(select<T>);
      },
    }
  );
  return result;
}
