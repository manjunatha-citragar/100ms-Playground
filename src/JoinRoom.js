import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NDNmODllNzkxYzAyM2I0ZTJkNzVkMWYiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NDNmOGEwOThhNzkzNzc1YjBmMmQxZTIiLCJ1c2VyX2lkIjoiNDQ4OTg0NzEtM2Y0My00ZTA0LWFiNDAtZmY0Mjk0MzcwNmIwIiwiZXhwIjoxNjgxOTcyMTA2LCJqdGkiOiJiNmFjOTE4YS1hMDM3LTRkYjQtYmU1Zi1mZDhiZDRkMGRjYTMiLCJpYXQiOjE2ODE4ODU3MDYsImlzcyI6IjY0M2Y4OWU3OTFjMDIzYjRlMmQ3NWQxZCIsIm5iZiI6MTY4MTg4NTcwNiwic3ViIjoiYXBpIn0.jE9AKUKt4jiKQqdQ79IwUJEpumLMzjhvUUvjJ-T5UC0";

function JoinRoom() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "Manjunatha C",
    token: authToken
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName = "", roomCode = "" } = inputValues;

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

    try {
      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
      </div>
      <div className="input-container">
        <input
          id="room-code"
          type="text"
          name="roomCode"
          placeholder="Room code"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinRoom;
