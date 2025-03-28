
<?php
// Database connection parameters
$servername = "localhost";
$username = "root";  // Default XAMPP username
$password = "";      // Default XAMPP password (empty)
$database = "education_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to get all students
function getAllStudents($conn) {
    $sql = "SELECT * FROM students";
    $result = $conn->query($sql);
    
    $students = array();
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $students[] = $row;
        }
    }
    
    return $students;
}

// Function to mark attendance
function markAttendance($conn, $studentId, $classId, $date, $status) {
    $sql = "INSERT INTO attendance (student_id, class_id, date, status) 
            VALUES (?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiss", $studentId, $classId, $date, $status);
    
    if ($stmt->execute()) {
        return true;
    } else {
        return false;
    }
}

// Sample SQL to create tables
/*
CREATE TABLE students (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    roll VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    semester VARCHAR(10) NOT NULL,
    program VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE classes (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(20) NOT NULL,
    semester VARCHAR(10) NOT NULL,
    program VARCHAR(50) NOT NULL
);

CREATE TABLE attendance (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    student_id INT(11) NOT NULL,
    class_id INT(11) NOT NULL,
    date DATE NOT NULL,
    status ENUM('present', 'absent') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);
*/
?>
