import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockSubjects, mockStudents, mockMonthlySheets, ALL_MONTHS } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Layers, Eye } from 'lucide-react';

// Simulated logged-in student
const STUDENT_ID = 's1';

const MisPlanillas = () => {
  const student = mockStudents.find(s => s.id === STUDENT_ID)!;
  const subjects = mockSubjects.filter(s => s.grade === student.grade);
  const [selectedMonth, setSelectedMonth] = useState('3');

  const month = parseInt(selectedMonth);
  const monthName = ALL_MONTHS.find(m => m.month === month)?.name || '';

  // Get sheets for this student's grade and selected month
  const sheets = mockMonthlySheets.filter(
    ms => ms.grade === student.grade && ms.month === month
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Layers className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Mis Planillas Mensuales</h2>
          <p className="text-sm text-muted-foreground">
            Consultá tus puntajes mensuales por materia — solo vos podés ver tus datos
          </p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap items-end">
        <div className="space-y-1">
          <Label>Mes</Label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ALL_MONTHS.map(m => (
                <SelectItem key={m.month} value={String(m.month)}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground pb-2">
          <Eye className="h-4 w-4 inline mr-1" />
          Solo se muestran tus puntajes personales
        </div>
      </div>

      <div className="text-center bg-primary/10 border border-primary/20 rounded-lg p-3 mb-2">
        <h3 className="font-bold text-lg">Puntajes de {monthName} 2026</h3>
        <p className="text-sm text-muted-foreground">
          {student.firstName} {student.lastName} — {student.grade} Bachillerato Técnico en Informática
        </p>
      </div>

      {/* One card per subject */}
      {subjects.map(sub => {
        const sheet = sheets.find(sh => sh.subjectId === sub.id);
        const entry = sheet?.entries.find(e => e.studentId === STUDENT_ID);
        const tp = sub.hoursPerWeek * 2;

        return (
          <Card key={sub.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{sub.name}</h4>
                  <p className="text-xs text-muted-foreground">{sub.hoursPerWeek} hs/semana · TP máx: {tp} pts</p>
                </div>
                {sheet ? (
                  <Badge variant={sheet.status === 'aprobado' ? 'default' : 'secondary'}>
                    {sheet.status === 'aprobado' ? 'Publicado' : sheet.status === 'enviado' ? 'En revisión' : 'Pendiente'}
                  </Badge>
                ) : (
                  <Badge variant="outline">Sin cargar</Badge>
                )}
              </div>

              {entry ? (
                <div className="flex items-center gap-4">
                  <div className={`text-3xl font-bold ${
                    entry.finalGrade / tp >= 0.8 ? 'text-success' :
                    entry.finalGrade / tp >= 0.5 ? 'text-warning' :
                    'text-destructive'
                  }`}>
                    {entry.finalGrade}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    / {tp} puntos
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          entry.finalGrade / tp >= 0.8 ? 'bg-success' :
                          entry.finalGrade / tp >= 0.5 ? 'bg-warning' :
                          'bg-destructive'
                        }`}
                        style={{ width: `${Math.min((entry.finalGrade / tp) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {((entry.finalGrade / tp) * 100).toFixed(0)}% del puntaje total
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  El profesor aún no cargó la planilla de este mes
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}

      {subjects.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron materias para tu curso.
        </div>
      )}
    </div>
  );
};

export default MisPlanillas;
