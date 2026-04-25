import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-XUdQYRvfApxbMOi6hWdf0GC_OVHIciE",
  authDomain: "sistemadeplanillas.firebaseapp.com",
  projectId: "sistemadeplanillas",
  storageBucket: "sistemadeplanillas.firebasestorage.app",
  messagingSenderId: "128567308362",
  appId: "1:128567308362:web:f0a782a56b3909071e76b3",
  measurementId: "G-QM9BV5Q9B9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const firstNames = ["Juan", "Maria", "Carlos", "Ana", "Luis", "Elena", "Pedro", "Sofia", "Miguel", "Lucia", "Jose", "Carmen", "Javier", "Isabel", "Ricardo", "Paula", "Diego", "Marta", "Fernando", "Rosa", "Hugo", "Sara", "Adrian", "Laura", "Mateo", "Clara", "Daniel", "Julia", "Pablo", "Irene"];
const lastNames = ["Gomez", "Lopez", "Perez", "Garcia", "Martinez", "Rodriguez", "Sanchez", "Fernandez", "Benitez", "Ruiz", "Torres", "Diaz", "Vazquez", "Castro", "Romero", "Morales", "Ortega", "Herrera", "Nuñez", "Medina", "Castillo", "Ramos", "Dominguez", "Rojas", "Flores", "Cardozo", "Ramirez", "Gimenez", "Silvero", "Aguirre"];

async function addStudents() {
  const courseName = "2do Año - Bachillerato técnico en Informatica";
  const grade = "2° Año";
  const year = new Date().getFullYear();

  console.log(`Buscando curso: ${courseName}...`);
  const coursesRef = collection(db, 'courses');
  const q = query(coursesRef, where("name", "==", courseName));
  const querySnapshot = await getDocs(q);
  
  let courseId;
  let existingStudents = [];

  if (querySnapshot.empty) {
    console.log("El curso no existe. Creándolo...");
    const newCourse = {
      name: courseName,
      grade: grade,
      year: year,
      students: [],
      teachers: [],
      subjects: [],
      teacherAssignments: [],
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString()
    };
    const docRef = await addDoc(coursesRef, newCourse);
    courseId = docRef.id;
  } else {
    const courseDoc = querySnapshot.docs[0];
    courseId = courseDoc.id;
    existingStudents = courseDoc.data().students || [];
    console.log(`Curso encontrado (ID: ${courseId}). Alumnos actuales: ${existingStudents.length}`);
  }

  const newStudentIds = [];
  console.log("Creando 30 alumnos...");

  for (let i = 0; i < 30; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const ciBase = 5200000 + Math.floor(Math.random() * 500000);
    const ci = ciBase.toString();
    const email = `${ci}@cpcc.com`;

    const newUser = {
      firstName,
      lastName,
      ci,
      email,
      role: 'alumno',
      grade: grade,
      status: 'activo',
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString()
    };

    const userDocRef = await addDoc(collection(db, 'users'), newUser);
    newStudentIds.push(userDocRef.id);
    console.log(`Creado: ${firstName} ${lastName} (CI: ${ci})`);
  }

  console.log("Actualizando curso con los nuevos alumnos...");
  const updatedStudents = [...existingStudents, ...newStudentIds];
  await updateDoc(doc(db, 'courses', courseId), {
    students: updatedStudents,
    updatedAt: Timestamp.now().toDate().toISOString()
  });

  console.log("¡Operación completada exitosamente!");
  process.exit(0);
}

addStudents().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
