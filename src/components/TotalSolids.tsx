import { FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api";

const TotalSolids = () => {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const body = {
    weight_of_crucible: parseInt(inputOne) || 0,
    weight_of_sample: parseInt(inputTwo) || 0,
    weight_of_dryresidue: parseInt(inputThree) || 0,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setResult(null);

    if (Object.values(body).includes(0)) {
      return setError("No value should be empty or zero");
    }

    try {
      setResult(await invoke("ts", { ...body }));
    } catch (error) {
      console.log(error);
      setError(`Something went wrong!`);
    }
  };

  return (
    <div className="FormComponent">
      <form id="form" onSubmit={handleSubmit}>
        <p className="heading">Determine total solids</p>

        <label htmlFor="wf">
          <p>Weight of crucible</p>
          <input
            type="text"
            id="wf"
            name="wf"
            placeholder="weight of crucible"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
          />
        </label>
        <label htmlFor="wo">
          <p>Weight of sample</p>
          <input
            type="text"
            id="wo"
            name="wo"
            placeholder="weight of sample"
            value={inputTwo}
            onChange={(e) => setInputTwo(e.target.value)}
          />
        </label>

        <label htmlFor="wef">
          <p>Weight of dry residue</p>
          <input
            type="text"
            id="wef"
            name="wef"
            placeholder="weight of dry residue"
            value={inputThree}
            onChange={(e) => setInputThree(e.target.value)}
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

export default TotalSolids;
