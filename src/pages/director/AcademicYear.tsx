import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockAcademicYear } from '@/lib/mock-data';
import { Calendar, Save } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PeriodType } from '@/lib/types';

const AcademicYear = () => {
  const [year, setYear] = useState(mockAcademicYear);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuración Año Lectivo - Colegio CPCC</h2>

      <Card className="max-w-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Año {year.year}</h3>
              <Badge variant={year.status === 'activo' ? 'default' : 'secondary'}>{year.status}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Año</Label>
              <Input type="number" value={year.year} onChange={e => setYear({...year, year: parseInt(e.target.value)})} />
            </div>
            <div className="space-y-2">
              <Label>Sistema de Evaluación</Label>
              <Select value={year.periodType} onValueChange={v => setYear({...year, periodType: v as PeriodType})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="etapa">Etapa (2 etapas/año)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fecha Inicio</Label>
              <Input type="date" value={year.startDate} onChange={e => setYear({...year, startDate: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Fecha Fin</Label>
              <Input type="date" value={year.endDate} onChange={e => setYear({...year, endDate: e.target.value})} />
            </div>
          </div>

          <Button className="w-full"><Save className="h-4 w-4 mr-2" />Guardar Cambios</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicYear;
