from tinydb import TinyDB, Query
from pydantic import BaseModel, Field

db = TinyDB("db.json")


class SongData(BaseModel):
    title: str = Field(min_length=1)
    titleKR: str = Field(min_length=1)
    artist: str = Field(min_length=1)
    siteLink: str | None = Field(pattern=r"^https:\/\/.*$")
    mp3Link: str = Field(pattern=r"^https:\/\/.*$")


# 더미 데이터

# data = SongData(
#     title="夜明けと蛍",
#     titleKR="새벽과 반딧불",
#     artist="n-buna",
#     siteLink="https://piapro.jp/t/jEPl",
#     mp3Link="https://cdn.piapro.jp/mp3_a/ko/ko4of47p1u5lalx4_20141111195715_audition.mp3",
# )

# db.insert(data.model_dump(mode="json"))

SongQuery = Query()
result = db.search(SongQuery.titleKR == "새벽과 반딧불")
print(result)
