/**
 * 키이스케이프 방탈출 예약가능 여부를 가져온다.
 * @param areaNum
 * @param revDay
 * @param themeNum
 */
const getKeyEscapeSchedule = (areaNum, revDay, themeNum) => {
    const url = `/api/escape/keyEscape?areaNum=${areaNum}&revDay=${revDay}&themeNum=${themeNum}`;
    const method = 'GET';
    const body = null;
    myFetch(url, method, body, makeKeyEscapeSchedule);
}

/**
 * 가져온 키이스케이프 방탈출 데이터로 프론트에 그린다.
 * @param data
 */
const makeKeyEscapeSchedule = (data) => {
    themeTableInit();
    
    /** 통신 및 요청 에러 */
    if (!data) {alert('통신에 실패하였습니다.'); return;}
    if (data['times'].length < 1) {alert('유효하지 않은 날짜입니다.'); return;}

    const themeName = data['themeName']; // 테마명
    const times = data['times'];         // 이용 시간
    
    /** 이용 시간 테이블 헤더 부분 */
    const themeTableHead = document.querySelector('#theme-head');
    themeTableHead.innerHTML = `
        <tr>
            <th id="theme-name" colspan="2">${themeName}</th>
        </tr>
    `;
    
    /** 이용 시간 테이블 바디 부분 */
    const timesTableBody = document.querySelector('#times-body');
    times.forEach(timeObj => {
        const time = timeObj['time'];
        const isAvailable = timeObj['isAvailable'] === "true" ? "<strong style='color: blue;'>가능</strong>" : "<strong style='color: red;'>불가</strong>"
        const timeTableTr = document.createElement('tr');
        timeTableTr.innerHTML = `<td>${time}</td><td>${isAvailable}</td>`;
        timesTableBody.append(timeTableTr);
    });
}

/**
 * 테마 이용시간 테이블 초기화
 */
const themeTableInit = () => {
    const themeTable = document.querySelector('#theme-table');
    themeTable.innerHTML = `
        <thead id="theme-head">
        </thead>
        <tbody id="times-body">

        </tbody>
    `;
}

/**
 * 날짜 입력 버튼 클릭 이벤트
 * @type {Element}
 */
const buttonDate = document.querySelector('#button-date');
buttonDate.addEventListener('click', () => {
    const date = document.querySelector('#rev_date').value;
    let selectedTheme = document.querySelector('#theme-list');
    selectedTheme = selectedTheme.options[selectedTheme.selectedIndex].value;
    let areaNum = document.querySelector('#area');
    areaNum = areaNum.options[areaNum.selectedIndex].value;

    getKeyEscapeSchedule(areaNum, date, selectedTheme);
});