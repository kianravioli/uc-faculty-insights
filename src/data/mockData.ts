import { FacultyMember, DepartmentData } from "@/types/faculty";

// Mock faculty data
export const mockFacultyData: FacultyMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Professor",
    department: "Physics",
    campus: "UC Berkeley",
    salary: 165000,
    year: 2024,
    coursesCount: 3,
    studentsCount: 245,
    creditHours: 9
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    title: "Associate Professor",
    department: "Computer Science",
    campus: "UC San Diego",
    salary: 142000,
    year: 2024,
    coursesCount: 4,
    studentsCount: 180,
    creditHours: 12
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "Assistant Professor",
    department: "Mathematics",
    campus: "UCLA",
    salary: 118000,
    year: 2024,
    coursesCount: 5,
    studentsCount: 320,
    creditHours: 15
  },
  {
    id: "4",
    name: "Dr. David Williams",
    title: "Professor",
    department: "Chemistry",
    campus: "UC Davis",
    salary: 158000,
    year: 2024,
    coursesCount: 2,
    studentsCount: 140,
    creditHours: 6
  },
  {
    id: "5",
    name: "Dr. Lisa Kim",
    title: "Associate Professor",
    department: "Biology",
    campus: "UC Irvine",
    salary: 135000,
    year: 2024,
    coursesCount: 4,
    studentsCount: 200,
    creditHours: 12
  }
];

// Generate historical data for faculty
export const generateHistoricalData = (faculty: FacultyMember) => {
  const years = [2024, 2023, 2022, 2021, 2020];
  return years.map(year => ({
    year,
    salary: faculty.salary * (1 - (2024 - year) * 0.03), // 3% annual increase
    courses: faculty.coursesCount + Math.floor(Math.random() * 2 - 1),
    students: faculty.studentsCount + Math.floor(Math.random() * 40 - 20)
  }));
};

// Mock department data
export const mockDepartmentData: DepartmentData[] = [
  {
    department: "Computer Science",
    campus: "UC Berkeley",
    averageSalary: 158000,
    totalFaculty: 45,
    totalCourses: 180,
    totalStudents: 2400,
    salaryPerStudent: 65.8
  },
  {
    department: "Physics",
    campus: "UCLA",
    averageSalary: 152000,
    totalFaculty: 38,
    totalCourses: 152,
    totalStudents: 1900,
    salaryPerStudent: 80.0
  },
  {
    department: "Mathematics",
    campus: "UC San Diego",
    averageSalary: 145000,
    totalFaculty: 52,
    totalCourses: 260,
    totalStudents: 3200,
    salaryPerStudent: 45.3
  },
  {
    department: "Chemistry",
    campus: "UC Davis",
    averageSalary: 148000,
    totalFaculty: 32,
    totalCourses: 128,
    totalStudents: 1600,
    salaryPerStudent: 92.5
  },
  {
    department: "Biology",
    campus: "UC Irvine",
    averageSalary: 140000,
    totalFaculty: 41,
    totalCourses: 164,
    totalStudents: 2050,
    salaryPerStudent: 68.3
  }
];

export const campuses = [
  "UC Berkeley",
  "UCLA", 
  "UC San Diego",
  "UC Davis",
  "UC Irvine",
  "UC Santa Barbara",
  "UC Santa Cruz",
  "UC Riverside",
  "UC Merced"
];

export const departments = [
  "Computer Science",
  "Physics", 
  "Mathematics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Economics",
  "Psychology",
  "History",
  "English"
];