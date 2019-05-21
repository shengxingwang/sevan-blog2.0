import React, { Component } from 'react'
import { Table, Divider, message, Button } from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getArticle, delectArticle } from '../store/actions/article';
import Layout from '../components/layout';

const toDate = str => {
  const date = new Date(str)
  return `${date.getFullYear()} -${date.getMonth()+1}- ${date.getDate()}`
}

class ArticleList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1
    }
    this.change = this.change.bind(this)
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 300,
        render: text => <span>{text}</span>,
      }, 
      {
        title: '日期',
        dataIndex: 'update_at',
        width: 200,
        key: 'update_at',
        render: text => <span>{toDate(text)}</span>,
      }, 
      {
        title: '标签',
        width: 250,
        dataIndex: 'tag',
        key: 'tag',
        render: arr=> (
          <span>
            {arr.split("|").map(item => 
              <i key={item} style={{paddingRight: '15px'}}>{item}</i>
            )}
          </span>
        )
      },
      {
        title: '编辑',
        key: 'id',
        render: (text, record) => (
          <span>
            <a href={`http://localhost:3000/#/my/itemArt/${record.aid}`} target="_brank">查看</a>
            <Divider type="vertical" />
            <Link to={`/home/edite/${record.aid}`}>修改</Link>
            <Divider type="vertical" />
            <Button type="danger" size="small" onClick={() => this.del(record.aid)} >删除</Button>
          </span>
        ),
      }
    ]
  }

  async del(id) {
    const res = await delectArticle({id:id})
    if (res.code === 200) {
      message.success(res.msg)
      this.props.getArticle({page: this.state.page})
    }
  }
  change (page) {
    this.props.getArticle({page: page.current})
    this.setState({
      page: page.current
    })
  }
  componentWillMount () {
    this.props.getArticle({page: this.state.page})
  }
  render () {

    const {list=[], totalPage={}} = this.props.article.articleList;
    console.log(this.props.article);
    const page = {
      total: totalPage || 0
    }
    const columns = this.columns
    return (
      <Layout history={this.props.history}>
        <Table 
          onChange={this.change} 
          columns={columns} 
          dataSource={list} 
          pagination = {page}
          rowKey={record => record.id}
        />
      </Layout>
    )
  }
}


const mapStateToProps = ({ article }) => ({ article })

const mapDispatchToProps = {
   getArticle
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
