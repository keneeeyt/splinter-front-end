// GLOBAL TYPES


export const TYPES = {
    NOTIFY: 'NOTIFY',
    THEME: 'THEME',
    AUTH: 'AUTH',
    STATUS: 'STATUS',
    MODAL: 'MODAL'
}

export const EditData =(data, id, post) => {
    const newData = data.map(item => (item._id === id ? post: item))
    return newData;
}

export const DeleteData =(data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}
