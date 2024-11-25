# original: https://lovit.github.io/nlp/2018/08/28/levenshtein_hangle/
# TODO: 이 소스코드가 들어있는 soynlp 라이브러리가 LGPL이라서 나중에 코드 공개 여부 검토 필요

kor_begin = 44032
kor_end = 55203
chosung_base = 588
jungsung_base = 28
jaum_begin = 12593
jaum_end = 12622
moum_begin = 12623
moum_end = 12643

# 초성, 중성, 종성 동적 생성
chosung_list = [chr(code) for code in range(0x1100, 0x1113)]  # ㄱ ~ ㅎ
jungsung_list = [chr(code) for code in range(0x1161, 0x1176)]  # ㅏ ~ ㅣ
jongsung_list = [" "] + [
    chr(code) for code in range(0x11A8, 0x11C3)
]  # 종성 (공백 포함)

# 자음, 모음 리스트
jaum_list = [chr(code) for code in range(0x1100, 0x1113)] + [
    chr(code) for code in range(0x11A8, 0x11C3)
]
moum_list = jungsung_list


def compose(chosung, jungsung, jongsung):
    char = chr(
        kor_begin
        + chosung_base * chosung_list.index(chosung)
        + jungsung_base * jungsung_list.index(jungsung)
        + jongsung_list.index(jongsung)
    )
    return char


def decompose(c):
    if not character_is_korean(c):
        return ()  # None
    i = ord(c)
    if jaum_begin <= i <= jaum_end:
        return (c, " ", " ")
    if moum_begin <= i <= moum_end:
        return (" ", c, " ")

    # decomposition rule
    i -= kor_begin
    cho = i // chosung_base
    jung = (i - cho * chosung_base) // jungsung_base
    jong = i - cho * chosung_base - jung * jungsung_base
    return (chosung_list[cho], jungsung_list[jung], jongsung_list[jong])


def character_is_korean(c):
    i = ord(c)
    return (
        (kor_begin <= i <= kor_end)
        or (jaum_begin <= i <= jaum_end)
        or (moum_begin <= i <= moum_end)
    )


def levenshtein(s1, s2, cost=None, debug=False):
    if len(s1) < len(s2):
        return levenshtein(s2, s1, debug=debug)

    if len(s2) == 0:
        return len(s1)

    if cost is None:
        cost = {}

    # changed
    def substitution_cost(c1, c2):
        if c1 == c2:
            return 0
        return cost.get((c1, c2), 1)

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            # Changed
            substitutions = previous_row[j] + substitution_cost(c1, c2)
            current_row.append(min(insertions, deletions, substitutions))

        if debug:
            print(current_row[1:])

        previous_row = current_row

    return previous_row[-1]


def jamo_levenshtein(s1, s2, debug=False):
    if len(s1) < len(s2):
        return jamo_levenshtein(s2, s1, debug)

    if len(s2) == 0:
        return len(s1)

    def substitution_cost(c1, c2):
        if c1 == c2:
            return 0
        return levenshtein(decompose(c1), decompose(c2)) / 3

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            # Changed
            substitutions = previous_row[j] + substitution_cost(c1, c2)
            current_row.append(min(insertions, deletions, substitutions))

        if debug:
            print(["%.3f" % v for v in current_row[1:]])

        previous_row = current_row

    return previous_row[-1]


def normalized_jamo_levenshtein(s1: str, s2: str) -> float:
    result = jamo_levenshtein(s1, s2)
    result_normalized = 1 - result / max(len(s1), len(s2))
    return result_normalized


if __name__ == "__main__":
    # 테스트용 코드
    s1 = "보통사람 퍼레이드"
    s2 = "범인 퍼레이드"

    result = jamo_levenshtein(s1=s1, s2=s2)
    result_normalized = 1 - result / max(len(s1), len(s2))
    print(result_normalized)
