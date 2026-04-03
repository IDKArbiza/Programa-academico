import { userService, studentService, teacherService, subjectService, academicYearService } from './firebase-services';
import { User, Student, Teacher, Subject, AcademicYear } from './types';

export const seedInitialData = async () => {
  try {
    // Create users
    const users: Omit<User, 'id'>[] = [
      {
        name: 'Carlos Rodríguez',
        email: 'director@colegio.edu',
        role: 'director',
        avatar: ''
      },
      {
        name: 'María García',
        email: 'docente@colegio.edu',
        role: 'docente',
        avatar: ''
      },
      {
        name: 'Juan Pérez',
        email: 'alumno@colegio.edu',
        role: 'alumno',
        avatar: ''
      }
    ];

    const createdUsers = await Promise.all(
      users.map(user => userService.create(user))
    );

    // Create academic year
    const academicYear: Omit<AcademicYear, 'id'> = {
      year: 2026,
      periodType: 'etapa',
      startDate: '2026-03-01',
      endDate: '2026-12-20',
      status: 'activo',
      etapas: {
        1: { start: '2026-03-01', end: '2026-07-15' },
        2: { start: '2026-07-16', end: '2026-12-20' }
      }
    };

    await academicYearService.create(academicYear);

    // Create students
    const students: Omit<Student, 'id'>[] = [
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
        nationality: 'paraguayo'
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
        nationality: 'paraguayo'
      },
      {
        firstName: 'Pedro',
        lastName: 'Rodríguez',
        ci: '45678912',
        grade: '3° Año',
        section: 'A',
        turn: 'mañana',
        enrollmentDate: '2026-03-01',
        status: 'activo',
        parentName: 'Ana Rodríguez',
        parentPhone: '987654323',
        address: 'Calle Lima 789',
        city: 'Asunción',
        department: 'Central',
        birthDate: '2006-03-10',
        nationality: 'paraguayo'
      }
    ];

    await Promise.all(
      students.map(student => studentService.create(student))
    );

    // Create teachers
    const teachers: Omit<Teacher, 'id'>[] = [
      {
        firstName: 'María',
        lastName: 'García',
        ci: '98765432',
        cedula: '9876543',
        specialty: 'Matemáticas',
        title: 'Licenciada en Matemáticas',
        phone: '555-0201',
        email: 'maria.garcia@colegio.edu',
        subjects: ['Matemáticas', 'Física'],
        hireDate: '2020-03-01',
        contractType: 'permanente',
        category: 'Categoría II'
      },
      {
        firstName: 'Roberto',
        lastName: 'Sánchez',
        ci: '55667788',
        cedula: '5566778',
        specialty: 'Programación',
        title: 'Licenciado en Informática',
        phone: '555-0202',
        email: 'roberto.sanchez@colegio.edu',
        subjects: ['Programación', 'Base de Datos'],
        hireDate: '2019-02-15',
        contractType: 'permanente',
        category: 'Categoría III'
      }
    ];

    const createdTeachers = await Promise.all(
      teachers.map(teacher => teacherService.create(teacher))
    );

    // Create subjects
    const subjects: Omit<Subject, 'id'>[] = [
      {
        name: 'Matemáticas',
        code: 'MAT101',
        grade: '1° Año',
        teacherId: createdTeachers[0],
        hoursPerWeek: 5,
        area: 'matematica',
        isMandatory: true
      },
      {
        name: 'Programación',
        code: 'PROG101',
        grade: '1° Año',
        teacherId: createdTeachers[1],
        hoursPerWeek: 6,
        area: 'tecnica',
        isMandatory: true
      },
      {
        name: 'Base de Datos',
        code: 'BD101',
        grade: '2° Año',
        teacherId: createdTeachers[1],
        hoursPerWeek: 4,
        area: 'tecnica',
        isMandatory: true
      }
    ];

    await Promise.all(
      subjects.map(subject => subjectService.create(subject))
    );

    console.log('Datos iniciales creados exitosamente');
    return true;
  } catch (error) {
    console.error('Error al crear datos iniciales:', error);
    return false;
  }
};
