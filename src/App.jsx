import React from 'react';
import { decode } from 'html-entities';
import './index.css';
import Start from "./components/Start";
import Question from './components/Question';

function App() {
  const [questions, setQuestions] = React.useState([]);
  const [gameStart, setGameStart] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);


  function shuffleArray(array) {
    array.forEach((_, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    });
    return array;
  }

  React.useEffect(() => {
    if (gameStart) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => {
          const decodedQuestions = data.results.map((question,index) => ({
            ...question,
            questionIndex: index,
            question: decode(question.question),
            correct_answer: decode(question.correct_answer),
            shuffledAnswers: shuffleArray([...question.incorrect_answers.map(answer => decode(answer)), decode(question.correct_answer)]),
            selectedAnswer: "",
            isCorrect: false
          }));
          setQuestions(decodedQuestions);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [gameStart]);

  function StartGame() {
    setGameStart(true);
  }

  function handleChange(event, questionIndex) {
    const { name, value } = event.target;
    setQuestions((oldQuestions) => {
      return oldQuestions.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            [name]: value
          };
        }
        return question;
      });
    });
  }

  function checkAnswers(event) {
    event.preventDefault();
    setQuestions((oldQuestions) => {
      return oldQuestions.map((question) => {
        return {
          ...question,
          isCorrect: question.selectedAnswer === question.correct_answer
        };
      });
    });
    setShowResults(true);
  }

  function playAgain(){
    setShowResults(false)
    setGameStart(false)
  }

  const correctQuestions = questions.filter(question => {
    return question.isCorrect
  })

  const scoreText = `You scored ${correctQuestions.length}/5 correct answers`



  const questionsArray = questions.map((question) => (
    <Question
      key={question.questionIndex}
      questionIndex={question.questionIndex}
      handleChange={(event) => handleChange(event, question.questionIndex)}
      checkAnswers={(event) => checkAnswers(event)}
      question={question.question}
      answers={question.shuffledAnswers}
      selectedAnswer={question.selectedAnswer}
      isCorrect={question.isCorrect}
      showResults={showResults}
      correctAnswer={question.correct_answer}
    />
  ));

  return (
    <div className='App'>
      {!gameStart && <Start handleClick={StartGame} />}
      {gameStart && questionsArray}
      {showResults && <div className='play-again-container'>
        <p className='score-text'>{scoreText}</p>
        <button onClick={playAgain} className='play-again-button'>Play again</button>
      </div>}
    </div>
  );
}

export default App;
