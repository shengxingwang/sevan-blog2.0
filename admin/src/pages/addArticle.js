
import React, { Component } from 'react'
import { Input, Select, Button, message } from 'antd'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import Editor from '../components/markdowm'
// import SubTitle from '../components/subTitle'
import { addArticle } from '../store/actions/article';
import { getTag } from '../store/actions/taglist';


const { TextArea } = Input;
const Option = Select.Option;
let eTimer = null
let tagArr = []

class addArticleComponent extends Component {
  constructor(props){
    super(props)
    this.state={
      content: '',
      title: '',
      descript: '',
      editContent: '',
      keyword: ''
    }
    this.tagChange = this.tagChange.bind(this)
    this.sub = this.sub.bind(this)
    this.toTitleChange = this.toTitleChange.bind(this)
    this._editorChange = this._editorChange.bind(this)
  }
  tagChange(value) {
    tagArr = value
  }
  _editorChange(content, outcontent) {
    clearInterval(eTimer)
    eTimer = setTimeout(()=> {
      this.setState({
        content: content,
        editContent: outcontent
      })
    }, 60)
  }
  toTitleChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }
  async sub () {
    const res = await addArticle({...this.state, tag: tagArr})
    if (res.code === 200) {
      message.success(res.msg)
      this.props.history.push('/home/artlist')
    } 
  }
  componentWillMount () {
    this.props.getTag()
  }
  render () {
    const list = this.props.tagData.tags||[];
    return (
      <Layout history={this.props.history}>
        {/* <SubTitle title="新增文章" /> */}
        <Input
          onChange={e => this.toTitleChange('title', e)}
          placeholder="请输入一个响亮的标题吧"
        />
        <TextArea 
          value={this.state.descript}
          style={{"marginTop": "24px"}}
          rows={2} 
          onChange={e => this.toTitleChange('descript', e)}
          placeholder="给你的文章做个描述"
        />
        <Input
          style={{"margin": "24px 0"}} 
          onChange={e => this.toTitleChange('keyword', e)}
          placeholder="请输入关键字用逗号分开（,）"
        />
        <Select
          size="large"
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="选择一个标签吧"
          defaultValue={[]}
          onChange={this.tagChange}
        >
          {
            list.map(item => {
              return <Option key={item.tid}>{item.tag}</Option>
            })
          }
        </Select>
        <Editor content={this.state.content} editorChange={this._editorChange} />
        <div style={{"margin": "24px 0","overflow":"hidden"}}>
          <Button 
            style={{"float": "right"}} 
            type="primary" 
            size="large"
            onClick={this.sub}
          >提交</Button>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ tagData }) => ({ tagData })

const mapDispatchToProps = {
    getTag
}

export default connect(mapStateToProps, mapDispatchToProps)(addArticleComponent)

