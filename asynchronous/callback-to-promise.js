/* change example of callback hell by using promise */
class UserStorage {
    loginUser(id, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if((id === 'admin' && password === 'administrator') || (id === 'idr' && password === 'system')) {
                    resolve(id);
                } else {
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    }

    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(user === 'admin') {
                    resolve({ name: 'admin', role: 'admin' });
                } else {
                    reject(new Error('not access'));
                }
            }, 1000);
        });
    }
}

//1. 사용자에게 id, pw 입력 받아온다
const userStorage = new UserStorage();
const id = prompt('enter your id');
const pw = prompt('enter your password');

//2. 로그인 후 받아온 id로 사용자 역할을 요청해 받아오고, 사용자 name, role 출력
userStorage.loginUser(id, pw)
    .then(userStorage.getRoles)
    .then(userWithRole => alert(`Hello ${userWithRole.name} ! Your role is a ${userWithRole.role}`))
    .catch(console.log)