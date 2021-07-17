import React,{ useState ,useEffect} from "react";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, message } from 'antd'
import axios from 'axios'

function add0(m){return m<10?`0${m}`:m }
function format(tiemStamp)
{
// shijianchuo是整数，否则要parseInt转换
const  time = new Date(parseInt(tiemStamp));
const y = time.getFullYear();
const m = time.getMonth()+1;
const d = time.getDate();
const h = time.getHours();
const mm = time.getMinutes();
const s = time.getSeconds();
return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`;
}

const columns = [
  {
    title: '设备编号',
    dataIndex: 'deviceId',
    key: 'deviceId',
  },
  {
    title: '光照是否充足',
    dataIndex: 'light',
    key: 'light',
    render:(text) =>{
      return text === 1 ? "充足" : "充足"
     }
  },
  {
    title: '当前温度',
    dataIndex: 'temperature',
    key: 'temperature',
  },
  {
    title: '土壤是否湿润',
    dataIndex: 'solidStatus',
    key: 'solidStatus',
    render:(text) =>{
      return text === 1 ? "太干了" : "土壤湿度刚好"
     }
  },
  {
    title: '是否下雨',
    dataIndex: 'rainStatus',
    key: 'rainStatus',
    render:(text) =>{
      return text == 0 ? "正在下雨" : "没有下雨"
     }
  },
  {
    title: '湿度',
    dataIndex: 'humidity',
    key: 'humidity',
    render:(text) =>{
      return `${text}%`
     }
    
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render:(text) =>{
      return format(text)
     }
  },
];

const request = async (method,url,data) => {
  const res = axios[method](url,data);
  return  res;
};
const HistoryTable = () => {
  const [list, setList] = useState([])

  const refresh = () =>{
    request("get","http://localhost:3000/sensor/history")
      .then(res=> {
        const {data} = res;
        setList(data)
        console.log(res)
        message.success("数据获取成功")
    
      })
      .catch(err => {
        console.log(err)
        message.error("服务器出现未知错误")
      })
  }

  useEffect(() =>{
    refresh()
  }, [])
  return (<PageHeaderWrapper>
    <Table dataSource={list} columns={columns} />;
  </PageHeaderWrapper>)
}

export default HistoryTable