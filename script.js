// ================================
// 학교 분실물 찾기
// script.js
// ================================


// -------------------------------
// 임시 분실물 데이터
// -------------------------------
// 실제로는 나중에 학생이 직접 등록할 수 있도록 만들 예정

const lostItems = [
    {
        type: "카드지갑",
        color: "검정",
        place: "본관 2층",
        feature: "캐릭터 스티커",
        foundPlace: "학생회실",
        date: "2026-08-01"
    },

    {
        type: "에어팟",
        color: "흰색",
        place: "도서관",
        feature: "케이스에 이름 스티커",
        foundPlace: "도서관 안내데스크",
        date: "2026-08-01"
    },

    {
        type: "필통",
        color: "파란색",
        place: "3층 복도",
        feature: "지퍼에 작은 키링",
        foundPlace: "3층 교무실",
        date: "2026-07-31"
    },

    {
        type: "카드지갑",
        color: "갈색",
        place: "본관 1층",
        feature: "고양이 그림",
        foundPlace: "행정실",
        date: "2026-07-30"
    }
];


// -------------------------------
// 분실물 찾기 함수
// -------------------------------

function findLostItem() {

    // 사용자가 입력한 정보 가져오기

    const type =
        document.getElementById("lostType").value
        .trim()
        .toLowerCase();

    const color =
        document.getElementById("lostColor").value
        .trim()
        .toLowerCase();

    const place =
        document.getElementById("lostPlace").value
        .trim()
        .toLowerCase();

    const feature =
        document.getElementById("lostFeature").value
        .trim()
        .toLowerCase();


    // 아무것도 입력하지 않았을 경우

    if (!type && !color && !place && !feature) {

        document.getElementById("results").innerHTML =
            "<p>분실물 정보를 하나 이상 입력해주세요.</p>";

        return;
    }


    // -------------------------------
    // 매칭 점수 계산
    // -------------------------------

    const matches = lostItems.map(item => {

        let score = 0;

        // 물건 종류
        if (
            type &&
            item.type.toLowerCase().includes(type)
        ) {
            score += 40;
        }

        // 색상
        if (
            color &&
            item.color.toLowerCase().includes(color)
        ) {
            score += 25;
        }

        // 장소
        if (
            place &&
            item.place.toLowerCase().includes(place)
        ) {
            score += 20;
        }

        // 특징
        if (
            feature &&
            item.feature.toLowerCase().includes(feature)
        ) {
            score += 15;
        }


        return {
            ...item,
            score: score
        };

    });


    // 점수가 높은 순서대로 정렬

    matches.sort((a, b) => b.score - a.score);


    // 점수가 0인 물건은 제외

    const results =
        matches.filter(item => item.score > 0);


    displayResults(results);
}



// -------------------------------
// 검색 결과 출력
// -------------------------------

function displayResults(results) {

    const resultBox =
        document.getElementById("results");


    // 검색 결과가 없는 경우

    if (results.length === 0) {

        resultBox.innerHTML = `
            <p>
                😢 입력한 정보와 일치하는 분실물이 없습니다.
            </p>

            <p>
                물건 종류나 특징을 조금 다르게 입력해보세요.
            </p>
        `;

        return;
    }


    // 결과 출력

    resultBox.innerHTML = "";


    results.forEach(item => {

        const result = document.createElement("div");

        result.className = "lost-item";


        result.innerHTML = `

            <h3>
                ${item.type}
            </h3>

            <p>
                🎨 색상 :
                ${item.color}
            </p>

            <p>
                📍 추정 분실 장소 :
                ${item.place}
            </p>

            <p>
                ✨ 특징 :
                ${item.feature}
            </p>

            <hr>

            <p>
                📦 현재 보관 장소 :
                <strong>${item.foundPlace}</strong>
            </p>

            <p>
                📅 습득 날짜 :
                ${item.date}
            </p>

            <p>
                🔎 일치도 :
                <strong>${item.score}%</strong>
            </p>

        `;


        resultBox.appendChild(result);

    });
}
