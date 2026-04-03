// Script para limpiar y poblar la base de datos en español
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-XUdQYRvfApxbMOi6hWdf0GC_OVHIciE",
  authDomain: "sistemadeplanillas.firebaseapp.com",
  projectId: "sistemadeplanillas",
  storageBucket: "sistemadeplanillas.firebasestorage.app",
  messagingSenderId: "128567308362",
  appId: "1:128567308362:web:f0a782a56b3909071e76b3",
  measurementId: "G-QM9BV5Q9B9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para limpiar completamente la base de datos
const limpiarBaseDeDatos = async () => {
  console.log('🧹 Limpiando base de datos...');
  
  const colecciones = ['users', 'students', 'teachers', 'subjects', 'grades', 'evaluationCriteria', 'attendance', 'payments', 'schedule', 'academicYears', 'boletas', 'colegios'];
  
  for (const coleccion of colecciones) {
    try {
      const querySnapshot = await getDocs(collection(db, coleccion));
      const batch = [];
      
      querySnapshot.forEach((doc) => {
        batch.push(deleteDoc(doc.ref));
      });
      
      if (batch.length > 0) {
        await Promise.all(batch);
        console.log(`✅ Colección ${coleccion} limpiada (${batch.length} documentos)`);
      }
    } catch (error) {
      console.log(`ℹ️ Colección ${coleccion} no existe o está vacía`);
    }
  }
};

// Función para poblar la base de datos con datos en español
const poblarBaseDeDatos = async () => {
  console.log('🌱 Poblando base de datos con datos en español...');
  
  try {
    // 1. Crear año académico
    const añoAcademico = {
      year: 2026,
      periodType: 'etapa',
      startDate: '2026-03-01',
      endDate: '2026-12-20',
      status: 'activo',
      etapas: {
        1: { start: '2026-03-01', end: '2026-07-15' },
        2: { start: '2026-07-16', end: '2026-12-20' }
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const añoDoc = await addDoc(collection(db, 'academicYears'), añoAcademico);
    console.log('✅ Año académico creado');
    
    // 2. Crear usuarios
    const usuarios = [
      {
        name: 'Carlos Rodríguez',
        email: '1234567@cpcc.com',
        role: 'director',
        avatar: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        name: 'María García',
        email: '2345678@cpcc.com',
        role: 'coordinador',
        avatar: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        name: 'Roberto Sánchez',
        email: '3456789@cpcc.com',
        role: 'docente',
        avatar: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        name: 'Juan Pérez',
        email: '4567890@cpcc.com',
        role: 'alumno',
        avatar: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];
    
    const usuariosCreados = [];
    for (const usuario of usuarios) {
      const docRef = await addDoc(collection(db, 'users'), usuario);
      usuariosCreados.push({ ...usuario, id: docRef.id });
      console.log(`✅ Usuario creado: ${usuario.email} (${usuario.role})`);
    }
    
    // 3. Crear estudiantes
    const estudiantes = [
      {
        firstName: 'Juan',
        lastName: 'Pérez',
        ci: '12345678',
        grade: '1° Año',
        turn: 'mañana',
        enrollmentDate: '2026-03-01',
        status: 'activo',
        parentName: 'Carlos Pérez',
        parentPhone: '987654321',
        address: 'Av. Principal 123',
        city: 'Asunción',
        department: 'Central',
        birthDate: '2008-05-15',
        nationality: 'paraguayo',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        firstName: 'María',
        lastName: 'García',
        ci: '87654321',
        grade: '2° Año',
        turn: 'tarde',
        enrollmentDate: '2026-03-01',
        status: 'activo',
        parentName: 'Roberto García',
        parentPhone: '987654322',
        address: 'Jr. Los Olivos 456',
        city: 'Asunción',
        department: 'Central',
        birthDate: '2007-08-22',
        nationality: 'paraguayo',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        firstName: 'Pedro',
        lastName: 'Rodríguez',
        ci: '45678912',
        grade: '3° Año',
        turn: 'mañana',
        enrollmentDate: '2026-03-01',
        status: 'activo',
        parentName: 'Ana Rodríguez',
        parentPhone: '987654323',
        address: 'Calle Lima 789',
        city: 'Asunción',
        department: 'Central',
        birthDate: '2006-03-10',
        nationality: 'paraguayo',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];
    
    const estudiantesCreados = [];
    for (const estudiante of estudiantes) {
      const docRef = await addDoc(collection(db, 'students'), estudiante);
      estudiantesCreados.push({ ...estudiante, id: docRef.id });
      console.log(`✅ Estudiante creado: ${estudiante.firstName} ${estudiante.lastName}`);
    }
    
    // 4. Crear docentes
    const docentes = [
      {
        firstName: 'Roberto',
        lastName: 'Sánchez',
        ci: '55667788',
        cedula: '3456789',
        specialty: 'Programación',
        title: 'Licenciado en Informática',
        phone: '555-0202',
        email: '3456789@cpcc.com',
        subjects: ['Programación', 'Base de Datos'],
        hireDate: '2019-02-15',
        contractType: 'permanente',
        category: 'Categoría III',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];
    
    const docentesCreados = [];
    for (const docente of docentes) {
      const docRef = await addDoc(collection(db, 'teachers'), docente);
      docentesCreados.push({ ...docente, id: docRef.id });
      console.log(`✅ Docente creado: ${docente.firstName} ${docente.lastName}`);
    }
    
    // 5. Crear asignaturas
    const asignaturas = [
      {
        name: 'Programación',
        code: 'PROG101',
        grade: '1° Año',
        teacherId: docentesCreados[0].id,
        hoursPerWeek: 6,
        area: 'tecnica',
        isMandatory: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        name: 'Base de Datos',
        code: 'BD101',
        grade: '2° Año',
        teacherId: docentesCreados[0].id,
        hoursPerWeek: 4,
        area: 'tecnica',
        isMandatory: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];
    
    const asignaturasCreadas = [];
    for (const asignatura of asignaturas) {
      const docRef = await addDoc(collection(db, 'subjects'), asignatura);
      asignaturasCreadas.push({ ...asignatura, id: docRef.id });
      console.log(`✅ Asignatura creada: ${asignatura.name}`);
    }
    
    console.log('✅ Base de datos poblada exitosamente');
    console.log('📊 Resumen de datos creados:');
    console.log(`   - ${usuarios.length} usuarios`);
    console.log(`   - ${estudiantes.length} estudiantes`);
    console.log(`   - ${docentes.length} docentes`);
    console.log(`   - ${asignaturas.length} asignaturas`);
    console.log(`   - 1 año académico`);
    console.log('🎓 Sistema CPCC listo para usar en español');
    
  } catch (error) {
    console.error('❌ Error al poblar base de datos:', error);
  }
};

// Ejecutar proceso completo
const procesoCompleto = async () => {
  await limpiarBaseDeDatos();
  await poblarBaseDeDatos();
};

procesoCompleto();
