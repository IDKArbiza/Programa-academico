import { db } from './src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function listCourses() {
  const snapshot = await getDocs(collection(db, 'courses'));
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

listCourses();
