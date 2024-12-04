const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data storage
let posts = [
    { username: "User1", content: "Hello, WestWave!" },
    { username: "User2", content: "Just joined this cool platform!" },
];

// Serve the frontend
app.use(express.static("public"));

// API routes
app.get("/api/posts", (req, res) => {
    res.json(posts);
});

app.post("/api/posts", (req, res) => {
    const { content } = req.body;
    if (content) {
        const newPost = { username: "Anonymous", content };
        posts.push(newPost);
        res.status(201).json(newPost);
    } else {
        res.status(400).json({ error: "Content is required" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
