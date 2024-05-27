import { FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api";

const Fat = () => {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [inputFour, setInputFour] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const body = {
    flask: parseInt(inputOne) || 0,
    oil: parseInt(inputTwo) || 0,
    empty: parseInt(inputThree) || 0,
    sample: parseInt(inputFour) || 0,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setResult(null);

    if (Object.values(body).includes(0)) {
      return setError("No value should be empty or zero");
    }

    try {
      setResult(await invoke("fat", { ...body }));
    } catch (error) {
      console.log(error);
      setError(`Something went wrong!`);
    }
  };

  return (
    <div className="FormComponent">
      <form id="form" onSubmit={handleSubmit}>
        <p className="heading">Calculate percentage of fat</p>

        <label htmlFor="wf">
          <p>Weight of flask</p>
          <input
            type="text"
            id="wf"
            name="wf"
            placeholder="weight of flask"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
          />
        </label>
        <label htmlFor="wo">
          <p>Weight of oil</p>
          <input
            type="text"
            id="wo"
            name="wo"
            placeholder="weight of oil"
            value={inputTwo}
            onChange={(e) => setInputTwo(e.target.value)}
          />
        </label>

        <label htmlFor="wef">
          <p>Weight of empty flask</p>
          <input
            type="text"
            id="wef"
            name="wef"
            placeholder="weight of empty flask"
            value={inputThree}
            onChange={(e) => setInputThree(e.target.value)}
          />
        </label>

        <label htmlFor="ws">
          <p>Weight of sample</p>
          <input
            type="text"
            id="ws"
            name="ws"
            placeholder="weight of sample"
            value={inputFour}
            onChange={(e) => setInputFour(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" name="submit_button" />

        <div className="output">
          {result && <p className="result">{result}</p>}
          {error}
        </div>
      </form>
    </div>
  );
};

export default Fat;
