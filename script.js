const express = require("express");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const socketIO = require("socket.io");

// App setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Setup
mongoose.connect("mongodb://localhost:27017/westwave", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// MongoDB Models
const User = mongoose.model("User", { username: String, email: String, password: String });
const Story = mongoose.model("Story", { username: String, content: String, timestamp: Date });
const Message = mongoose.model("Message", { pool: String, username: String, text: String, timestamp: Date });

// Routes
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("Email already registered.");
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send("User registered successfully!");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) res.status(200).send("Login successful.");
    else res.status(400).send("Invalid credentials.");
});

app.get("/stories", async (req, res) => {
    const stories = await Story.find({ timestamp: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
    res.json(stories);
});

app.get("/messages", async (req, res) => {
    const { pool } = req.query;
    const messages = await Message.find({ pool }).sort({ timestamp: 1 });
    res.json(messages);
});

// Real-Time Chat
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinPool", (pool) => {
        socket.join(pool);
        console.log(`User joined pool: ${pool}`);
    });

    socket.on("sendMessage", async ({ pool, username, text }) => {
        const message = new Message({ pool, username, text, timestamp: new Date() });
        await message.save();
        io.to(pool).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
