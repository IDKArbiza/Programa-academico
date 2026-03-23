// Script para poblar la base de datos de Firebase con datos iniciales del sistema CPCC
import { seedInitialData } from './src/lib/seed-data.js';

// Ejecutar el seed
const populateDatabase = async () => {
  console.log('🌱 Iniciando población de la base de datos del Colegio CPCC...');
  
  try {
    const success = await seedInitialData();
    
    if (success) {
      console.log('✅ Base de datos poblada exitosamente');
      console.log('📊 Datos creados:');
      console.log('   - 3 usuarios (director, docente, alumno)');
      console.log('   - 3 estudiantes (1°, 2°, 3° año)');
      console.log('   - 2 docentes con categorías magisteriales');
      console.log('   - 3 asignaturas con códigos MEC');
      console.log('   - 1 año lectivo con 2 etapas');
      console.log('🎓 Sistema CPCC listo para usar!');
    } else {
      console.log('❌ Error al poblar la base de datos');
    }
  } catch (error) {
    console.error('💥 Error crítico:', error);
  }
  
  process.exit(0);
};

populateDatabase();
