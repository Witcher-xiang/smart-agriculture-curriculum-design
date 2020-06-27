import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
import React,{ useState ,useEffect} from "react";
import { Progress,Spin, Card } from 'antd';

const pageLoading = () => {
   return <div>



     <Spin />
   </div>
};

// export default PageLoading;
export default pageLoading;
