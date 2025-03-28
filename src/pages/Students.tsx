
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash } from "lucide-react";

// Mock student data
const STUDENTS_DATA = [
  { id: 1, roll: "CS2023001", name: "Amit Kumar", semester: "3rd", program: "B.Tech CSE", email: "amit@example.com", attendance: 85 },
  { id: 2, roll: "CS2023002", name: "Priya Singh", semester: "3rd", program: "B.Tech CSE", email: "priya@example.com", attendance: 92 },
  { id: 3, roll: "CS2023003", name: "Rahul Sharma", semester: "3rd", program: "B.Tech CSE", email: "rahul@example.com", attendance: 78 },
  { id: 4, roll: "CS2023004", name: "Neha Patel", semester: "3rd", program: "B.Tech CSE", email: "neha@example.com", attendance: 65 },
  { id: 5, roll: "CS2023005", name: "Vikram Rajput", semester: "3rd", program: "B.Tech CSE", email: "vikram@example.com", attendance: 90 },
  { id: 6, roll: "CS2023006", name: "Anjali Gupta", semester: "3rd", program: "B.Tech CSE", email: "anjali@example.com", attendance: 73 },
  { id: 7, roll: "CS2023007", name: "Raj Malhotra", semester: "3rd", program: "B.Tech CSE", email: "raj@example.com", attendance: 88 },
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All");
  
  // Filter students based on search and semester
  const filteredStudents = STUDENTS_DATA.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.roll.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === "All" || student.semester === selectedSemester;
    return matchesSearch && matchesSemester;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-education-800 mb-4 md:mb-0">Students</h1>
        <Button className="bg-education-600 hover:bg-education-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Student
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Student Filters</CardTitle>
          <CardDescription>Search and filter the student list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or roll number..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-md border border-input bg-background flex-shrink-0 w-full md:w-48"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="All">All Semesters</option>
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
              <option value="3rd">3rd Semester</option>
              <option value="4th">4th Semester</option>
              <option value="5th">5th Semester</option>
              <option value="6th">6th Semester</option>
              <option value="7th">7th Semester</option>
              <option value="8th">8th Semester</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            {filteredStudents.length} students found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Attendance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.roll}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.semester}</TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell className="text-right">
                      <span 
                        className={`inline-block px-2 py-1 rounded-md ${
                          student.attendance >= 75 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;
