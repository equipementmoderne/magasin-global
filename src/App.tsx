import "./App.css";
import useCreate from "./hooks/useCreate";
import useGetList from "./hooks/useGetList";

function App() {
  const query = useGetList("products");
  const mutation = useCreate("products");
  const onCreate = () => {
    mutation.mutate({});
  };
  return (
    <div>
      <h1>Magasin Global</h1>
      <div className="card">
        <button onClick={onCreate}>Create a product</button>
        <p>Product count is {query.data?.length || 0}</p>
      </div>
    </div>
  );
}

export default App;
