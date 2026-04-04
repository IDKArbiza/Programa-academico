import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
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

import DirectorDashboard from "./pages/director/DirectorDashboard";
import GestionCuentas from "./pages/director/GestionCuentas";

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const currentRole = useAppStore((s) => s.currentRole);

  if (!currentRole) return <Navigate to="/" replace />;

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
        <Route path="/coordinador/cursos" element={<GestionCursos />} />

        {/* Administrador - hereda todo + gestión cuentas */}
        <Route path="/director" element={<DirectorDashboard />} />
        <Route path="/director/planillas" element={<PlanillaMensual />} />
        <Route path="/director/cursos" element={<GestionCursos />} />
        <Route path="/director/cuentas" element={<GestionCuentas />} />

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
