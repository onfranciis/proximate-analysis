import { FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api";

const Protein = () => {
  const [inputOne, setInputOne] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const body = {
    nitrogen: parseInt(inputOne) || 0,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setResult(null);

    if (Object.values(body).includes(0)) {
      return setError("No value should be empty or zero");
    }

    try {
      setResult(await invoke("protein", { ...body }));
    } catch (error) {
      console.log(error);
      setError(`Something went wrong!`);
    }
  };

  return (
    <div className="FormComponent">
      <form id="form" onSubmit={handleSubmit}>
        <p className="heading">Calculate percentage of protein</p>

        <label htmlFor="wf">
          <p>Percentage of Nitrogen</p>
          <input
            type="text"
            id="wf"
            name="wf"
            placeholder="percentage of nitrogen"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
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

export default Protein;
