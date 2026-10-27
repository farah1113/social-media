import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import "./App.css";

function App() {
    return (
    <>
      <AppRouter />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}

export default App;