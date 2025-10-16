const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
let attendance = [];
let idCounter = 1;
app.post('/attendance', (req, res) => {
    const { name, date, status } = req.body;
    const record = {
        id: idCounter++,
        name,
        date,       
        status      
    };
    attendance.push(record);
    res.status(201).json(record);
});
app.get('/attendance', (req, res) => {
    res.json(attendance);
    
});
app.get('/attendance/:id', (req, res) => {
    const record = attendance.find(a => a.id == req.params.id);
    if (record) res.json(record);
    else res.status(404).json({ message: "Record not found" });
});
app.put('/attendance/:id', (req, res) => {
    const record = attendance.find(a => a.id == req.params.id);
    if (record) {
        const { name, date, status } = req.body;
        if (name) record.name = name;
        if (date) record.date = date;
        if (status) record.status = status;
        res.json(record);
    } else {
        res.status(404).json({ message: "Record not found" });
    }
});
app.delete('/attendance/:id', (req, res) => {
    const index = attendance.findIndex(a => a.id == req.params.id);
    if (index !== -1) {
        const deleted = attendance.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ message: "Record not found" });
    }
});
app.get('/',(req,res) => {
    res.send('Attendance Register');
});
app.listen(PORT, () => {
    console.log(`Attendance Register API running at http://localhost:${PORT}`);
});