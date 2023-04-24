import "./styles.css";
import { questions } from "./data";
import { useSetSessionMetadata } from "./hooks/useSetSessionMetadata";

const Confetti = () => {
  // usage
  const { setSessionMetadata } = useSetSessionMetadata();

  const sendMessage = () => {
    setSessionMetadata(JSON.stringify(questions[0]));
  };

  return (
    <>
      <button className="btn btn-primary text-center" onClick={sendMessage}>
        Send Session metadata
      </button>
    </>
  );
};

export default Confetti;
