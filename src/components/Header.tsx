import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Database, BarChart3 } from "lucide-react";

interface HeaderProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const Header = ({ selectedYear, onYearChange }: HeaderProps) => {
  const location = useLocation();
  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">UC Faculty Transparency</h1>
                <p className="text-xs text-muted-foreground">Salary & Teaching Data Report</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                size="sm" 
                asChild
              >
                <Link to="/">Home</Link>
              </Button>
              <Button 
                variant={isActive("/departments") ? "default" : "ghost"} 
                size="sm" 
                asChild
              >
                <Link to="/departments">Departments</Link>
              </Button>
              <Button 
                variant={isActive("/faculty") ? "default" : "ghost"} 
                size="sm" 
                asChild
              >
                <Link to="/faculty">Faculty</Link>
              </Button>
              <Button 
                variant={isActive("/data-sources") ? "default" : "ghost"} 
                size="sm" 
                asChild
              >
                <Link to="/data-sources">Data Sources</Link>
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedYear} onValueChange={onYearChange}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;