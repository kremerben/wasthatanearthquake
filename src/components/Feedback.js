import React from "react";

export function Feedback(props) {
  let feedbackText;
  if (props.is_loading) {
    feedbackText = "Calculating";
  } else {
    feedbackText = props.value
      ? "Oh! That might have been something!"
      : "It was probably nothing.";
  }
  return (
    <div className={"feedback"} id={"feel"}>
      <h1> {feedbackText} </h1>
    </div>
  );
}
