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

    // 添加一条历史记录, 会在修改时调用该函数
    const addItemToHis = async (reqData) => {
       
        const { deviceId,humidity,temperature,solidStatus,rainStatus } = reqData;
        let result = ''

        const sql = `INSERT INTO history (deviceId, temperature, createTime, humidity, solidStatus, rainStatus, light) VALUES ('${deviceId || ""}', '${temperature || ""}', '${Date.now() || ""}', '${humidity || ""}','${solidStatus}','${rainStatus}','1');`;

            try {
                 result = await exec(sql);
              
            } catch (e) {
                console.log("历史记录添加失败",e)
                // setResbody({success:false,msg:"后端错误",err:e});
            }

            return result
    }

    // 获得得终端的历史数据
    if(method === "GET" && url === "/sensor/history"){
        const { deviceId } = queryObject;
        const getSensor =async () => {
            let sql = `select * from history`
            if(deviceId) sql = `select * from history where deviceId=${deviceId}`
            const result = await exec(sql);
            setResbody(result);
        };

        return getSensor();
    }

    // 获得所有终端最新的数据
    if(method === "GET" && url === "/sensor/getNewSensorList"){
        const { deviceId } = queryObject;
        const getHistoryOfSensor =async () => {
            let sql = "select * from sensor_list where 1=1";
            if(deviceId) sql = `select * from sensor_list where deviceId=${deviceId}`;

            const result = await exec(sql);
            setResbody(result);
        };

        return getHistoryOfSensor();
    }

    // 更新某一传感器数据
    if (method === "POST" && url === "/sensor/update"){

        const updateSensor =async () => {
            const reqData = await getPostData(req);
            const { deviceId,humidity,temperature,solidStatus,rainStatus,light } = reqData;
            let result;
            const sql = `
        update sensor_list set temperature='${temperature || ""}',humidity='${humidity || ""}',solidStatus='${solidStatus}',rainStatus='${rainStatus}',light='${light}' where deviceId=${deviceId};`;

            try {
                await addItemToHis(reqData);
            } catch(e) {
                console.log("添加失败的原因")
            }
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

