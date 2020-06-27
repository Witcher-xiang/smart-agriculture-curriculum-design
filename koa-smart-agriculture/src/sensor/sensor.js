const {exec} = require('../../db/mySql')
const getPostData = require('../../util/postData');
const sensor = (ctx) => {
    const url = ctx.url;
    const method = ctx.method;
    const req = ctx.req;
    const queryObject = req.query || {};

    const setResbody = (result) => {
        ctx.response.body = result;
    };

    const updateSensor = async () =>{

         const res = await getPostData(req);
        ctx.response.status = 200;
        ctx.response.type = 'text/html';
        ctx.response.body = '<h1>Hello, koa2!</h1>';
       // console.log("postData为：",res)

    };

    // 获得得某一终端的历史数据
    if(method === "GET" && url === "/sensor/getSensor"){
        const { deviceId } = queryObject;
        const getSensor =async () => {
            const sql = `select * from blogs where deviceId=${deviceId}`
            const result = await exec(sql);
            setResbody(result);
        };

        return getSensor();
    }

    // 获得所有终端最新的历史数据
    if(method === "GET" && url === "/sensor/getSensorList"){
        const { deviceId } = queryObject;
        const getHistoryOfSensor =async () => {
            let sql = "select * from sensor_list where 1=1";
            if(deviceId) sql = `select * from sen where deviceId=${deviceId}`;

            const result = await exec(sql);

            console.log("获取的值是:",result)
            setResbody(result);
        };

        return getHistoryOfSensor();
    }

    // 更新某一传感器数据
    if (method === "POST" && url === "/sensor/update"){

        const updateSensor =async () => {
            const reqData = await getPostData(req);
            const { deviceId,humidity,temperature,solidStatus,rainStatus } = reqData;
            let result;
            console.log("reqData is",reqData);
        //    console.log("更新接口被调取");

            const sql = `
        update sensor_list set temperature='${temperature || ""}',humidity='${humidity || ""}',solidStatus='${solidStatus}',rainStatus='${rainStatus}' where deviceId=${deviceId};`;

            try {
                 result = await exec(sql);
                setResbody(result);
            } catch (e) {
                setResbody({success:false,msg:"后端错误",err:e});
            }

          //  console.log("postData为：",result);
        };

        return updateSensor();
    }

};

module.exports = sensor;

