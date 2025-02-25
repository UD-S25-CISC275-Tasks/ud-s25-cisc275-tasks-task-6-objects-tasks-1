import React from "react";
import "./App.css";
import {
    createQuiz,
    updateDifficulty,
    addQuestion,
    createStudent,
    addScore,
    calculateAverage,
    createStudentRecord,
} from "./objects";

function App() {
    console.log(
        "Created Quiz:",
        createQuiz(
            "JavaScript Basics",
            ["What is a closure?", "What is 'this'?"],
            "medium",
        ),
    );

    console.log(
        "Updated Quiz Difficulty:",
        updateDifficulty(
            createQuiz(
                "JavaScript Basics",
                ["What is a closure?", "What is 'this'?"],
                "medium",
            ),
            "hard",
        ),
    );

    console.log(
        "Quiz with New Question:",
        addQuestion(
            createQuiz(
                "JavaScript Basics",
                ["What is a closure?", "What is 'this'?"],
                "medium",
            ),
            "Explain event delegation.",
        ),
    );

    console.log(
        "Created Student:",
        createStudent("001", "Daniah", [85, 90, 78]),
    );

    console.log(
        "Student with New Score:",
        addScore(createStudent("001", "Daniah", [85, 90, 78]), 95),
    );

    console.log(
        "Student Average Score:",
        calculateAverage(createStudent("001", "Daniah", [85, 90, 78])),
    );

    console.log(
        "Student Record:",
        createStudentRecord([
            createStudent("001", "Daniah", [85, 90, 78]),
            createStudent("002", "Kejae", [88, 92, 80]),
        ]),
    );

    return (
        <div className="App">
            <header className="App-header">
                CISC275 - Task 6 - Objects in TypeScript
            </header>
            <p>Check the console for function outputs.</p>
        </div>
    );
}

export default App;
