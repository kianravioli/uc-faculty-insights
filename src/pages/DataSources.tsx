import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Download, ExternalLink, Calendar, CheckCircle, AlertCircle } from "lucide-react";

const DataSources = () => {
  const dataSources = [
    {
      id: 1,
      name: "UC Faculty Salary Database",
      description: "Comprehensive salary data for all UC faculty members across all campuses",
      source: "University of California Office of the President",
      lastUpdated: "2024-03-15",
      recordCount: "45,231",
      format: "CSV",
      status: "active",
      url: "#",
      coverage: "2014-2024"
    },
    {
      id: 2,
      name: "Course Enrollment Data",
      description: "Student enrollment numbers by course, instructor, and semester",
      source: "UC Student Information Systems",
      lastUpdated: "2024-03-10",
      recordCount: "1,234,567",
      format: "JSON",
      status: "active",
      url: "#",
      coverage: "2019-2024"
    },
    {
      id: 3,
      name: "Faculty Teaching Assignments",
      description: "Teaching load data including course assignments and credit hours",
      source: "UC Academic Personnel Records",
      lastUpdated: "2024-02-28",
      recordCount: "89,456",
      format: "XML",
      status: "active",
      url: "#",
      coverage: "2016-2024"
    },
    {
      id: 4,
      name: "Campus Budget Allocations",
      description: "Department-level budget data and resource allocation information",
      source: "UC Budget Office",
      lastUpdated: "2023-12-31",
      recordCount: "2,345",
      format: "PDF",
      status: "archived",
      url: "#",
      coverage: "2014-2023"
    }
  ];

  const methodology = [
    {
      step: 1,
      title: "Data Collection",
      description: "Automated collection from official UC databases and public records"
    },
    {
      step: 2,
      title: "Data Validation",
      description: "Cross-reference multiple sources and validate data integrity"
    },
    {
      step: 3,
      title: "Privacy Filtering",
      description: "Remove personally identifiable information while preserving analytical value"
    },
    {
      step: 4,
      title: "Analysis & Aggregation", 
      description: "Statistical analysis and creation of comparative metrics"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-chart-5";
      case "archived": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />;
      case "archived": return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/5 to-primary-lighter/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Data Sources & Methodology</h1>
            <p className="text-xl text-muted-foreground">
              Transparent documentation of all data sources, collection methods, and analytical processes
            </p>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-8 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="stat-medium">{dataSources.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Data Sources</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="stat-medium">1.4M+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Total Records</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-5 h-5 text-chart-3" />
                </div>
                <CardTitle className="stat-medium">11 Years</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Data Coverage</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-chart-5/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Download className="w-5 h-5 text-chart-5" />
                </div>
                <CardTitle className="stat-medium">Monthly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Update Frequency</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Primary Data Sources</h2>
          
          <div className="space-y-6">
            {dataSources.map((source) => (
              <Card key={source.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center">
                        <Database className="mr-2 h-5 w-5 text-primary" />
                        {source.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {source.description}
                      </CardDescription>
                    </div>
                    <div className={`flex items-center space-x-1 ${getStatusColor(source.status)}`}>
                      {getStatusIcon(source.status)}
                      <Badge variant={source.status === "active" ? "default" : "secondary"}>
                        {source.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Source</div>
                      <div className="text-sm">{source.source}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Records</div>
                      <div className="text-sm font-mono">{source.recordCount}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Coverage</div>
                      <div className="text-sm">{source.coverage}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                      <div className="text-sm">{source.lastUpdated}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download {source.format}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Methodology</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {methodology.map((item, index) => (
                <Card key={item.step} className="relative">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {item.step}
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                  {index < methodology.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Statement */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Commitment to Transparency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  All data used in this report comes from public sources and is subject to public records laws. 
                  We are committed to providing accurate, up-to-date information while protecting individual privacy.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <CheckCircle className="w-8 h-8 text-chart-5 mx-auto mb-2" />
                    <div className="font-semibold">Public Data Only</div>
                    <div className="text-sm text-muted-foreground">All sources are publicly available</div>
                  </div>
                  <div className="text-center p-4">
                    <Database className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-semibold">Regular Updates</div>
                    <div className="text-sm text-muted-foreground">Monthly data refreshes</div>
                  </div>
                  <div className="text-center p-4">
                    <ExternalLink className="w-8 h-8 text-accent mx-auto mb-2" />
                    <div className="font-semibold">Open Source</div>
                    <div className="text-sm text-muted-foreground">Methodology is fully documented</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataSources;