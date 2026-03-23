import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockSubjects, mockTeachers } from '@/lib/mock-data';

const CursosDocentes = () => {
  const subjects = mockSubjects.filter(s => s.grade === '1° Año');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cursos y Docentes</h2>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia</TableHead>
                <TableHead>Docente</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead className="text-center">Hrs/Sem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map(sub => {
                const teacher = mockTeachers.find(t => t.id === sub.teacherId);
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell>{teacher ? `${teacher.firstName} ${teacher.lastName}` : '-'}</TableCell>
                    <TableCell>{teacher?.specialty}</TableCell>
                    <TableCell className="text-center">{sub.hoursPerWeek}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CursosDocentes;
