import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const App2 = () => {
  const [pusher, setPusher] = useState(null);
  const [channel, setChannel] = useState(null);

  const subscribeToChannel = () => {
    if (pusher) {
      const channelName = 'room1';
      const channelInstance = pusher.subscribe(channelName);
      channelInstance.bind('event1', data => {
        console.log('Received data:', data);
      });
      setChannel(channelInstance);
    }
  };


  useEffect(() => {
    const pusherInstance = new Pusher('d6574b51b1d1e9d01b5d', {
      cluster: 'mt1',
      encrypted: true
    });
    setPusher(pusherInstance);
    subscribeToChannel()
    return () => {
      if (pusherInstance) {
        pusherInstance.disconnect();
      }
    };
   
  }, []);


  const handleClick = () => {
    if (channel) {
      // Trigger the event
      channel.trigger('client-room1', {
        message: 'Button clicked!'
      });
    }
  };

  return (
    <div>
      <button onClick={subscribeToChannel}>Subscribe to Channel</button>
      <button onClick={handleClick}>Send Event</button>
    </div>
  );
};

export default App2;
