import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, DollarSign, Users, BookOpen, TrendingUp, Calendar } from "lucide-react";
import { mockFacultyData, generateHistoricalData } from "@/data/mockData";

const FacultyDetail = () => {
  const { id } = useParams();
  const faculty = mockFacultyData.find(f => f.id === id);
  
  if (!faculty) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">Faculty Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested faculty member could not be found.</p>
            <Button asChild>
              <Link to="/faculty">Back to Faculty</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const historicalData = generateHistoricalData(faculty);
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  // Calculate metrics
  const salaryPerStudent = Math.round(faculty.salary / faculty.studentsCount);
  const studentsPerCourse = Math.round(faculty.studentsCount / faculty.coursesCount);
  const salaryGrowth = ((historicalData[0].salary - historicalData[historicalData.length - 1].salary) / historicalData[historicalData.length - 1].salary * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/5 to-primary-lighter/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to="/faculty">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Faculty
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                {getInitials(faculty.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{faculty.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{faculty.title}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary">
                  {faculty.department}
                </Badge>
                <Badge variant="outline">
                  {faculty.campus}
                </Badge>
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  {faculty.year}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="stat-large">${faculty.salary.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Annual Salary</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="stat-large">{faculty.studentsCount}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Students Taught</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle className="stat-large">{faculty.coursesCount}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Courses Teaching</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-chart-5/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-chart-5" />
                </div>
                <CardTitle className="stat-large">${salaryPerStudent}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Salary per Student</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Salary History */}
            <Card>
              <CardHeader>
                <CardTitle>Salary History</CardTitle>
                <CardDescription>5-year salary trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicalData.map((year, index) => (
                    <div key={year.year} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge variant={index === 0 ? "default" : "outline"}>
                          {year.year}
                        </Badge>
                        <span className="font-medium">${year.salary.toLocaleString()}</span>
                      </div>
                      {index > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {((year.salary - historicalData[index - 1].salary) / historicalData[index - 1].salary * 100).toFixed(1)}% change
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">5-Year Growth</div>
                  <div className="text-lg font-semibold text-primary">+{salaryGrowth}%</div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Teaching Metrics</CardTitle>
                <CardDescription>Current academic year performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{faculty.coursesCount}</div>
                      <div className="text-sm text-muted-foreground">Courses</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">{faculty.creditHours}</div>
                      <div className="text-sm text-muted-foreground">Credit Hours</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-chart-3">{faculty.studentsCount}</div>
                      <div className="text-sm text-muted-foreground">Total Students</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-chart-5">{studentsPerCourse}</div>
                      <div className="text-sm text-muted-foreground">Students/Course</div>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Teaching Efficiency</span>
                      <span className="text-lg font-bold">${salaryPerStudent}/student</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Peer Comparison */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Department Context</CardTitle>
              <CardDescription>How this faculty member compares within {faculty.department}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-semibold text-muted-foreground mb-2">Salary Percentile</div>
                  <div className="text-3xl font-bold text-primary">78th</div>
                  <div className="text-sm text-muted-foreground">Within department</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-semibold text-muted-foreground mb-2">Teaching Load</div>
                  <div className="text-3xl font-bold text-accent">Average</div>
                  <div className="text-sm text-muted-foreground">Course load ranking</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-semibold text-muted-foreground mb-2">Student Ratio</div>
                  <div className="text-3xl font-bold text-chart-3">High</div>
                  <div className="text-sm text-muted-foreground">Students per course</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FacultyDetail;