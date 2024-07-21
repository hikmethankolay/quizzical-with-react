import React from "react";


export default function Start(props){
    return(
        <div className="start-menu-container">
            <h1 className="title">Quizzical</h1>
            <p className="desc">There will be 5 questions of multiple choice, be ready to sweat.</p>
            <button onClick={props.handleClick} className="start-button">Start Quiz</button>
        </div>
    )
}