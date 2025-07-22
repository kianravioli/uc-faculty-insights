import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DollarSign, Users, BookOpen, Search, Filter, ExternalLink } from "lucide-react";
import { mockFacultyData, campuses, departments } from "@/data/mockData";

const Faculty = () => {
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("salary");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort data
  const filteredData = mockFacultyData
    .filter(faculty => {
      const matchesCampus = selectedCampus === "All" || faculty.campus === selectedCampus;
      const matchesDepartment = selectedDepartment === "All" || faculty.department === selectedDepartment;
      const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faculty.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCampus && matchesDepartment && matchesSearch;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      const modifier = sortOrder === "asc" ? 1 : -1;
      return (aValue > bValue ? 1 : -1) * modifier;
    });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getSalaryColor = (salary: number) => {
    if (salary >= 150000) return "text-destructive";
    if (salary >= 130000) return "text-accent";
    return "text-chart-5";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/5 to-primary-lighter/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Faculty Profiles</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Individual faculty salary data, teaching loads, and historical trends across UC campuses
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Search & Filter Faculty
              </CardTitle>
              <CardDescription>
                Find faculty members by name, department, or campus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Name</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search faculty..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

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
                  <label className="text-sm font-medium">Department</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="coursesCount">Course Load</SelectItem>
                      <SelectItem value="studentsCount">Students Taught</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredData.length} faculty members
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((faculty) => (
              <Card key={faculty.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(faculty.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{faculty.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {faculty.title}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {faculty.department}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {faculty.campus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getSalaryColor(faculty.salary)}`}>
                        ${(faculty.salary / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Annual Salary</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {faculty.coursesCount}
                      </div>
                      <div className="text-xs text-muted-foreground">Courses</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm font-medium">{faculty.studentsCount}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <BookOpen className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm font-medium">{faculty.creditHours}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Credit Hours</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      asChild
                    >
                      <Link to={`/faculty/${faculty.id}`}>
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredData.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Faculty Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Faculty;