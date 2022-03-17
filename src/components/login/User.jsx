import React, { useEffect, useState } from "react";
import "../../assets/chatStyle.css";
import * as Contentful from "contentful";

export default function User({ user }) {
  const contentful = require("contentful-management");

  const client = contentful.createClient({
    accessToken: "CFPAT-6NyPZHpdeHs_g6un21Wu8WZXLU9pm2PJm-VNCci8Lzs",
  });

  const getClient = Contentful.createClient({
    space: "5o4kejg5nlut",
    accessToken: "IPErBwAcWvsPYzYEBdLbsMibGKstWOFf7yPBwZHWMSo",
    host: "cdn.contentful.com",
  });

  const [users, setUsers] = useState(false);
  const [messages, setMessages] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messageHistory, setMessageHistory] = useState(false);
  const [partnerId, setPartnerId] = useState("");

  async function fetchData() {
    let fetching = await getClient.getEntries({
      content_type: "listOfUsernamens",
    });

    setUsers(fetching.items);
  }

  async function fetchedMessages(id) {
    let fetchedMessages = await getClient.getEntries({
      content_type: "messages",
      "fields.ids[in]": id,
    });
    setMessages(fetchedMessages.items);
  }

  function handleSendMessage() {
    let currentDate = new Date();
    let entryId;

    let messagesCopy;

    if (
      messages.length > 0 &&
      messages.map((el) => JSON.stringify(el))[0].includes(partnerId)
    ) {
      messagesCopy = messages.find((chat) =>
        chat.fields.ids.includes(partnerId)
      ).fields.chatHistory;
      entryId = messages.find((obj) =>
        obj.fields.ids.includes(partnerId && user.id)
      ).sys.id;
    }

    if (messagesCopy.length > 0) {
      messagesCopy.reverse().push({
        content: userInput,
        from: user.id,
        timeStamp: currentDate.getHours() + ":" + currentDate.getMinutes(),
      });
    } else {
      messagesCopy = [
        {
          content: userInput,
          from: user.id,
          timeStamp: currentDate.getHours() + ":" + currentDate.getMinutes(),
        },
      ];
    }

    if (
      messages.length > 0 &&
      messages.map((el) => JSON.stringify(el))[0].includes(partnerId)
    ) {
      client
        .getSpace("5o4kejg5nlut")
        .then((space) => space.getEnvironment("master"))
        .then((environment) => environment.getEntry(entryId))
        .then((entry) => {
          entry.fields.chatHistory = { "en-US": messagesCopy };
          return entry.update();
        })
        .then((entry) => entry.publish())
        .catch((err) => console.error("upload Comment", err));
    } else {
      client
        .getSpace("5o4kejg5nlut")
        .then((space) => space.getEnvironment("master"))
        .then((environment) =>
          environment.createEntry("messages", {
            fields: {
              chat: { "en-US": "chat" },
              ids: { "en-US": [user.id, partnerId] },
              chatHistory: { "en-US": messagesCopy },
            },
          })
        )
        .then((entry) => entry.publish());
    }

    setTimeout(() => {
      fetchData();
      fetchedMessages(user.id);
      handleContactClick(partnerId);
    }, 2000);

    setUserInput("");
  }

  function handleContactClick(contactId) {
    setPartnerId(contactId);

    if (
      messages.length > 0 &&
      messages.map((el) => JSON.stringify(el))[0].includes(contactId)
    ) {
      let messagesToDisplay = messages.find((chat) =>
        chat.fields.ids.includes(contactId)
      );

      setMessageHistory(
        messagesToDisplay.fields.chatHistory.reverse().map((message, index) =>
          message.from === user.id ? (
            <div className="outgoingMessage" key={index}>
              <p className="message">{message.content}</p>
              <p className="timeStamp">{message.timeStamp}</p>
            </div>
          ) : (
            <div className="incomingMessage" key={index}>
              <p className="message">{message.content}</p>
              <p className="timeStamp">{message.timeStamp}</p>
            </div>
          )
        )
      );
    } else {
      setMessageHistory(<></>);
    }
  }

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      fetchedMessages();
    }, 2500);
  }, []);

  console.log("USERS", users);
  console.log("MESSAGES", messages);

  return (
    <div className="chatMainDiv">
      <div className="contactsDiv">
        {users &&
          users.map((user) => (
            <div
              key={user.fields.userId}
              className="contact"
              style={{ backgroundColor: null }}
              onClick={() => handleContactClick(user.fields.userId)}
            >
              {user.fields.userName}
            </div>
          ))}
      </div>

      <div className="chatHistory">
        <div className="prevMessages">{messageHistory}</div>

        <div className="chatUserInputDiv">
          <textarea
            className="chatUserInput"
            placeholder="Neue Nachricht schreiben!"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          ></textarea>
          <input
            type="button"
            value="Senden"
            className="chatUserSendBtn"
            onClick={() => handleSendMessage()}
          />
        </div>
      </div>
    </div>
  );
}
