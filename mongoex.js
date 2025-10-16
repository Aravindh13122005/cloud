import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose.connect("mongodb+srv://aravindhb169:sg0knoHcz0WMtnm8@cluster1.1u5i9xm.mongodb.net/hostel?retryWrites=true&w=majority")
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log("MongoDB connection error:",err));
// Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});
const User = mongoose.model("user", userSchema);
// Serve main page
app.get("/", async (req, res) => {
    const users = await User.find();
    let tableRows = "";
    users.forEach(u => {
        tableRows += `
        <tr>
            <td>${u.name}</td>
            <td>${u.age}</td>
            <td><a href="/edit/${u._id}">Update</a></td>
            <td><a href="/delete/${u._id}">Delete</a></td>
        </tr>`;
    });
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shopping Cart</title>
    </head>
    <body>
        <h2>Add User</h2>
        <form action="/submit" method="POST">
            <label for="name">Name:</label>
            <input type="text" name="name" required>
            <label for="age">Age:</label>
            <input type="number" name="age" required>
            <button type="submit">Submit</button>
        </form>
        <h2>All Users</h2>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            ${tableRows}
        </table>
    </body>
    </html>
    `);
});
// CREATE
app.post("/submit", async (req, res) => {
    const { name, age } = req.body;
    if(!name || !age) return res.send("Name and age are required");
    const newUser = new User({ name, age });
    await newUser.save();
    res.redirect("/");
});
// UPDATE - show form
app.get("/edit/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(`
        <h2>Edit User</h2>
        <form action="/edit/${user._id}" method="POST">
            Name: <input type="text" name="name" value="${user.name}"><br>
            Age: <input type="number" name="age" value="${user.age}"><br>
            <button type="submit">Update</button>
        </form>
        <a href="/">Back</a>
    `);
});
// UPDATE - handle form
app.post("/edit/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { name: req.body.name, age: req.body.age });
    res.redirect("/");
});

// DELETE
app.get("/delete/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/");
});
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));