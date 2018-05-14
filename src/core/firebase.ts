declare const firebase: any;
const database = firebase.database();
export const fetchListFb = () => {
    return database.ref('/list')
    .once('value');
}

export const addItemFb = (title: string = '', desc: string = '', src: string = '') => {
    const data = {
        created: firebase.database.ServerValue.TIMESTAMP, desc, src, title 
    };
    const key = database.ref('/list').push().key;
    return database.ref('/list').update({[key]: data});
}

export const removeItemFb = (key: string) => {
    return database.ref('/list').child(key).remove();
}

export const editItemFb = (key: string, item: any) => {
    return database.ref('/list').update({[key]: item});
}