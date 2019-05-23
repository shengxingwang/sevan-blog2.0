import React, { Component } from 'react'
import { Table, Divider, message, Button } from 'antd';
// import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getNewList, hideNewsItem, showNewsItem, delNewsItem } from '../store/actions/news';
import Layout from '../components/layout';

const toDate = str => {
  const date = new Date(str)
  return `${date.getFullYear()} -${date.getMonth()+1}- ${date.getDate()}`
}

class newsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1
    }
    this.change = this.change.bind(this)
    this.columns = [
      {
        title: '内容',
        dataIndex: 'ndesc',
        key: 'ndesc',
        width:300,
        render: text => <span>{text}</span>,
      }, 
      {
        title: '日期',
        dataIndex: 'ptime',
        width: 200,
        key: 'ptime',
        render: text => <span>{toDate(text)}</span>,
      }, 
      {
        title: '图片',
        width: 300,
        dataIndex: 'imgurl',
        key: 'imgurl',
        render: arr=> (
          <span>
            {arr.length ? arr.split("|").map((item,i) => 
              <img key={i} style={{widht:'60px',height:'60px'}} src={item} alt="img"></img>
            ):<span>无图</span>}
          </span>
        )
      },
      {
        title: '编辑',
        key: 'id',
        width: 300,
        render: (text, record) => (
          <span>
            <a href={`http://localhost:3000/#/my/itemArt/${record.nid}`} target="_brank">查看</a>
            <Divider type="vertical" />
            <Button type="danger" size="small" onClick={() => this.del(record.nid)} >删除</Button>
            <Divider type="vertical" />
            {
                record.isshow==1 ?  <Button type="danger" size="small" onClick={() => this.hid(record.nid)} >隐藏</Button> : 
                <Button type="danger" size="small" onClick={() => this.shw(record.nid)} >显示</Button>
            }
           
          </span>
        ),
      }
    ]
  }

  async del(id) {
    const res = await delNewsItem({id:id})
    if (res.code === 200) {
      message.success(res.msg)
      this.props.getNewList({page: this.state.page})
    }
  }

  async shw(id) {
    const res = await showNewsItem({id:id})
    if (res.code === 200) {
      message.success(res.msg)
      this.props.getNewList({page: this.state.page})
    }
  }

  async hid(id) {
    const res = await hideNewsItem({id:id})
    if (res.code === 200) {
      message.success(res.msg)
      this.props.getNewList({page: this.state.page})
    }
  }
  change (page) {
    this.props.getNewList({page: page.current})
    this.setState({
      page: page.current
    })
  }
  componentWillMount () {
    this.props.getNewList({page: this.state.page})
  }
  render () {
    const {list=[], count = 1} = this.props.newsData.newsData;
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
          rowKey={record => record.nid}
        />
      </Layout>
    )
  }
}


const mapStateToProps = ({ newsData }) => ({ newsData })

const mapDispatchToProps = {
   getNewList,
   hideNewsItem
}

export default connect(mapStateToProps, mapDispatchToProps)(newsList)
