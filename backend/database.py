from tinydb import TinyDB, Query
from pydantic import BaseModel, Field
from word_compare import normalized_jamo_levenshtein

db = TinyDB("db.json")


class SongData(BaseModel):
    title: str = Field(min_length=1)
    titleKR: str = Field(min_length=1)
    artist: str = Field(min_length=1)
    siteLink: str | None = Field(pattern=r"^https:\/\/.*$")
    mp3Link: str = Field(pattern=r"^https:\/\/.*$")


def get_song_data(titleKR: str):
    SongQuery = Query()
    # 임의의 유사도 값으로 0.8을 설정함
    compare = lambda t: normalized_jamo_levenshtein(titleKR, t) > 0.8
    result = db.search(SongQuery.titleKR.test(compare))
    return result


if __name__ == "__main__":
    pass
    # 더미 데이터

    # data = SongData(
    #     title="夜明けと蛍",
    #     titleKR="새벽과 반딧불",
    #     artist="n-buna",
    #     siteLink="https://piapro.jp/t/jEPl",
    #     mp3Link="https://cdn.piapro.jp/mp3_a/ko/ko4of47p1u5lalx4_20141111195715_audition.mp3",
    # )

    # db.insert(data.model_dump(mode="json"))
