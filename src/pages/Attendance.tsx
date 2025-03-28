
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CalendarIcon, 
  Clock, 
  Save, 
  Check, 
  X
} from "lucide-react";

// Mock data
const CLASSES = [
  { id: 1, subject: "Database Systems", semester: "3rd", program: "B.Tech CSE", time: "10:00 AM - 11:30 AM", room: "CS-101" },
  { id: 2, subject: "Web Development", semester: "5th", program: "B.Tech CSE", time: "02:00 PM - 03:30 PM", room: "CS-202" },
  { id: 3, subject: "Data Structures", semester: "3rd", program: "B.Tech CSE", time: "11:30 AM - 01:00 PM", room: "CS-105" },
];

const STUDENTS = [
  { id: 1, roll: "CS2023001", name: "Amit Kumar", semester: "3rd" },
  { id: 2, roll: "CS2023002", name: "Priya Singh", semester: "3rd" },
  { id: 3, roll: "CS2023003", name: "Rahul Sharma", semester: "3rd" },
  { id: 4, roll: "CS2023004", name: "Neha Patel", semester: "3rd" },
  { id: 5, roll: "CS2023005", name: "Vikram Rajput", semester: "3rd" },
  { id: 6, roll: "CS2023006", name: "Anjali Gupta", semester: "3rd" },
  { id: 7, roll: "CS2023007", name: "Raj Malhotra", semester: "3rd" },
];

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  
  // Initialize attendance when a class is selected
  const handleClassSelect = (classId: number) => {
    setSelectedClass(classId);
    
    // Initialize all students as present
    const initialAttendance: Record<number, boolean> = {};
    STUDENTS.forEach(student => {
      initialAttendance[student.id] = true;
    });
    
    setAttendance(initialAttendance);
  };
  
  // Toggle attendance status for a student
  const toggleAttendance = (studentId: number) => {
    setAttendance({
      ...attendance,
      [studentId]: !attendance[studentId]
    });
  };
  
  // Mark all students as present
  const markAllPresent = () => {
    const newAttendance: Record<number, boolean> = {};
    STUDENTS.forEach(student => {
      newAttendance[student.id] = true;
    });
    setAttendance(newAttendance);
  };
  
  // Mark all students as absent
  const markAllAbsent = () => {
    const newAttendance: Record<number, boolean> = {};
    STUDENTS.forEach(student => {
      newAttendance[student.id] = false;
    });
    setAttendance(newAttendance);
  };
  
  // Save attendance (mock function)
  const saveAttendance = () => {
    console.log("Saving attendance for class", selectedClass);
    console.log("Date:", selectedDate);
    console.log("Attendance data:", attendance);
    
    // Here would be the API call to save the attendance data
    
    // Reset form after saving
    setSelectedClass(null);
    setAttendance({});
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-education-800 mb-6">Attendance Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose the date for attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                <span>
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              ) : (
                <span>No date selected</span>
              )}
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Select Class</CardTitle>
              <CardDescription>Choose the class for attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {CLASSES.map((cls) => (
                  <div 
                    key={cls.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:border-education-500 ${
                      selectedClass === cls.id ? 'border-education-500 bg-education-50' : ''
                    }`}
                    onClick={() => handleClassSelect(cls.id)}
                  >
                    <h3 className="font-semibold text-education-800">{cls.subject}</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{cls.time}</span>
                      </div>
                      <p>Semester: {cls.semester} | Room: {cls.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Take Attendance</CardTitle>
                  <CardDescription>
                    {selectedClass 
                      ? `Recording attendance for ${CLASSES.find(c => c.id === selectedClass)?.subject}`
                      : 'Select a class to begin taking attendance'}
                  </CardDescription>
                </div>
                {selectedClass && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={markAllPresent}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Mark All Present
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={markAllAbsent}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Mark All Absent
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!selectedDate && (
                <div className="text-center py-8 text-muted-foreground">
                  Please select a date first
                </div>
              )}
              
              {selectedDate && !selectedClass && (
                <div className="text-center py-8 text-muted-foreground">
                  Please select a class to take attendance
                </div>
              )}
              
              {selectedDate && selectedClass && (
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left">Roll No.</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STUDENTS.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="py-3 px-4">{student.roll}</td>
                          <td className="py-3 px-4">{student.name}</td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center">
                              <Checkbox
                                id={`attendance-${student.id}`}
                                checked={attendance[student.id] ?? true}
                                onCheckedChange={() => toggleAttendance(student.id)}
                              />
                              <label 
                                htmlFor={`attendance-${student.id}`}
                                className={`ml-2 ${
                                  attendance[student.id] !== false 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                                }`}
                              >
                                {attendance[student.id] !== false ? 'Present' : 'Absent'}
                              </label>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
            {selectedDate && selectedClass && (
              <CardFooter>
                <Button 
                  onClick={saveAttendance}
                  className="w-full bg-education-600 hover:bg-education-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Attendance
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
