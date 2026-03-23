import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockSchedule, DAYS } from '@/lib/mock-data';
import { Printer } from 'lucide-react';

const Horario = () => {
  const schedule = mockSchedule.filter(s => s.grade === '4to' && s.section === 'A');
  const times = [...new Set(schedule.map(s => `${s.startTime}-${s.endTime}`))].sort();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Horario de Clases</h2>
        <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" />Imprimir</Button>
      </div>

      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-foreground/20">
                <th className="text-left py-3 px-2 w-28">Hora</th>
                {DAYS.map(d => <th key={d} className="text-center py-3 px-2">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {times.map(time => (
                <tr key={time} className="border-b border-border">
                  <td className="py-3 px-2 font-medium text-muted-foreground text-xs">{time}</td>
                  {DAYS.map((_, dayIdx) => {
                    const entry = schedule.find(s => s.dayOfWeek === dayIdx && `${s.startTime}-${s.endTime}` === time);
                    return (
                      <td key={dayIdx} className="text-center py-2 px-1">
                        {entry ? (
                          <div className="bg-primary/10 text-primary rounded-lg p-2">
                            <p className="font-semibold text-xs">{entry.subjectName}</p>
                            <p className="text-[10px] opacity-70">{entry.teacherName}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Horario;
