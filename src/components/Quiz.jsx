import { useState, useCallback } from 'react';
import questions from '../questions.js';
import QuestionTimer from './QuestionTimer.jsx';
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex >= questions.length;

    // Check to handle scenarios when activeQuestionIndex is out of the range
    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Quiz complete" />
                <h2>Quiz Is Completed</h2>
            </div>
        );
    }

    // Safely access the current question
    const currentQuestion = questions[activeQuestionIndex];
    // Shuffle answers safely
    const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers(prevUserAnswers => [...prevUserAnswers, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === currentQuestion.answers[0]) {
                setAnswerState('Correct');
            } else {
                setAnswerState('Wrong');
            }
        }, 1000);
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeout={handleSkipAnswer} />
                <h2>{currentQuestion.text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer, index) => (
                        <li key={index} className='answer'>
                            <button onClick={() => handleSelectAnswer(answer)} className={answerState.toLowerCase()}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}