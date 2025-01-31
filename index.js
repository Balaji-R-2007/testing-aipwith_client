// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const studentsData = require('./data.json'); 

app.use(express.json());

// const studentsData = JSON.parse(fs.readFileSync('data.json'));

app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    if (typeof threshold !== 'number' || threshold <= 0) {
        return res.status(400).json({ error: "Invalid threshold value. It must be a positive number." });
    }
    const filteredStudents = studentsData.filter(student => student.total > threshold);
    if (filteredStudents.length === 0) {
        return res.json({
            count: 0,
            students: []
        });
    }
    const response = {
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total
        }))
    };
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});