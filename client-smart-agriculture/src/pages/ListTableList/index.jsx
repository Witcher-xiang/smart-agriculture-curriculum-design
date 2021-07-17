import { Button, message,Input, Card } from 'antd';
import React, { useEffect, useState} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import axios from 'axios';

import './index.less'

const ListTableList = () => {

  const [status, setStatus] = useState(false)
  const [cmdValue, setCmdValue] = useState([])
  const [commandValue, setCommandValue] = useState("")

  const request = async (method,url,data) => {
  return axios({
    headers:{
      'Content-Type': 'application/json'
    },
  method,
  url,
  data
  })
  };

  const refresh = () =>{
    setStatus(true)
    request("get","http://localhost:3000/command/detail")
      .then(res=> {
        const {data} = res;
        setCmdValue(data)
        console.log(res)
        message.success("数据获取成功")
        setStatus(false)
      })
      .catch(err => {
        console.log(err)
        message.error("服务器出现未知错误")
      })
  }

  const inputChange = (e) =>{
    setCommandValue(e.target.value)

  }

  const handleSubmit = () => {
    setStatus(true)
    request("post","http://localhost:3000/command/update",{ cmd: commandValue, deviceId: 1})
    .then(()=> {

      message.success("提交成功")
      refresh();
      setStatus(false)
    })
    .catch(err => {
      console.log(err)
      message.error("服务器出现未知错误")
    })
  }

  useEffect(()=>{
    refresh()
  },[]);

  return (<PageHeaderWrapper>
      <Card extra="指令输入">
        <div>当前指令为：{cmdValue?.cmd}</div>
      <div className="content">
        <Input onChange={inputChange} placeholder="请输入控制指令"t/>
    <Button style={{margin:"20px"}} type="default" loading={status} onClick={handleSubmit}>提交</Button>
  </div>
  </Card>
  </PageHeaderWrapper>)
};

export default ListTableList
