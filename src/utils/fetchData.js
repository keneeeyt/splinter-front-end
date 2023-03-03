import axios from "axios";


//fecth data for get method
export const getData = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res;
}


//fetch data for post method
export const postData = async (url,post,token) => {
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

//fetch data for put or updata
export const putData = async (url,post,token) => {
    const res = await axios.put(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

//fecth data for patch or update specific data
export const patchData = async (url,post,token) => {
    const res = await axios.patch(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

//fectdata for delete data
export const deleteData = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res;
}

