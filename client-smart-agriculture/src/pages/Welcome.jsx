import React,{ useState ,useEffect} from "react";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Card, Typography, Progress, Statistic, Button, message } from 'antd';

import ArrowUpOutlined from "@ant-design/icons/lib/icons/ArrowUpOutlined";
import axios from 'axios';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => {
  const [list,setList] = useState([]);
  const [status, setStatus] = useState(true)

  const request = async (method,url,data) => {
    const res = axios[method](url,data);
    return  res;
  };

  const refresh = () =>{
    setStatus(true)
    request("get","http://localhost:3000/sensor/getNewSensorList")
      .then(res=> {
        const {data} = res;
        setList(data)
        console.log(res)
        message.success("数据获取成功")
        setStatus(false)
      })
      .catch(err => {
        console.log(err)
        message.error("服务器出现未知错误")
      })
  }

  const fireWarn = (humnity, temp) => {
    return humnity < 30 && temp > 40 ? 1 : 0
  }

  useEffect(()=>{
    refresh()
  },[]);
 return (<PageHeaderWrapper>


     {list.map(item =>  (<Card title={`${item?.deviceName}的当前房间温度：`} style={{
       marginTop: 24,
     }}
       extra={<Button loading={status} style={{height: "60"}} onClick={refresh}>刷新数据</Button>}
       >
       <Card title="空气湿度：" style={{width: 240, display: "inline-block"}}>
       <Progress type="circle" percent={item?.humidity}/>
       </Card>

       <Card title="空气温度：" style={{width: 240, display: "inline-block"}}>
       <Statistic
       title="摄氏度："
       value={item?.temperature}
       precision={2}
       valueStyle={{color: '#3f8600'}}
       prefix={<ArrowUpOutlined/>}
       suffix="℃"
       />
       </Card>

       <Card title={`当前光照是否充足：${!item?.light ? "是" : "否"}`} style={{width: 240, display: "inline-block"}}>
       <Progress type="circle" percent={!item?.light ? 100 : 0} status={item?.light===0 ?"success ":"exception"}/>
       </Card>

       <Card title={`当前土壤是否需要浇水：${item?.solidStatus ? "是" : "否"}`} style={{width: 290, display: "inline-block"}}>
       <Progress type="circle" percent={!item?.solidStatus ? 100 : 0}  status={!item?.solidStatus===1 ?"success ":"exception"}/>
       </Card>

       <Card title={`当前是否下雨：${!item?.rainStatus ? "是" : "否"}`} style={{width: 240, display: "inline-block"}}>
         <Progress type="circle" percent={!item?.rainStatus ? 100 : 0} status={item?.solidStatus===0 ?"success ":"exception"}/>
       </Card>

       <Card title={`大棚是否发生火灾：${fireWarn(item?.light, item?.temperature) ? "是" : "否"}`} style={{width: 290, display: "inline-block"}}>
       <Progress type="circle" percent={!fireWarn(item?.light, item?.temperature) ? 100 : 0}  status={!fireWarn(item?.light, item?.temperature) ?"success ":"exception"}/>
       </Card>
 
       </Card>))}



  </PageHeaderWrapper>
)};
