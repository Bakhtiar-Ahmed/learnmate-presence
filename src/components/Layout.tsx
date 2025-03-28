
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  CheckSquare, 
  FileText, 
  Home, 
  LogOut,
  Menu,
  X
} from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { path: "/students", label: "Students", icon: <Users className="h-5 w-5" /> },
    { path: "/attendance", label: "Attendance", icon: <CheckSquare className="h-5 w-5" /> },
    { path: "/schedule", label: "Schedule", icon: <Calendar className="h-5 w-5" /> },
    { path: "/reports", label: "Reports", icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-education-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-education-500 text-white">
        <div className="p-4 border-b border-education-600">
          <h1 className="text-2xl font-bold">Class Attendance</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 ${
                    location.pathname === item.path
                      ? "bg-education-600 border-l-4 border-education-300"
                      : "hover:bg-education-400"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-education-600">
          <button className="flex items-center w-full text-education-100 hover:text-white">
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-education-500 text-white z-10 flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Class Attendance</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-education-500 text-white z-10">
          <nav className="py-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 ${
                      location.pathname === item.path
                        ? "bg-education-600 border-l-4 border-education-300"
                        : "hover:bg-education-400"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button className="flex items-center w-full px-4 py-3 text-education-100 hover:text-white hover:bg-education-400">
                  <LogOut className="h-5 w-5" />
                  <span className="ml-3">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto pt-16 md:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
