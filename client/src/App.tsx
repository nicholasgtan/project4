import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Layout from "./layouts/Layout";
import AuthAPI from "./utils/AuthAPI";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";

function App() {
  interface SessionData {
    cookie?: unknown;
    authenticated: boolean;
    currentUserId: string;
    currentUserName: string;
    role: string;
    msg: string;
  }

  const [session, setSession] = useState<SessionData>({
    authenticated: false,
    currentUserId: "",
    currentUserName: "",
    role: "",
    msg: "",
  });

  console.log(session);

  return (
    <AuthAPI.Provider value={{ session, setSession }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/client" element={<ClientDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthAPI.Provider>
  );
}

export default App;
