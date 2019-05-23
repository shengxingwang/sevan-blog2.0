
import React, { Component } from 'react'
import { Table, Form, Input, Divider, message, Button, Modal } from 'antd'
import {connect } from 'react-redux'
import { getTag, toEditeTag, delectTag } from '../store/actions/taglist';
import { addTag } from '../api';
import Layout from '../components/layout'

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
)
const FormItem = Form.Item;


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate
      } = this.props;
      const { getFieldDecorator } = this.props.form;
      return (
        <Modal
          title="新增标签"
          visible={visible}
          onCancel={onCancel}
          onOk={onCreate}
          okText="保存"
          cancelText='取消'
        >
          <Form layout="vertical">
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入你的标签名' }],
              })(
                <Input placeholder="请输入你的标签名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('descript', {
                rules: [{message: '请输入标签描述' }],
              })(
                <Input placeholder="请输入标签描述" />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);



class Tag extends Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '标签名',
      dataIndex: 'tag',
      width: '30%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '描述',
      dataIndex: 'descript',
      width: '40%',
      render: (text, record) => this.renderColumns(text, record, 'descript'),
    }, {
      title: '功能',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <Button type="primary" size="small" onClick={() => this.save(record)}>保存</Button>
                  <Divider type="vertical" />
                  <Button type="dashed" size="small" onClick={() => this.cancel(record.tid)}>取消</Button>
                </span>
                : 
                <span>
                  <Button type="primary" size="small"  onClick={() => this.edit(record.tid)}>编辑</Button>
                  <Divider type="vertical" />
                  <Button type="danger" size="small" onClick={() => this.del(record.tid)} >删除</Button>
                </span>
            }
          </div>
        )
      },
    }]
    this.state = { 
      data: [],
      showAddTag:false
    }
    this.cacheData = [];
    this.addTag = this.addTag.bind(this);
    this.canceModel = this.canceModel.bind(this);
    this.saveTag = this.saveTag.bind(this);
    
  }
  addTag() {
    this.setState({
      showAddTag:true
    })
  }
  canceModel(){
    this.setState({
      showAddTag:false
    })
  }
  saveTag(e){
    const form = this.formRef.props.form;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
          const {name, descript = ''} = values
          addTag({name, descript}).then(res => {
            if (res.code === 200) {
              message.success(res.msg);
              form.resetFields();
              this.getTag();
              this.setState({
                showAddTag:false
              })
            }
          })
        }
    });
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.tid, column)}
      />
    )
  }
  handleChange(value, id, column) {
    const newData = this.state.data||[]
    const target = newData.filter(item => id === item.tid)[0]
    if (target) {
      target[column] = value
      this.setState({ data: newData })
    }
  }
  edit(id) {
    const list = this.state.data||[];
    const target = list.filter(item => id === item.tid)[0]
    if (target) {
      target.editable = true
      this.setState({ data:list}) 
    }
  }
  async del(id) {
    const res = await delectTag(id)
    if (res.code === 200) {
      message.success(res.msg)
      this.getTag()
    }
  }
  async save(record) {
    const { tid } = record
    const newData =this.state.data||[];
    const target = newData.filter(item => tid === item.tid)[0]
    if (target) {
      delete target.editable
      const {tag, descript} = target
      const res = await toEditeTag({tag, descript, tid})
      if (res.code === 200) {
        message.success(res.msg)
        this.getTag()
      }
    }
  }
  cancel(id) {
    const newData = this.state.data||[];
    const target = newData.filter(item => id === item.tid)[0]
    if (target) {
      Object.assign(target, this.cacheData.filter(item => id === item.tid)[0])
      delete target.editable
      this.setState({ data: newData })
    }
  }
  getTag () {
    this.props.getTag()
    .then(res=> {
      this.setState({
        data: res.data.list
      })
      this.cacheData = res.data.list;
    })
  }
  componentWillMount () {
    this.getTag()
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    let list = this.props.tagData.tags||[];
    return (
      <Layout history={this.props.history}>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.showAddTag}
          onCancel={this.canceModel}
          onCreate={this.saveTag}
        />
        <Button className="addtag" type="primary" icon="plus" onClick={this.addTag}>新增标签</Button>
        <Table bordered dataSource={list} columns={this.columns} rowKey={record => record.id} />
      </Layout>
    )
  }
}

const mapStateToProps = ({ tagData }) => ({ tagData })

const mapDispatchToProps ={
    getTag
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag)
