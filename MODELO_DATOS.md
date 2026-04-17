# Modelo de Datos - Sistema de Gestión Académica

Este documento detalla la estructura de la base de datos (NoSQL / Firestore) del sistema, organizada por módulos funcionales. El diseño sigue una arquitectura modular para facilitar la escalabilidad y el mantenimiento.

## 1. Diagrama de Entidad-Relación (ERD)

A continuación se presenta la visualización de las colecciones y sus relaciones. 

```mermaid
erDiagram
    %% Módulo de Administración
    COLEGIO ||--o{ ACADEMIC_YEAR : "gestiona"
    USER ||--o{ STUDENT : "puede_ser"
    USER ||--o{ TEACHER : "puede_ser"

    %% Módulo Académico
    TEACHER ||--o{ SUBJECT : "dicta"
    SUBJECT ||--o{ SCHEDULE_ENTRY : "tiene"
    SUBJECT ||--o{ TASK : "asigna"
    SUBJECT ||--o{ EVALUATION_CRITERIA : "define"

    %% Módulo de Estudiantes
    STUDENT ||--o{ ATTENDANCE : "registra"
    STUDENT ||--o{ PAYMENT : "realiza"
    STUDENT ||--o{ GRADE : "recibe"
    STUDENT ||--o{ BOLETA_NOTAS : "genera"

    %% Módulo de Evaluación
    SUBJECT ||--o{ MONTHLY_GRADE_SHEET : "registra_en"
    TEACHER ||--o{ MONTHLY_GRADE_SHEET : "completa"
    MONTHLY_GRADE_SHEET ||--o{ MONTHLY_GRADE_ENTRY : "contiene"
    STUDENT ||--o{ MONTHLY_GRADE_ENTRY : "calificado_en"
    EVALUATION_CRITERIA ||--o{ CRITERIA_GRADE : "evalúa"
    GRADE ||--o{ CRITERIA_GRADE : "compuesto_por"

    COLEGIO {
        string id PK
        string name
        string code
        string address
        string city
        string phone
        string email
        string administrador
        string tipo "publico | privado | subvencionado"
    }

    USER {
        string id PK
        string name
        string email
        string role "admin | coord | docente | alumno"
        string avatar
    }

    STUDENT {
        string id PK
        string firstName
        string lastName
        string ci
        string grade
        string turn "mañana | tarde"
        string status "activo | inactivo | etc"
    }

    TEACHER {
        string id PK
        string firstName
        string lastName
        string ci
        string specialty
        string email
    }

    SUBJECT {
        string id PK
        string name
        string code
        string grade
        string teacherId FK
        string area "matematica | ciencias | etc"
    }

    MONTHLY_GRADE_SHEET {
        string id PK
        string subjectId FK
        string teacherId FK
        int month
        int year
        int etapa "1 | 2"
        string status "borrador | enviado | aprobado"
    }

    GRADE {
        string id PK
        string studentId FK
        string subjectId FK
        int finalGrade
        boolean isRecovery
    }

    PAYMENT {
        string id PK
        string studentId FK
        float amount
        string status "pendiente | pagado"
        string concept
    }
```

---

## 2. Definición de Módulos

### 🔵 Módulo de Administración (Core)
Controla la configuración global del establecimiento y los usuarios del sistema.
*   **Colegio:** Información institucional.
*   **User:** Cuentas de acceso con roles definidos (`administrador`, `coordinador`, `docente`, `alumno`).
*   **AcademicYear:** Define el ciclo escolar actual y las fechas de las etapas.

### 🟢 Módulo Académico
Estructura la carga horaria y las asignaciones pedagógicas.
*   **Teacher:** Perfil profesional del docente.
*   **Subject:** Materias asignadas a grados y docentes específicos.
*   **ScheduleEntry:** Horarios de clase por asignatura y aula.
*   **Task:** Tareas y proyectos asignados por los docentes.

### 🟠 Módulo del Estudiante
Gestión técnica y financiera del alumnado.
*   **Student:** Datos personales, académicos y de contacto (padres).
*   **Attendance:** Control diario de presencia por materia.
*   **Payment:** Historial de mensualidades, matrículas y otros conceptos.

### 🔴 Módulo de Evaluación (Foco Principal)
El motor de calificaciones y reportes del sistema.
*   **MonthlyGradeSheet:** Planilla mensual donde el docente carga los puntos.
*   **EvaluationCriteria:** Criterios específicos (Trabajo, Examen, etc.) para cada materia.
*   **Grade:** Registro final de calificaciones por etapa y recuperación.
*   **BoletaNotas:** Reporte consolidado de rendimiento y conducta.

---

## 3. Consideraciones Técnicas (Firestore)

A diferencia de un modelo SQL tradicional, este sistema aprovecha las capacidades de Firestore:
1.  **Referencias Directas:** Se utilizan IDs de documentos para simular relaciones Foreign Key.
2.  **Subcolecciones y Objetos Anidados:** Por ejemplo, `MonthlyGradeSheet` contiene un array de `entries` para optimizar la lectura de planillas completas.
3.  **Seguridad por Roles:** Las reglas de Firebase (`firestore.rules`) utilizan el campo `role` del documento `User` para restringir el acceso a colecciones sensibles como `Payment` o `Grade`.

> [!TIP]
> Para extender el modelo (ej. añadir un módulo de Biblioteca), se recomienda seguir el patrón de **Normalización Híbrida**: mantener datos pequeños anidados y datos grandes en colecciones independientes.
