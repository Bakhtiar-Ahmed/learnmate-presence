
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data for the dashboard
  const attendanceData = [
    { name: 'Present', value: 75, color: '#22c55e' },
    { name: 'Absent', value: 25, color: '#ef4444' },
  ];

  const upcomingClasses = [
    { id: 1, subject: "Database Systems", date: "2023-06-10", time: "10:00 AM", room: "CS-101" },
    { id: 2, subject: "Web Development", date: "2023-06-11", time: "02:00 PM", room: "CS-202" },
    { id: 3, subject: "Data Structures", date: "2023-06-12", time: "11:30 AM", room: "CS-105" },
  ];

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-education-800 mb-6">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-education-700">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-education-800">128</p>
          </CardContent>
          <CardFooter>
            <Link to="/students" className="text-education-600 hover:text-education-800">View all students →</Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-education-700">Classes This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-education-800">24</p>
          </CardContent>
          <CardFooter>
            <Link to="/schedule" className="text-education-600 hover:text-education-800">View schedule →</Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-education-700">Students at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-education-800">15</p>
          </CardContent>
          <CardFooter>
            <Link to="/reports" className="text-education-600 hover:text-education-800">View reports →</Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-education-700">Upcoming Classes</CardTitle>
            <CardDescription>Classes scheduled for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
                  <div>
                    <h3 className="font-semibold text-education-800">{cls.subject}</h3>
                    <p className="text-sm text-gray-500">{cls.date} at {cls.time}</p>
                  </div>
                  <div className="text-sm bg-education-100 text-education-800 py-1 px-3 rounded">
                    Room {cls.room}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/schedule" className="text-education-600 hover:text-education-800">Manage schedule →</Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-education-700">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-education-700">Attendance Overview</CardTitle>
            <CardDescription>All classes this semester</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-education-700">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/attendance/new" className="bg-education-600 hover:bg-education-700 text-white py-3 px-4 rounded-lg text-center">
                Take Attendance
              </Link>
              <Link to="/students/add" className="bg-education-500 hover:bg-education-600 text-white py-3 px-4 rounded-lg text-center">
                Add Students
              </Link>
              <Link to="/schedule/new" className="bg-education-500 hover:bg-education-600 text-white py-3 px-4 rounded-lg text-center">
                Schedule Class
              </Link>
              <Link to="/reports/generate" className="bg-education-600 hover:bg-education-700 text-white py-3 px-4 rounded-lg text-center">
                Generate Reports
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
