const fetch = require("node-fetch");
global.Headers = fetch.Headers;

async function postRequest(url, data) {
    const res = await fetch(url, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            'Content-Type': 'application/json'
            }),
        })
        .then(response => response.json())

        return res;
        
        }


let data    =   {
    auth: 10293847566,
    name: "bır kızın uyusturucu gunlugu",
    author: "Yılmaz Dumlupınar",
    publishinghouse: "Yılmaz KKD",
    printedyear: 1453,
}

let i = 1;


    setInterval(()=>{
        postRequest("http://localhost/api/create/book",data)
        .then((data)=>{
        if(!data.errors){
            console.log("Basarili")
        }
        i++
    })
    .catch((err)=>{if (err) throw err;})
    
    data.no = i
},60)
