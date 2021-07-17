const {exec} = require('../../db/mySql');
const getPostData = require('../../util/postData');

const controller = (ctx) => {
  const url = ctx.url;
    const method = ctx.method;
    const req = ctx.req;
    const queryObject = req.query || {};

    const setResbody = (result) => {
        ctx.response.body = result;
    };

    /* 获取当前命令*/
    if(method === "GET" && url === "/command/detail"){
      const getCommandDetail = async () => {
        const reqData = await getPostData(req)
        const { deviceId } = reqData;

        let sql = "select * from command where 1=1";
        if(deviceId) sql = `select * from command where deviceId=${deviceId}`;

        let result = await exec(sql);
        if(!deviceId) result = result[0]

        console.log("/command/detail接口 获取的值是:",result)
        setResbody(result);
      }

      return getCommandDetail();
    }
    /* 更新命令控制*/ 
    if (method === "POST" && url === "/command/update"){

      const updateCmd =async () => {
          const reqData = await getPostData(req);
          const { deviceId,cmd } = reqData;
          console.log("reqData",reqData)
          let result;
          console.log("reqData is",reqData);

          const sql = `
      update command set cmd='${cmd || ""}' where deviceId=${deviceId};`;

          try {
               result = await exec(sql);
              setResbody(result);
              console.log("数据库里的返回值",result)
          } catch (e) {
            console.log("出现错误")
              setResbody({success:false,msg:"后端错误",err:e});
          }
      };

      return updateCmd();
  }
}

module.exports =  controller