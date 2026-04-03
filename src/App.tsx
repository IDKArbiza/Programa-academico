import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./components/AppLayout";

// Director (Administrador)
import DirectorDashboard from "./pages/director/DirectorDashboard";
import Matricula from "./pages/director/Matricula";
import AcademicYear from "./pages/director/AcademicYear";
import DocentesMaterias from "./pages/director/DocentesMaterias";
import CriteriosEvaluacion from "./pages/director/CriteriosEvaluacion";
import ReporteNotas from "./pages/director/ReporteNotas";
import Libretas from "./pages/director/Libretas";
import Pagos from "./pages/director/Pagos";
import DirectorPlanillas from "./pages/director/DirectorPlanillas";

// Coordinador
import CoordinadorDashboard from "./pages/coordinador/CoordinadorDashboard";
import GestionMaterias from "./pages/coordinador/GestionMaterias";
import GestionTareas from "./pages/coordinador/GestionTareas";
import CoordinadorPlanillas from "./pages/coordinador/CoordinadorPlanillas";
import CoordinadorCalificaciones from "./pages/coordinador/CoordinadorCalificaciones";
import CoordinadorInformes from "./pages/coordinador/CoordinadorInformes";

// Docente (Profesor)
import DocenteDashboard from "./pages/docente/DocenteDashboard";
import PlanillaMensual from "./pages/docente/PlanillaMensual";
import GestionNotas from "./pages/docente/GestionNotas";
import GestionAsistencia from "./pages/docente/GestionAsistencia";
import DocenteTareas from "./pages/docente/DocenteTareas";
import DocenteCriterios from "./pages/docente/DocenteCriterios";
import DocenteLibretas from "./pages/docente/DocenteLibretas";
import Reportes from "./pages/docente/Reportes";

// Alumno
import AlumnoDashboard from "./pages/alumno/AlumnoDashboard";
import MisNotas from "./pages/alumno/MisNotas";
import Horario from "./pages/alumno/Horario";
import CursosDocentes from "./pages/alumno/CursosDocentes";
import EstadoDeudas from "./pages/alumno/EstadoDeudas";
import AlumnoLibreta from "./pages/alumno/AlumnoLibreta";
import BoletaNotas from "./pages/alumno/BoletaNotas";
import MisPlanillas from "./pages/alumno/MisPlanillas";

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const currentRole = useAppStore((s) => s.currentRole);

  if (!currentRole) return <Navigate to="/" replace />;

  return (
    <AppLayout>
      <Routes>
        {/* Director (Administrador) */}
        <Route path="/director" element={<DirectorDashboard />} />
        <Route path="/director/matricula" element={<Matricula />} />
        <Route path="/director/year" element={<AcademicYear />} />
        <Route path="/director/docentes" element={<DocentesMaterias />} />
        <Route path="/director/criterios" element={<CriteriosEvaluacion />} />
        <Route path="/director/planillas" element={<DirectorPlanillas />} />
        <Route path="/director/notas" element={<ReporteNotas />} />
        <Route path="/director/libretas" element={<Libretas />} />
        <Route path="/director/pagos" element={<Pagos />} />

        {/* Coordinador */}
        <Route path="/coordinador" element={<CoordinadorDashboard />} />
        <Route path="/coordinador/materias" element={<GestionMaterias />} />
        <Route path="/coordinador/tareas" element={<GestionTareas />} />
        <Route path="/coordinador/planillas" element={<CoordinadorPlanillas />} />
        <Route path="/coordinador/calificaciones" element={<CoordinadorCalificaciones />} />
        <Route path="/coordinador/informes" element={<CoordinadorInformes />} />

        {/* Docente (Profesor) */}
        <Route path="/docente" element={<DocenteDashboard />} />
        <Route path="/docente/planilla" element={<PlanillaMensual />} />
        <Route path="/docente/notas" element={<GestionNotas />} />
        <Route path="/docente/asistencia" element={<GestionAsistencia />} />
        <Route path="/docente/tareas" element={<DocenteTareas />} />
        <Route path="/docente/criterios" element={<DocenteCriterios />} />
        <Route path="/docente/libretas" element={<DocenteLibretas />} />
        <Route path="/docente/reportes" element={<Reportes />} />

        {/* Alumno */}
        <Route path="/alumno" element={<AlumnoDashboard />} />
        <Route path="/alumno/notas" element={<MisNotas />} />
        <Route path="/alumno/horario" element={<Horario />} />
        <Route path="/alumno/cursos" element={<CursosDocentes />} />
        <Route path="/alumno/deudas" element={<EstadoDeudas />} />
        <Route path="/alumno/libreta" element={<AlumnoLibreta />} />
        <Route path="/alumno/boleta" element={<BoletaNotas />} />

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
