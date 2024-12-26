import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { Login } from "./pages/Login/Login";
import { Index } from "./pages/App/Index";
import { Home } from "./pages/Home/Home";
import { Curso } from "./pages/Curso/Curso";
import { Turma } from "./pages/Turma/Turma";
import { Usuarios } from "./pages/Usuarios/Usuarios";
import { Reservas } from "./pages/Reservas/Reservas";
import { Sala } from "./pages/Sala/Sala";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <ToastContainer stacked />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<Index />}>
            <Route path="/app/home" element={<Home />} />
            <Route path="/app/curso" element={<Curso />} />
            <Route path="/app/sala" element={<Sala />} />
            <Route path="/app/turma" element={<Turma />} />
            <Route path="/app/reserva" element={<Reservas />} />
            <Route path="/app/usuarios" element={<Usuarios />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
