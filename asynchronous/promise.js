//Promise is a JS object for asynchronous operation.
//state : pending -> fulfilled / rejected

//producer : create promise
const promise = new Promise((resolve, reject) => {
    console.log('doing something heavy work like reading files');
    setTimeout(() => {
        resolve('admin');
        // reject(new Error('no network'));
    }, 2000);
});

//consumers : using Promise made by producer
promise
    //promise가 성공적으로 실행됐을 때 resolve에서 전달해준 값(admin)이 then에 value 파라미터로 전달된다.
    .then(value => {
        console.log(value);
    })
    //promise 실행 중 문제가 생겨 실패했을 때 reject에서 전달해준 값으로 에러 처리
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('always running');
    });

//example of Promise chainging
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000); //promise 실행 성공시 1초 후 숫자 1 전달
});

fetchNumber
    .then(num => num * 2) //2
    .then(num => num * 3) //6
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000); //1초 후 숫자 5 전달
        });
    })
    .then(num => console.log(num)); //총 2초 후 5 출력

//example of error handling
const getHen = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐔'), 1000); //promise 실행 성공시 1초 후 암탉 전달
});
const getEgg = hen => new Promise((resolve, reject) => {
    // setTimeout(() => resolve(`${hen} => 🥚`), 1000); //1초 후 달걀 전달
    setTimeout(() => reject(new Error(`error ! ${hen} => 🥚`)), 1000);
});
const cook = egg => new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000); //1초 후 계란후라이 전달
});

getHen()
    .then(hen => getEgg(hen)) //이렇게 value를 하나만 전달할 땐 .then(getEgg)로 축약해서 적어도 된다.
    .catch(error => {
        return '🧈'; //promise가 중간에 실패해도 promise chain이 끊기지 않게 에러 처리
    })
    .then(cook)
    .then(console.log) //총 3초 후 출력
    .catch(console.log); //promise chain 내 에러 전체 처리
