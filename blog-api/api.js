// const { json } = require("express");

const api = "http://localhost:3000/api";
const token = ()=> localStorage.getItem(token);

const requst = async (url, Method= GET, data= null, isfromData = false)=>{
    const res = await fetch(api + url,{
        method,
        headers:{
            "content-type": "application/json",
            authorization: token()? `Bearer: ${token()}`:""
        },
        body: data? JSON.stringify(data): null
    })
    return res.json()
}