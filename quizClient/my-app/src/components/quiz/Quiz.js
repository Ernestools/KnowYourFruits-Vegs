import QuizService from '../../services/QuizService';
import { properties } from '../../properties';
import { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentChoices, setCurrentChoices] = useState([]);

    useEffect(() => {
        const initializeQuiz = async () => {
            const quizService = await QuizService.getInstance();
            var fetchedQuestions = await quizService.getAllQuestions();
            const fetchedAnswers = await quizService.getAllChoices();
            fetchedQuestions = fetchedQuestions.slice(0,5);
            setQuestions(fetchedQuestions);
            setAnswers(fetchedAnswers);

            if (fetchedQuestions.length > 0) {
                const firstQuestion = fetchedQuestions[0];
                const userChoices = quizService.getAnswersExcept(firstQuestion.label, 2);
                userChoices.push(fetchedAnswers[firstQuestion.label]);
                setCurrentChoices(shuffleArray(userChoices));
            }
        };
        initializeQuiz();
    }, []);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const nextQuestion = async () => {
        if (selectedAnswer !== null) {
            const currentQuestion = questions[currentQuestionIndex];
            const correctAnswer = answers[currentQuestion.label];

            if (selectedAnswer === correctAnswer) {
                setScore(score + 1);
            }

            setSelectedAnswer(null);
            if (currentQuestionIndex < questions.length - 1) {
                const quizService = await QuizService.getInstance();
                const nextIndex = currentQuestionIndex + 1;
                const nextQuestion = questions[nextIndex];
                const userChoices = quizService .getAnswersExcept(nextQuestion.label, 2);
                
                userChoices.push(answers[nextQuestion.label]);
                setCurrentChoices(shuffleArray(userChoices));
                setCurrentQuestionIndex(nextIndex);
            } else {
                alert(`Quiz complete! Your score: ${score + 1}/${questions.length}`);
            }
        } else {
            alert("Please select an answer before proceeding.");
        }
    };

    const handleChoice = (event) => {
        setSelectedAnswer(event.target.value);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="quiz">
            <Question
                question={questions[currentQuestionIndex]}
                choices={currentChoices}
                onChoice={handleChoice}
                selectedAnswer={selectedAnswer}
            />
            <button onClick={nextQuestion}>Next Question</button>
        </div>
    );
};

function Question({ question, choices, onChoice, selectedAnswer }) {
    const resolveImagePath = (imageUrl) => properties.ServerBasePath+'/'+question.imageUrl

    return (
        <div className="question">
            <div className='imageContainer'>
                <img src={resolveImagePath(question.imageUrl)} alt={`Question ${question.id}`} />
            </div>
            <div className="choices">
                {choices.map((choice, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`choice-${index}`}
                            name="choice"
                            value={choice}
                            onChange={onChoice}
                            checked={selectedAnswer === choice}
                        />
                        <label htmlFor={`choice-${index}`}>{choice}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Quiz;
