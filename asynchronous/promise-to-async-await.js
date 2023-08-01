/* change example of callback hell by using promise, async & await */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class UserStorage {
    loginUser = async function(id, password) {
        await delay(2000);
        if((id === 'admin' && password === 'administrator') || (id === 'idr' && password === 'system')) {
            return id;
        } else {
            throw new Error('not found');
        }
    }

    getRole = async function(user) {
        await delay(1000);
        if(user === 'admin') {
            return { name: 'admin', role: 'admin' };
        } else {
            throw new Error('not access');
        }
    }
}

//1. 사용자에게 id, pw 입력 받아온다
const userStorage = new UserStorage();
const id = prompt('enter your id');
const pw = prompt('enter your password');

//2. 로그인 후 받아온 id로 사용자 역할을 요청해 받아오고, 사용자 name, role 출력
async function getUser() {
    try {
        const userId = await userStorage.loginUser(id, pw);
        const user = await userStorage.getRole(userId);
        alert(`Hello ${user.name} ! Your role is a ${user.role}`);
    } catch(err) {
        console.log(err);
    }
}
getUser().then(console.log);
