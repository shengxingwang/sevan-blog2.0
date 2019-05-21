import React from 'react';
import { Spin } from 'antd';

const loading = () => {
    return (
        <div className='load-box'>
            <Spin tip='加载中.....'></Spin>
        </div>
    )
}

export default loading;
