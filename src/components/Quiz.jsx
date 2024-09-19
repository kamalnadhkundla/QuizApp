import {useState, useCallback} from  'react';
import questions from '../questions.js';
import QuestionTimer from './QuestionTimer.jsx';
import quizCompleteImg from "../assets/quiz-complete.png";
export default function Quiz(){
   
    const[answerState, setAnswerState]  = useState('');
    
    const[userAnswers,setUserAnswers]=useState([]);
    const activeQuestionIndex= answerState===''?userAnswers.length:userAnswers.length-1;
    const quizIsComplete=activeQuestionIndex===questions.length;
    if(quizIsComplete){
        return <div id="summary">
            <img src={quizCompleteImg} alt="trophy"/>
            <h2> Quiz Is Completed</h2>
             </div>
    }
    const shuffledAnswers=[...questions[activeQuestionIndex].answers];
    shuffledAnswers.sort(()=>Math.random()- 0.5);

const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
    setAnswerState('answered');
setUserAnswers((prevUserAnswers)=>{
    
    return [...prevUserAnswers,selectedAnswer];
});
setTimeout(()=>{
   if(selectedAnswer=== questions[activeQuestionIndex].answers[0])
   {
    setAnswerState('Correct');
   }
   else
       setAnswerState('Wrong');
    setTimeout(()=>{
    
    },2000)
},1000)
},[activeQuestionIndex]);

const handleSkipAnswer = useCallback(()=> handleSelectAnswer(null),[handleSelectAnswer]);


    return (
        <div id="quiz">
    <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeout={handleSkipAnswer} />
        <h2>
    {questions[activeQuestionIndex].text}
</h2>
<ul id="answers">
    {shuffledAnswers.map((answer)=>{
        const isSelected=userAnswers[userAnswers.length-1]=== answer;
        let cssClasses='';
        if(answerState==='answered' && isSelected)
        {
            cssClasses='selected';
        }

        if((answerState==='correct' ||answerState==='wrong' ) && isSelected){
            cssClasses=answerState;
        }
return  <li key={answer} className='answer'>
  <button onClick={()=>handleSelectAnswer(answer)} className={cssClasses}>{answer}</button>
</li>
    }
  )}
</ul>
        </div> </div>
    );
}