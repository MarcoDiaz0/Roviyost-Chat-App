import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./Components/Layouts/NavBar";
import Home from "./Components/Pages/Home";
import Register from "./Components/Pages/Auth/Register";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Pages/Auth/Login";
import { useAuthStore } from "./Components/Store/Auth";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Account from "./Components/Pages/Auth/Account";
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="p-1 flex flex-col h-[100vh] overflow-hidden" >
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/account"
          element={authUser ? <Account /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
      </Routes>

      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
