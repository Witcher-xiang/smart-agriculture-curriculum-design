import { Button, Result, Card } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = () => (
  <Card title="欢迎页">
    <div style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
    <div style={{margin:"20px"}}>欢迎来到，物联网智慧大棚后台</div>
     <Button type="primary" onClick={() => history.push('/')}>
        去首页！
      </Button>
    </div>
    
  </Card>
);

export default NoFoundPage;
