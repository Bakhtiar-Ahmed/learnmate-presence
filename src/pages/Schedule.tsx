
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  Users,
  Plus,
  Edit,
  Trash
} from "lucide-react";

// Mock class data
const CLASS_SCHEDULE = [
  { 
    id: 1, 
    subject: "Database Systems", 
    date: "2023-06-10", 
    startTime: "10:00", 
    endTime: "11:30", 
    room: "CS-101",
    semester: "3rd",
    program: "B.Tech CSE"
  },
  { 
    id: 2, 
    subject: "Web Development", 
    date: "2023-06-11", 
    startTime: "14:00", 
    endTime: "15:30", 
    room: "CS-202",
    semester: "5th",
    program: "B.Tech CSE"
  },
  { 
    id: 3, 
    subject: "Data Structures", 
    date: "2023-06-12", 
    startTime: "11:30", 
    endTime: "13:00", 
    room: "CS-105",
    semester: "3rd",
    program: "B.Tech CSE"
  },
  { 
    id: 4, 
    subject: "Computer Networks", 
    date: "2023-06-13", 
    startTime: "09:00", 
    endTime: "10:30", 
    room: "CS-301",
    semester: "5th",
    program: "B.Tech CSE"
  }
];

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    subject: "",
    date: new Date(),
    startTime: "10:00",
    endTime: "11:30",
    room: "",
    semester: "3rd",
    program: "B.Tech CSE"
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Scheduling new class:", formData);
    
    // Here would be the API call to save the class schedule
    
    // Reset form and hide it
    setFormData({
      subject: "",
      date: new Date(),
      startTime: "10:00",
      endTime: "11:30",
      room: "",
      semester: "3rd",
      program: "B.Tech CSE"
    });
    setShowAddForm(false);
  };
  
  // Filter classes for the selected date
  const filteredClasses = CLASS_SCHEDULE.filter(cls => {
    if (!date) return false;
    const classDate = new Date(cls.date);
    return (
      classDate.getDate() === date.getDate() &&
      classDate.getMonth() === date.getMonth() &&
      classDate.getFullYear() === date.getFullYear()
    );
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-education-800 mb-4 md:mb-0">Class Schedule</h1>
        <Button 
          className="bg-education-600 hover:bg-education-700"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Class
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Schedule a New Class</CardTitle>
            <CardDescription>Fill in the details to schedule a new class</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject Name
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter subject name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="room" className="block text-sm font-medium mb-1">
                    Classroom / Lab
                  </label>
                  <Input
                    id="room"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    placeholder="Enter room number"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="semester" className="block text-sm font-medium mb-1">
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background py-2 px-3"
                    required
                  >
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
                
                <div>
                  <label htmlFor="program" className="block text-sm font-medium mb-1">
                    Program
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background py-2 px-3"
                    required
                  >
                    <option value="B.Tech CSE">B.Tech CSE</option>
                    <option value="B.Tech ECE">B.Tech ECE</option>
                    <option value="B.Tech ME">B.Tech ME</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date
                  </label>
                  <div className="border rounded-md p-2">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && setFormData({...formData, date})}
                      className="rounded-md"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-education-600 hover:bg-education-700">
                  Schedule Class
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view classes</CardDescription>
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
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? (
                <span>Classes on {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              ) : (
                <span>Select a date to view classes</span>
              )}
            </CardTitle>
            <CardDescription>
              {filteredClasses.length} classes scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredClasses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No classes scheduled for this date
              </div>
            ) : (
              <div className="space-y-4">
                {filteredClasses.map((cls) => (
                  <div 
                    key={cls.id}
                    className="p-4 border rounded-lg hover:border-education-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-education-800">{cls.subject}</h3>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{cls.startTime} - {cls.endTime}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>Room {cls.room}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{cls.program}, {cls.semester} Semester</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
