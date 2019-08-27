import React from "react";

export function Feedback(props) {

    let feedbackText;
    if (!props.value) {
        feedbackText = "Oh! That might have been something!";
    } else {
        feedbackText = "It was probably nothing.";
    }

  return (
    <div className="feedback" id={"feel"} >
        <h1> {feedbackText} </h1>
    </div>
  );
}
