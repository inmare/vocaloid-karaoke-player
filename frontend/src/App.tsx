import { useState, FormEvent } from "react";
import "./App.scss";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface SongItem {
  artist: string;
  mp3Link: string;
  siteLink: string;
  title: string;
  titleKR: string;
}

export default function App() {
  const [result, setResult] = useState<SongItem[]>([]);
  const [songList, setSongList] = useState<SongItem[]>([]);

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
      // console.error("검색 결과가 없습니다.");
      setResult(data);
    } else {
      // console.log(data);
      setResult(data);
    }
  };

  const handleAddSong = (item: SongItem) => {
    setSongList([...songList, item]);
  };

  return (
    <>
      <button>재생</button>
      <label htmlFor="autoplay">자동 재생</label>
      <input type="checkbox" name="autoplay" id="autoplay" />
      <h1>곡 목록</h1>
      {songList.length > 0 ? (
        songList.map((item: SongItem, index: number) => {
          return <p key={index}>{item.titleKR}</p>;
        })
      ) : (
        <p>곡이 없습니다.</p>
      )}
      <form id="form" onSubmit={handleSubmit}>
        <input required type="text" name="songname" id="songname" />
        <button type="submit">검색</button>
      </form>
      {result.length > 0 ? (
        result.map((item: SongItem, index: number) => {
          return (
            <div key={index}>
              <h1>{item.titleKR}</h1>
              <p>{item.title}</p>
              <p>{item.artist}</p>
              <button onClick={() => handleAddSong(item)}>
                <PlusCircleIcon className="icon" />
              </button>
            </div>
          );
        })
      ) : (
        <h1>결과가 없습니다.</h1>
      )}
    </>
  );
}
