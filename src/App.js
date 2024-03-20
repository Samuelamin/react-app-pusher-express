import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

const App = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [showErr, setShowErr] = useState("");
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const pusher = new Pusher("d6574b51b1d1e9d01b5d", {
      cluster: "mt1",
      encrypted: true,
    });

    const channelInstance = pusher.subscribe("private-my-channel");
    setChannel(channelInstance);
    console.log(channelInstance);
    channelInstance.bind("my-event", (data) => {
      console.log(data);
    });

    return () => {
      pusher.unsubscribe("private-my-channel");
    };
  }, []);
  
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      setShowErr(true);
    } else {
      setShowErr(false);
      channel.trigger("client-my-event", { message: message });
      setMessage("");
    }
  };

  return (
    <div>
      <form className="inputContainer" onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          className="inputElement"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          className="inputElement"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
        <button className="inputBtn" type="submit">
          Send
        </button>
        {showErr && <div className="errorText">Enter your message</div>}
      </form>
    </div>
  );
};

export default App;
