
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-education-50">
      <div className="text-center max-w-xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-education-800 mb-4">Education Management System</h1>
        <p className="text-xl text-gray-600 mb-8">Welcome to the teacher dashboard portal. Manage students, attendance, and more.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to="/dashboard">
            <Button className="w-full h-14 bg-education-600 hover:bg-education-700 text-lg">
              Dashboard
            </Button>
          </Link>
          <Link to="/students">
            <Button className="w-full h-14 bg-education-500 hover:bg-education-600 text-lg">
              Students
            </Button>
          </Link>
          <Link to="/attendance">
            <Button className="w-full h-14 bg-education-500 hover:bg-education-600 text-lg">
              Attendance
            </Button>
          </Link>
          <Link to="/reports">
            <Button className="w-full h-14 bg-education-600 hover:bg-education-700 text-lg">
              Reports
            </Button>
          </Link>
        </div>
        
        <p className="text-sm text-gray-500">© 2023 Education Management System. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
