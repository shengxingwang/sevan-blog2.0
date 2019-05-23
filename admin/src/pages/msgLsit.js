import React, { Component } from 'react'
import { Table, Divider, message, Button } from 'antd';
// import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getMsgList, delMsgItem } from '../store/actions/msglist';
import Layout from '../components/layout';

const toDate = str => {
  const date = new Date(str)
  return `${date.getFullYear()} -${date.getMonth()+1}- ${date.getDate()}`
}

class msgList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1
    }
    this.change = this.change.bind(this)
    this.columns = [
      {
        title: '称呼',
        dataIndex: 'nick',
        key: 'nick',
        width:200,
        render: text => <span>{text}</span>,
      }, 
      {
        title: '内容',
        dataIndex: 'feed',
        width: 300,
        key: 'feed',
        render: text => <span>{text}</span>,
      }, 
      {
        title: '邮箱',
        width: 300,
        dataIndex: 'email',
        key: 'email',
        render: text => <span>{text}</span>,
      },
      {
        title: '网址',
        width: 300,
        dataIndex: 'friendlink',
        key: 'friendlink',
        render: text => <span>{text}</span>,
      },
      {
        title: '日期',
        dataIndex: 'mtime',
        width: 300,
        key: 'mtime',
        render: text => <span>{toDate(text)}</span>,
      }, 
      {
        title: '编辑',
        key: 'id',
        width: 300,
        render: (text, record) => (
          <span>
            <Button type="danger" size="small" onClick={() => this.del(record.id)} >删除</Button>
          </span>
        ),
      }
    ]
  }

  async del(id) {
    const res = await delMsgItem({id:id})
    if (res.code === 200) {
      message.success(res.msg)
      this.props.getMsgList({page: this.state.page})
    }
  }
  change (page) {
    this.props.getMsgList({page: page.current})
    this.setState({
      page: page.current
    })
  }
  componentWillMount () {
    this.props.getMsgList({page: this.state.page})
  }
  render () {
    const {list=[], count = 1} = this.props.msgData.msgData;
    const pageconfig = {
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: count
    }
    const columns = this.columns
    return (
      <Layout history={this.props.history}>
        <Table 
          onChange={this.change} 
          columns={columns} 
          dataSource={list} 
          pagination = {pageconfig}
          rowKey={record => record.id}
        />
      </Layout>
    )
  }
}


const mapStateToProps = ({ msgData }) => ({ msgData })

const mapDispatchToProps = {
   getMsgList,
   delMsgItem
}

export default connect(mapStateToProps, mapDispatchToProps)(msgList)
