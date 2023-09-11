import { useState } from "react";
import useSWR from "swr";

export default function Joke() {
  const [id, setId] = useState(0);
  const [jokesInfo, setJokesInfo] = useState([]);

  const { data, isLoading, error } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  if (error) {
    return <h1>Oops something went wrong</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  function handleToggleFunny(id) {
    console.log("here is the id", id);

    setJokesInfo((jokesInfo) => {
      const info = jokesInfo.find((info) => info.id === id);

      if (info) {
        return jokesInfo.map((info) =>
          info.id === id ? { ...info, isFunny: !isFunny } : info
        );
      }

      return [...jokesInfo, { id, isFunny: true }];
    });
  }

  const info = jokesInfo.find((info) => info.id === id) ?? {
    isFunny: false,
  };
  const { isFunny } = info;

  return (
    <>
      <small>ID: {id}</small>
      <h1>
        {data.joke}
        <span>{isFunny ? "😆" : "😒"}</span>
      </h1>
      <button onClick={() => handleToggleFunny(id)}>
        {isFunny ? "This is not funny" : "This is funny"}
      </button>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
