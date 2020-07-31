// let db;
// // let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
// let dbReq = indexedDB.open('myDB', 1);
// dbReq.onupgradeneeded = (event) => {
//     // Зададим переменной db ссылку на базу данных
//     db = event.target.result;
//     // Создадим хранилище объектов с именем notes.
//     let authorization = db.createObjectStore('authorization', { autoIncrement: true });
// }
// dbReq.onsuccess = (event) => {
//     db = event.target.result;
// }
// dbReq.onerror = (event) => {
//     console.log('error opening database ' + event.target.errorCode);
// }


// async function putSomeData() {
//     let db = await idb.open('db-name', 1, upgradeDB => upgradeDB.createObjectStore('objectStoreName', { autoIncrement: true }))

//     let tx = db.transaction('objectStoreName', 'readwrite')
//     let store = tx.objectStore('objectStoreName')

//     await store.put({ firstname: 'John', lastname: 'Doe', age: 33 })

//     await tx.complete
//     db.close()
// }


// async function getAllData() {
//     let db = await idb.open('db-name', 1)

//     let tx = db.transaction('objectStoreName', 'readonly')
//     let store = tx.objectStore('objectStoreName')

//     // add, clear, count, delete, get, getAll, getAllKeys, getKey, put
//     let allSavedItems = await store.getAll()

//     console.log(allSavedItems)

//     db.close()
// }


// const setToken = (db, token) => {
//     let tx = db.transaction(['authorization'], 'readwrite');
//     let store = tx.objectStore('authorization');
//     let tokenNote = { token: token };
//     store.add(tokenNote);
//     tx.oncomplete = () => {
//         console.log('stored token!')
//     }
//     tx.onerror = (event) => {
//         console.log('error storing token ' + event.target.errorCode);
//     }
// }

// const getToken = (db) => {
//     let tx = db.transaction(['authorization'], 'readonly');
//     let store = tx.objectStore('authorization');
//     let req = store.get('token');
//     req.onsuccess = (event) => {
//         let token = event.target.result;
//         if (token) {
//             return token
//         } else {
//         //   console.log(`token not found`)
//         return null
//         }
//       }
//       req.onerror = (event) => { // if user blocked to store in indexDB in browser
//         console.log('error getting note' + event.target.errorCode);
//       }
// }

// const clearToken = (db) => {
//     let tx = db.transaction(['authorization'], 'readwrite');
//     let store = tx.objectStore('authorization');
//     const req = store.getKey('token');
//     req.onsuccess = (event) => {  
//         const key = req.result;
//         // выполняем запрос на удаление указанной записи из хранилища объектов
//         let deleteRequest = store.delete(key);
//         deleteRequest.onsuccess = (event) => {
//         // обрабатываем успех нашего запроса на удаление
//         console.log('Delete request for token successful')
//         };
//     }
// }

// export const setAuthToken = (token) => {
//     let oldToken = getToken(db)
//     if(oldToken!==null){
//         clearToken(db)
//     }
//     setToken(db, token)
// }





import { openDB } from 'idb';
 
const dbPromise = openDB('keyval-store', 1, {
  upgrade(db) {
    db.createObjectStore('keyval');
  },
});
 
export const idbKeyval = {
  async get(key) {
    return (await dbPromise).get('keyval', key);
  },
  async set(key, val) {
    return (await dbPromise).put('keyval', val, key);
  },
  async delete(key) {
    return (await dbPromise).delete('keyval', key);
  },
  async clear() {
    return (await dbPromise).clear('keyval');
  },
  async keys() {
    return (await dbPromise).getAllKeys('keyval');
  },
};

// idbKeyval.set('token', token)
// let token = idbKeyval.get('token')