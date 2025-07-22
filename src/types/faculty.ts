export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  campus: string;
  salary: number;
  year: number;
  coursesCount: number;
  studentsCount: number;
  creditHours: number;
}

export interface DepartmentData {
  department: string;
  campus: string;
  averageSalary: number;
  totalFaculty: number;
  totalCourses: number;
  totalStudents: number;
  salaryPerStudent: number;
}

export interface ChartDataPoint {
  year: number;
  salary: number;
  courses: number;
  students: number;
}