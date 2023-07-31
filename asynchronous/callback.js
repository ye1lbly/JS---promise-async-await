//JavaScript is synchronous.
console.log('1');
console.log('2');
console.log('3');

//example of asynchronous by using callback function setTimeout
console.log('1');
setTimeout(function() {
    console.log('2-1');
}, 1000); //1초 뒤 실행
setTimeout(() => console.log('2-2'), 1000); //위 함수랑 같은 역할이고, 똑같이 1초 뒤 실행이므로 함께 1초 뒤 실행
console.log('3');

//Synchronous callback
function printImmediately(print) {
    print();
}
printImmediately(() => console.log('sync callback'));

//Asynchronous callback
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);

/* example of callback hell */
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if((id === 'admin' && password === 'administrator') || (id === 'idr' && password === 'system')) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if(user === 'admin') {
                onSuccess({ name: 'admin', role: 'admin' });
            } else {
                onError(new Error('not access'));
            }
        }, 1000);
    }
}

//1. 사용자에게 id, pw 입력 받아온다
const userStorage = new UserStorage();
const id = prompt('enter your id');
const pw = prompt('enter your password');

//2. 로그인 후 받아온 id로 사용자 역할을 요청해 받아오고, 사용자 name, role이 들어있는 object 출력
userStorage.loginUser(
    id, 
    pw, 
    user => {
        userStorage.getRoles(
            user,
            userWithRole => { alert(`Hello ${userWithRole.name} ! Your role is a ${userWithRole.role}`) },
            error => { console.log(error) }
        );
    },
    error => { console.log(error) }
);
