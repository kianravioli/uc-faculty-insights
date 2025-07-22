import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Users, BookOpen, TrendingUp, Filter, Search } from "lucide-react";
import { mockDepartmentData, campuses } from "@/data/mockData";

const Departments = () => {
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("averageSalary");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort data
  const filteredData = mockDepartmentData
    .filter(dept => {
      const matchesCampus = selectedCampus === "All" || dept.campus === selectedCampus;
      const matchesSearch = dept.department.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCampus && matchesSearch;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      const modifier = sortOrder === "asc" ? 1 : -1;
      return (aValue > bValue ? 1 : -1) * modifier;
    });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Calculate summary metrics
  const totalDepartments = filteredData.length;
  const avgSalary = Math.round(filteredData.reduce((sum, dept) => sum + dept.averageSalary, 0) / filteredData.length || 0);
  const totalFaculty = filteredData.reduce((sum, dept) => sum + dept.totalFaculty, 0);
  const avgSalaryPerStudent = Math.round(filteredData.reduce((sum, dept) => sum + dept.salaryPerStudent, 0) / filteredData.length || 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/5 to-primary-lighter/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Department Analysis</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Compare faculty compensation and teaching metrics across UC departments and campuses
          </p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="py-8 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="stat-medium">{totalDepartments}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Departments</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="stat-medium">${avgSalary.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Avg Salary</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-5 h-5 text-chart-3" />
                </div>
                <CardTitle className="stat-medium">{totalFaculty}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Total Faculty</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-chart-5/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-5 h-5 text-chart-5" />
                </div>
                <CardTitle className="stat-medium">${avgSalaryPerStudent}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Avg $/Student</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters and Data */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campus</label>
                  <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Campuses</SelectItem>
                      {campuses.map(campus => (
                        <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Department</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search departments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="averageSalary">Average Salary</SelectItem>
                      <SelectItem value="totalFaculty">Faculty Count</SelectItem>
                      <SelectItem value="totalStudents">Students Taught</SelectItem>
                      <SelectItem value="salaryPerStudent">Salary per Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Department Comparison</CardTitle>
              <CardDescription>
                Showing {filteredData.length} departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSort("department")}
                          className="h-auto p-0 font-semibold"
                        >
                          Department
                        </Button>
                      </TableHead>
                      <TableHead>Campus</TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSort("averageSalary")}
                          className="h-auto p-0 font-semibold"
                        >
                          Avg Salary
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSort("totalFaculty")}
                          className="h-auto p-0 font-semibold"
                        >
                          Faculty
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSort("totalCourses")}
                          className="h-auto p-0 font-semibold"
                        >
                          Courses
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSort("totalStudents")}
                          className="h-auto p-0 font-semibold"
                        >
                          Students
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSort("salaryPerStudent")}
                          className="h-auto p-0 font-semibold"
                        >
                          $/Student
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((dept, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {dept.department}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="department-tag">
                            {dept.campus}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">
                          ${dept.averageSalary.toLocaleString()}
                        </TableCell>
                        <TableCell>{dept.totalFaculty}</TableCell>
                        <TableCell>{dept.totalCourses}</TableCell>
                        <TableCell>{dept.totalStudents.toLocaleString()}</TableCell>
                        <TableCell className="font-mono">
                          ${dept.salaryPerStudent.toFixed(0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Departments;