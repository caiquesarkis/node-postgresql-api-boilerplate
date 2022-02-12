const express = require("express");
const cors = require("cors")
const app = express();
const pool = require("./db")

// Middleware
app.use(cors());
app.use(express.json());


// Routes

// Create a quiz

app.post("/quizes", async (req, res)=>{
    try {
        const { question, alternatives, answer_id } = req.body
        const newQuiz = await pool.query("INSERT INTO quizes (question, alternatives, answer_id) VALUES ($1, $2, $3) RETURNING * ", [question, alternatives, answer_id])
        res.json(newQuiz.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

// Get all quizes

app.get("/quizes", async (req,res)=>{
    try {
        
        const allQuizes = await pool.query("SELECT * FROM quizes")
        res.json(allQuizes.rows)

    } catch (err) {
        console.error(err.message)
    }
})

// Get a quiz

app.get("/quizes/:id", async(req, res)=>{
    try {
        const { id } = req.params;
        const quiz = await pool.query("SELECT * FROM quizes WHERE quiz_id = $1",[id])

        res.json(quiz.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

// Update a quiz

app.put("/quizes/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const { question } = req.body;

        const updateQuiz = await pool.query("UPDATE quizes SET question = $1 WHERE quiz_id = $2 ", [question, id])
        res.json("Quiz was updated!")
    } catch (err) {
        console.error(err.message)
    }
})

// Delete a quiz

app.delete("/quizes/:id", async (req, res)=>{
    try {
        
        const { id } = req.params;
        const deleteQuiz = await pool.query("DELETE FROM quizes WHERE quiz_id = $1", [id])
        res.json("Quiz was deleted!")

    } catch (err) {
        console.error(err.message)
    }
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
})
