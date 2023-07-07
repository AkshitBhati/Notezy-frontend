import AllRoutes from './routes/AllRoutes';
import { Navbar } from './components/Homepage/Navbar';
import { Toaster } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: "1.2rem",
            fontWeight: "bold",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          },
        }}
      />
      <Navbar />
      <AllRoutes />
      

    </div>
  );
}

export default App;
