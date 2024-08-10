import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";


function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container ">
        <span className="loading loading-spinner loading-xs  self-center"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppRouter />
    </div>
  );
}

export default App;
