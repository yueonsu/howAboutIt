/**
 * 키이스케이프 방탈출 예약가능 여부를 가져온다.
 * @param areaNum
 * @param revDay
 * @param themeNum
 */
const getKeyEscapeSchedule = (areaNum, revDay, themeNum) => {
    fetch(`http://localhost:5100/key_escape?area_num=${areaNum}&rev_days=${revDay}&theme_num=${themeNum}`)
        .then(res => res.json())
        .then(data => {
            if (data) {
                const themeName = data['themeName'];
                const times = data['times'];

                makeKeyEscapeSchedule(themeName, times);
            } else {
                alert("통신에 실패하였습니다.");
            }
        })
        .catch(e => {
            console.error(e);
        });
}
/**
 * 가져온 키이스케이프 방탈출 데이터로 프론트에 그린다.
 * @param themeName
 * @param times
 */
const makeKeyEscapeSchedule = (themeName, times) => {
    themeTableInit();

    const themeTableHead = document.querySelector('#theme-head');
    themeTableHead.innerHTML = `
        <tr>
            <th id="theme-name" colspan="2">${themeName}</th>
        </tr>
    `;

    const timesTableBody = document.querySelector('#times-body');
    times.forEach(timeObj => {
        const time = timeObj['time'];
        const isAvailable = timeObj['isAvailable'] ? "<strong style='color: blue;'>가능</strong>" : "<strong style='color: red;'>불가</strong>"
        const timeTableTr = document.createElement('tr');
        timeTableTr.innerHTML = `<td>${time}</td><td>${isAvailable}</td>`;
        timesTableBody.append(timeTableTr);
    });
}

const themeTableInit = () => {
    const themeTable = document.querySelector('#theme-table');
    themeTable.innerHTML = `
        <thead id="theme-head">
        </thead>
        <tbody id="times-body">

        </tbody>
    `;
}

const buttonDate = document.querySelector('#button-date');
buttonDate.addEventListener('click', () => {
    const date = document.querySelector('#rev_date').value;
    let selectedTheme = document.querySelector('#theme-list');
    selectedTheme = selectedTheme.options[selectedTheme.selectedIndex].value;
    let areaNum = document.querySelector('#area');
    areaNum = areaNum.options[areaNum.selectedIndex].value;

    getKeyEscapeSchedule(areaNum, date, selectedTheme);
});