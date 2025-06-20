import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { useAuthContext } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import ExpenseSummery from "./components/ExpenseSummery";

export default function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        <Route path="/signup" element={authUser ? <Home /> : <Signup />} />
        <Route path="/login" element={authUser ? <Home /> : <Login />} />
        <Route
          path="/summery"
          element={authUser ? <ExpenseSummery /> : <Login />}
        />
        {/*  */}
      </Routes>
    </>
  );
}
