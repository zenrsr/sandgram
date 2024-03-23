import AuthLayout from "./_auth/AuthLayout";
import Login from "./_auth/forms/Login";
import Register from "./_auth/forms/Register";
import { Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import "./globals.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
