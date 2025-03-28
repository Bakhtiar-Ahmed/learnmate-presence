
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Download, FileText, Filter, AlertCircle } from "lucide-react";

// Mock attendance data
const STUDENTS_ATTENDANCE = [
  { id: 1, roll: "CS2023001", name: "Amit Kumar", attendance: 85, classes: 34, present: 29, absent: 5, status: "Regular" },
  { id: 2, roll: "CS2023002", name: "Priya Singh", attendance: 92, classes: 34, present: 31, absent: 3, status: "Regular" },
  { id: 3, roll: "CS2023003", name: "Rahul Sharma", attendance: 78, classes: 34, present: 27, absent: 7, status: "Regular" },
  { id: 4, roll: "CS2023004", name: "Neha Patel", attendance: 65, classes: 34, present: 22, absent: 12, status: "DC" },
  { id: 5, roll: "CS2023005", name: "Vikram Rajput", attendance: 90, classes: 34, present: 30, absent: 4, status: "Regular" },
  { id: 6, roll: "CS2023006", name: "Anjali Gupta", attendance: 73, classes: 34, present: 25, absent: 9, status: "Regular" },
  { id: 7, roll: "CS2023007", name: "Raj Malhotra", attendance: 88, classes: 34, present: 30, absent: 4, status: "Regular" },
  { id: 8, roll: "CS2023008", name: "Sunita Verma", attendance: 55, classes: 34, present: 19, absent: 15, status: "NC" },
  { id: 9, roll: "CS2023009", name: "Deepak Joshi", attendance: 70, classes: 34, present: 24, absent: 10, status: "Regular" },
  { id: 10, roll: "CS2023010", name: "Kavita Singh", attendance: 60, classes: 34, present: 20, absent: 14, status: "DC" },
];

// Bar chart data
const attendanceDistribution = [
  { range: "90-100%", count: 2, color: "#22c55e" },
  { range: "80-89%", count: 3, color: "#84cc16" },
  { range: "70-79%", count: 2, color: "#eab308" },
  { range: "60-69%", count: 2, color: "#f97316" },
  { range: "Below 60%", count: 1, color: "#ef4444" },
];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<"attendance" | "nc-dc">("attendance");
  const [selectedSemester, setSelectedSemester] = useState("All");
  
  // Filter students based on semester
  const filteredStudents = STUDENTS_ATTENDANCE.filter((student) => {
    return selectedSemester === "All" || student.roll.includes(selectedSemester);
  });
  
  // NC/DC lists
  const ncList = STUDENTS_ATTENDANCE.filter(student => student.status === "NC");
  const dcList = STUDENTS_ATTENDANCE.filter(student => student.status === "DC");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-education-800 mb-6">Attendance Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card 
          className={`cursor-pointer hover:shadow-md transition ${
            selectedReport === "attendance" ? "border-2 border-education-500" : ""
          }`}
          onClick={() => setSelectedReport("attendance")}
        >
          <CardHeader>
            <CardTitle>Attendance Report</CardTitle>
            <CardDescription>Overall attendance statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <FileText className="h-16 w-16 text-education-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer hover:shadow-md transition ${
            selectedReport === "nc-dc" ? "border-2 border-education-500" : ""
          }`}
          onClick={() => setSelectedReport("nc-dc")}
        >
          <CardHeader>
            <CardTitle>NC/DC Report</CardTitle>
            <CardDescription>Students with attendance shortage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <AlertCircle className="h-16 w-16 text-education-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {selectedReport === "attendance" ? (
        <>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Attendance Statistics</CardTitle>
                  <CardDescription>Overall attendance distribution</CardDescription>
                </div>
                <select
                  className="px-3 py-2 rounded-md border border-input bg-background"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="All">All Semesters</option>
                  <option value="2023">3rd Semester</option>
                  <option value="2022">5th Semester</option>
                  <option value="2021">7th Semester</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={attendanceDistribution}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Students" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Student Attendance List</CardTitle>
                  <CardDescription>
                    {filteredStudents.length} students found
                  </CardDescription>
                </div>
                <Button className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-center">Classes Held</TableHead>
                      <TableHead className="text-center">Present</TableHead>
                      <TableHead className="text-center">Absent</TableHead>
                      <TableHead className="text-right">Attendance %</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.roll}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className="text-center">{student.classes}</TableCell>
                        <TableCell className="text-center">{student.present}</TableCell>
                        <TableCell className="text-center">{student.absent}</TableCell>
                        <TableCell className="text-right">
                          <span 
                            className={`inline-block px-2 py-1 rounded-md ${
                              student.attendance >= 75 
                                ? 'bg-green-100 text-green-800' 
                                : student.attendance >= 65
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {student.attendance}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span 
                            className={`inline-block px-2 py-1 rounded-md ${
                              student.status === "Regular" 
                                ? 'bg-green-100 text-green-800' 
                                : student.status === "DC"
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {student.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="bg-red-50 border-b">
              <CardTitle className="text-red-800 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                No Credit (NC) List
              </CardTitle>
              <CardDescription>
                Students with less than 60% attendance
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {ncList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No students in NC list
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Attendance %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ncList.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.roll}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-right">
                            <span className="inline-block px-2 py-1 rounded-md bg-red-100 text-red-800">
                              {student.attendance}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="flex items-center w-full">
                <Download className="h-4 w-4 mr-2" />
                Download NC List
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="bg-yellow-50 border-b">
              <CardTitle className="text-yellow-800 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Detained from Course (DC) List
              </CardTitle>
              <CardDescription>
                Students with 60-75% attendance
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {dcList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No students in DC list
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Attendance %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dcList.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.roll}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-right">
                            <span className="inline-block px-2 py-1 rounded-md bg-yellow-100 text-yellow-800">
                              {student.attendance}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="flex items-center w-full">
                <Download className="h-4 w-4 mr-2" />
                Download DC List
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;
