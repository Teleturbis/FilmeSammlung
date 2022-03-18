import React, { useEffect, useState } from "react";

export default function AddComment({ comments, user, entryId }) {
  const [userInput, setUserInput] = useState("");
  const [commentsArr, setCommentsArr] = useState(false);
  const [commentsSection, setCommentsSection] = useState(false);

  let commentsCopy = comments;

  const today = new Date();
  const contentful = require("contentful-management");
  const client = contentful.createClient({
    accessToken: "CFPAT-6NyPZHpdeHs_g6un21Wu8WZXLU9pm2PJm-VNCci8Lzs",
  });

  useEffect(() => setCommentsArr(comments), []);

  function handleClick() {
    if (user.loggedIn) {
      commentsCopy.push({
        author: user.userName,
        content: userInput,
        created_at:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          "T" +
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds(),
        id: user.id,
      });
      client
        .getSpace("5o4kejg5nlut")
        .then((space) => space.getEnvironment("master"))
        .then((environment) => environment.getEntry(entryId))
        .then((entry) => {
          entry.fields.comments = { "en-US": commentsCopy };
          return entry.update();
        })
        .then((entry) => entry.publish())
        .catch((err) => console.error("upload Comment", err));

      setCommentsArr([commentsCopy, ...commentsArr]);
      setUserInput("");
    } else {
      window.alert("Bitte logge dich ein!");
    }
  }

  useEffect(() => {
    if (true) {
      setCommentsSection(
        comments.map((comment, index) => (
          <div key={index} className="commentDiv">
            <div className="commentHeader">
              <p className="commentAuthor">{comment.author}</p>
              <p className="commentDate">{comment.created_at.toString()}</p>
            </div>
            {comment.content.split("\n").map((str, index) => (
              <p key={index} className="commentParagraph">
                {str}
              </p>
            ))}
          </div>
        ))
      );
    }
  }, [commentsArr]);

  return (
    <div>
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
      {commentsSection}
    </div>
  );
}
