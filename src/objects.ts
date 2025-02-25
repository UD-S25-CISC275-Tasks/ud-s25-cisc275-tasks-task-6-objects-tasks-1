import { Question, QuestionType } from "./interfaces/question";
export function createQuiz(
    title: string,
    questions: string[],
    difficulty: string,
): { title: string; questions: string[]; difficulty: string } {
    return { title, questions, difficulty };
}

export function updateDifficulty(
    quiz: { title: string; questions: string[]; difficulty: string },
    newDifficulty: string,
) {
    return { ...quiz, difficulty: newDifficulty };
}

export function addQuestion(
    quiz: { title: string; questions: string[]; difficulty: string },
    newQuestion: string,
) {
    return { ...quiz, questions: [...quiz.questions, newQuestion] };
}

export function createStudent(
    id: string,
    name: string,
    scores: number[],
): { id: string; name: string; scores: number[] } {
    return { id, name, scores };
}

export function addScore(
    student: { id: string; name: string; scores: number[] },
    newScore: number,
) {
    return { ...student, scores: [...student.scores, newScore] };
}

export function calculateAverage(student: {
    id: string;
    name: string;
    scores: number[];
}) {
    const total = student.scores.reduce((sum, score) => sum + score, 0);
    return student.scores.length > 0 ? total / student.scores.length : 0;
}

export function createStudentRecord(
    students: { id: string; name: string; scores: number[] }[],
): Record<string, { id: string; name: string; scores: number[] }> {
    return Object.fromEntries(students.map((student) => [student.id, student]));
}

export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType,
): Question {
    return {
        id,
        name,
        type,
        body: "",
        expected: "",
        options: [],
        points: 1,
        published: false,
    };
}

/**
 * Check if the provided `answer` is correct.
 * The `answer` must match `expected`, ignoring case and extra spaces.
 */
export function isCorrect(question: Question, answer: string): boolean {
    return (
        question.expected.trim().toLowerCase() === answer.trim().toLowerCase()
    );
}

/**
 * Determine if an answer is valid:
 * - Any answer is valid for a `short_answer_question`.
 * - The answer must be one of the options for a `multiple_choice_question`.
 */
export function isValid(question: Question, answer: string): boolean {
    return question.type === "short_answer_question" ?
            true
        :   question.options.includes(answer);
}

/**
 * Convert a question into a short form: `"id: first 10 chars of name"`
 */
export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.substring(0, 10)}`;
}

/**
 * Convert a question into a Markdown-like format.
 */
export function toMarkdown(question: Question): string {
    let markdown = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        markdown += `\n${question.options.map((option) => `- ${option}`).join("\n")}`;
    }
    return markdown;
}

/**
 * Return a new question with a modified name.
 */
export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName };
}

/**
 * Toggle the `published` status of a question.
 */
export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published };
}

/**
 * Duplicate a question, setting the name as `"Copy of ORIGINAL NAME"` and `published` to `false`.
 */
export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return {
        ...oldQuestion,
        id,
        name: `Copy of ${oldQuestion.name}`,
        published: false,
    };
}

/**
 * Add a new option to the `options` list while maintaining immutability.
 */
export function addOption(question: Question, newOption: string): Question {
    return { ...question, options: [...question.options, newOption] };
}

/**
 * Merge two questions: `contentQuestion` provides content, `points` comes from the second argument.
 * The new question is unpublished.
 */
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number },
): Question {
    return { ...contentQuestion, id, name, points, published: false };
}
