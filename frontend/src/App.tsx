import { useState } from "react";
import { FormEvent } from "react";
import "./App.scss";

interface SongItem {
  artist: string;
  mp3Link: string;
  siteLink: string;
  title: string;
  titleKR: string;
}

export default function App() {
  const [result, setResult] = useState<SongItem[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    const response = await fetch(`/api/search?${params}`);

    const data = await response.json();
    if (data.length === 0) {
      console.error("검색 결과가 없습니다.");
      setResult(data);
    } else {
      console.log(data);
      setResult(data);
    }
  };

  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <input required type="text" name="songname" id="songname" />
        <button type="submit">검색</button>
        {result.length > 0 ? (
          result.map((item: SongItem, index: number) => {
            return (
              <div key={index}>
                <h1>{item.titleKR}</h1>
                <p>{item.title}</p>
                <p>{item.artist}</p>
                <button>곡 추가하기</button>
              </div>
            );
          })
        ) : (
          <h1>결과가 없습니다.</h1>
        )}
      </form>
    </>
  );
}
