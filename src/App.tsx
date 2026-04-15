import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import { UserRole } from "@/lib/types";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./components/AppLayout";

// Pages
import AlumnoDashboard from "./pages/alumno/AlumnoDashboard";
import MisPlanillas from "./pages/alumno/MisPlanillas";

import DocenteDashboard from "./pages/docente/DocenteDashboard";
import PlanillaMensual from "./pages/docente/PlanillaMensual";

import CoordinadorDashboard from "./pages/coordinador/CoordinadorDashboard";
import GestionCursos from "./pages/coordinador/GestionCursos";
import RevisarPlanillas from "./pages/coordinador/RevisarPlanillas";

import AdminDashboard from "./pages/administrador/AdminDashboard";
import GestionCuentas from "./pages/administrador/GestionCuentas";

const queryClient = new QueryClient();

const roleHomePath: Record<UserRole, string> = {
  administrador: "/administrador",
  coordinador: "/coordinador",
  docente: "/docente",
  alumno: "/alumno",
};

const ProtectedRoutes = () => {
  const currentRole = useAppStore((s) => s.currentRole);
  const location = useLocation();

  if (!currentRole) return <Navigate to="/" replace />;

  const allowedPrefix = roleHomePath[currentRole];
  const isAuthorizedPath =
    location.pathname === allowedPrefix ||
    location.pathname.startsWith(`${allowedPrefix}/`);

  if (!isAuthorizedPath) {
    return <Navigate to={allowedPrefix} replace />;
  }

  return (
    <AppLayout>
      <Routes>
        {/* Alumno */}
        <Route path="/alumno" element={<AlumnoDashboard />} />
        <Route path="/alumno/planillas" element={<MisPlanillas />} />

        {/* Profesor */}
        <Route path="/docente" element={<DocenteDashboard />} />
        <Route path="/docente/planillas" element={<PlanillaMensual />} />

        {/* Coordinador - hereda planillas + gestión cursos */}
        <Route path="/coordinador" element={<CoordinadorDashboard />} />
        <Route path="/coordinador/planillas" element={<PlanillaMensual />} />
        <Route path="/coordinador/revisar" element={<RevisarPlanillas />} />
        <Route path="/coordinador/cursos" element={<GestionCursos />} />

        {/* Administrador - hereda todo + gestión cuentas */}
        <Route path="/administrador" element={<AdminDashboard />} />
        <Route path="/administrador/planillas" element={<PlanillaMensual />} />
        <Route path="/administrador/revisar" element={<RevisarPlanillas />} />
        <Route path="/administrador/cursos" element={<GestionCursos />} />
        <Route path="/administrador/cuentas" element={<GestionCuentas />} />

        {/* Redirección legado */}
        <Route path="/director/*" element={<Navigate to="/administrador" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
