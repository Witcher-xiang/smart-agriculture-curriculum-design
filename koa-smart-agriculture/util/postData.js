const getPostData = (req) =>{
    const promise = new Promise((resolve,reject)=>{

       // console.log("req is",req);

        if (req.method !== "POST") {
            resolve({});
            return
        }

        if (req.headers["content-type"] !== "application/json"){
            resolve({});
            return
        }
        let postData = "";

        req.on("data",chunk=>{
            postData += chunk.toString()
        });
        req.on("end",()=>{
            if (!postData){
                resolve({});
                return
            }
            resolve(JSON.parse(postData))
        })
    });
    return promise
};

module.exports = getPostData;
