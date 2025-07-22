import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, DollarSign, BookOpen, TrendingUp, Database } from "lucide-react";
import { mockDepartmentData } from "@/data/mockData";

const Index = () => {
  const [selectedYear] = useState("2024");
  
  // Calculate summary statistics
  const totalFaculty = mockDepartmentData.reduce((sum, dept) => sum + dept.totalFaculty, 0);
  const averageSalary = Math.round(mockDepartmentData.reduce((sum, dept) => sum + dept.averageSalary, 0) / mockDepartmentData.length);
  const totalStudents = mockDepartmentData.reduce((sum, dept) => sum + dept.totalStudents, 0);
  const totalCourses = mockDepartmentData.reduce((sum, dept) => sum + dept.totalCourses, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary-lighter/10 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 year-badge">
              Academic Year {selectedYear}
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Transparency in Higher Education Spending
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive data analysis of University of California faculty salaries, 
              teaching loads, and educational outcomes across all UC campuses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/departments">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Explore Department Data
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/faculty">
                  <Users className="mr-2 h-5 w-5" />
                  View Faculty Profiles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="stat-large">{totalFaculty.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Total Faculty Members</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="stat-large">${averageSalary.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Average Faculty Salary</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle className="stat-large">{totalStudents.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Students Taught</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-chart-5/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-chart-5" />
                </div>
                <CardTitle className="stat-large">{totalCourses.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Courses Offered</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="report-section">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
                <CardDescription className="text-lg">
                  Promoting accountability and transparency in public higher education
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-center text-muted-foreground">
                  This report provides comprehensive analysis of faculty compensation, teaching responsibilities, 
                  and student outcomes across the University of California system. Our goal is to make public 
                  education data accessible, understandable, and actionable for students, parents, policymakers, 
                  and the general public.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Data-Driven Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Evidence-based analysis of compensation and performance metrics
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Database className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">Open Access</h3>
                    <p className="text-sm text-muted-foreground">
                      All data sources are public and methodology is transparent
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-chart-3" />
                    </div>
                    <h3 className="font-semibold mb-2">Public Service</h3>
                    <p className="text-sm text-muted-foreground">
                      Serving students, families, and taxpayers with accessible information
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Explore the Data</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Department Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Compare salary and teaching metrics across departments and campuses
                </CardDescription>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/departments">View Departments</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Faculty Profiles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Individual faculty salary histories and teaching loads
                </CardDescription>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/faculty">Browse Faculty</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Methodology, sources, and download links for all datasets
                </CardDescription>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/data-sources">View Sources</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
