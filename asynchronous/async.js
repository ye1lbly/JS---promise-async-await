//async & await are clear style of using promise

/* async */
async function fetchUser() {
    return 'admin';
}

const user = fetchUser();
console.log(user); //type이 Promise이고, state와 결과값까지 확인 가능
user.then(console.log);

/* await */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(3000); //delay를 사용할 때까지 기다려 !
    return '🍎'; //3초 후 사과 출력
}

async function getBanana() {
    await delay(4000);
    return '🍌'; //4초 후 바나나 출력
}

//콜백지옥과 비슷한 then 중첩 사용
function pickFruits() {
    return getApple().then(apple => {
        return getBanana().then(banana => `${apple} + ${banana}`);
    });
}
pickFruits().then(console.log); //총 7초 후 사과 + 바나나 출력

//then 중첩 사용하지 않게끔 수정
async function fruitsPick() {
    const apple = await getApple();
    const banana = await getBanana();
    return `${banana} + ${apple}`;
}
fruitsPick().then(console.log); //총 7초 후 바나나 + 사과 출력

//await 병렬 처리
async function fruitsPickFast() {
    const applePromise = getApple(); //Promise를 만드는 순간 Promise 안에 있는 코드 블럭 바로 실행
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${banana} + ${apple}`;
}
fruitsPickFast().then(console.log); //총 4초 후 바나나 + 사과 출력

//await 병렬 처리 코드 간단하게 수정 by using Promise APIs
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()])
        .then(fruits => fruits.join(' + '));
}
pickAllFruits().then(console.log); //총 4초 후 사과 + 바나나 출력

function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log); //가장 먼저 수행된 시간에 맞춰 총 3초 후 사과만 출력
