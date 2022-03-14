import React, { useState } from "react";

export default function AddComment({ comments, user }) {
  const [userInput, setUserInput] = useState("");

  function handleClick() {
    if (user.loggedIn) {
      comments.push({
        author: { "en-US": user },
        content: { "en-US": userInput },
        created_at: { "en-US": new Date() },
        id: { "en-US": user.id },
      });
    }

    console.log(comments);
  }

  return (
    <div className="userAddComment">
      <textarea
        cols="30"
        rows="10"
        style={{ resize: "none" }}
        placeholder="Neuen Kommentar schreiben"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></textarea>
      <input type="button" value="Posten" onClick={() => handleClick()} />
    </div>
  );
}
