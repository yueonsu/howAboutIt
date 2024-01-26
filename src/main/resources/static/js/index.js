/**
 * 로딩 화면 활성화
 */
const loadingStart = () => {
    const spinnerContainer = document.querySelector('.spinner-container');
    spinnerContainer.style.display = 'block';
}

/**
 * 로딩 화면 비활성화
 */
const loadingStop = () => {
    const spinnerContainer = document.querySelector('.spinner-container');
    spinnerContainer.style.display = 'none';
}

/**
 * fetch API
 * @param url: GET 일 경우 url + 쿼리스트링
 * @param method: HTTP Method
 * @param body: POST, PUT 사용 시 받을 인자값
 * @param func: 콜백함수
 */
const myFetch = (url, method, body, func) => {
    loadingStart();
    if (method === 'GET') {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                func(data);
            })
            .catch(e => {
                console.error(e)
            })
            .finally(() => {
                loadingStop();
            });
    }
}