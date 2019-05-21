
import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Table, Divider, Button } from 'antd';

import Layout from '../components/layout'

const columns = [{
  title: '标题',
  dataIndex: 'name',
  key: 'name',
  width: 500,
  render: text => <Button>{text}</Button>,
}, {
  title: '日期',
  dataIndex: 'age',
  width: 200,
  key: 'age',
}, {
  title: '标签',
  width: 250,
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  width: 230,
  render: (text, record) => (
    <span>
      <Button>查看</Button>
      <Divider type="vertical" />
      <Button>修改</Button>
    </span>
  ),
}];

const data = [];

for (var i = 0; i< 30; i++) {
  data.push({
    key: i + 1,
    name: 'name' + i,
    age: i,
    address: 'address' + i,
  })
}

let page = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 30
}

class SketchList extends Component {
  render () {
    return (
      <Layout history={this.props.history}>
        <Table columns={columns} dataSource={data} pagination = {page}  />
      </Layout>
    )
  }
}

export default connect()(SketchList)

