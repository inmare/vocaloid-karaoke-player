// import { useState } from "react";
import { FormEvent } from "react";
import "./App.scss";

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);

  const response = await fetch("/api/search", {
    method: "POST",
    body: formData,
  });
};

function App() {
  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <input required type="text" name="songname" id="songname" />
        <button type="submit">검색</button>
      </form>
    </>
  );
}

export default App;
