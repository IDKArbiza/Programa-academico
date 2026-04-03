// Script simple para poblar la base de datos
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuración de Firebase real
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

const populateDatabase = async () => {
  try {
    console.log('🌱 Poblando base de datos...');
    
    // Usuarios con formato cedula@cpcc.com
    const users = [
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

    // Crear usuarios
    for (const user of users) {
      const docRef = await addDoc(collection(db, 'users'), user);
      console.log(`✅ Usuario creado: ${user.email} (ID: ${docRef.id})`);
    }

    console.log('✅ Base de datos poblada exitosamente');
    console.log('📊 Usuarios creados:');
    console.log('   - Director: 1234567@cpcc.com');
    console.log('   - Coordinador: 2345678@cpcc.com');
    console.log('   - Docente: 3456789@cpcc.com');
    console.log('   - Alumno: 4567890@cpcc.com');
    console.log('🔑 Contraseñas: cedulacpcc');
    
  } catch (error) {
    console.error('❌ Error al poblar base de datos:', error);
  }
};

populateDatabase();
