import React from "react";

export default function Question(props) {
  return (
    <div className="question-container">
      <h3 className="question">{props.question}</h3>
        <form className="answer-container" onSubmit={props.checkAnswers}>
          {props.answers.map((answer, index) => {
            const inputId = `answer-${props.questionIndex}-${index}`;
            const isSelected = props.selectedAnswer === answer;
            const isCorrect = props.showResults && answer === props.correctAnswer;
            const isIncorrect = props.showResults && isSelected && (answer !== props.correctAnswer);
            const className = `answer-label ${isSelected? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`;

            return (
              <div key={index}>
                <label className={className} htmlFor={inputId}>
                  <input
                    id={inputId}
                    onChange={props.handleChange}
                    value={answer}
                    checked={isSelected}
                    name={`selectedAnswer`}
                    type="radio"
                  />
                  {answer}
                </label>
              </div>
            );
          })}
        </form>
      <hr className="question-line"></hr>
    </div>
  );
}
