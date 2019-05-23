import React, { Component } from 'react';
import {
    Form,
    Input,
    Button,
    Upload,
    Icon,
    Modal,
    AutoComplete,
    message
  } from 'antd';
  import axios from 'axios';
  import{ imgUpURL } from './../config'
  import { putNews } from './../api'
  
  const AutoCompleteOption = AutoComplete.Option;

  class addNews extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        fileUrlArr:[],
        autoCompleteResult:[]
    };
    handleCancel = () => this.setState({ previewVisible: false });

    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.club','.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    };

    handlePreview = file => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    };
    customRequest = (files) => {
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        const { file } = files
        let formData = new FormData();
        formData.append("file", file);
        axios.post(imgUpURL,formData,config).then(res=>{
            let data = res.data; 
            if(data.code===200){
                let url = data.data;
                let obj = {
                  status: 'done',
                  url:url
                }
                this.state.fileUrlArr.push(url)
                this.state.fileList.push(obj);
                this.state.fileList.map( (v, i) => {
                  v.name = "nesimg"+i;
                  v.uid = i;
                })
                this.setState({
                  fileUrlArr:this.state.fileUrlArr,
                  fileList:this.state.fileList
                })
                message.success(data.msg)
            }else{
                message.error("上传失败！")
            }
        })
    }

     handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let { fileUrlArr } = this.state;
          values.imgurl = fileUrlArr.join("|");
          putNews(values).then( res => {
              if(res.code===200){
                message.success('发布成功！');
                this.props.form.resetFields();
                this.setState({
                  fileUrlArr:[],
                  fileList:[]
                })
              }else{
                message.error(res.msg);
              }
          });
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
      const { previewVisible, previewImage, fileList } = this.state;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">上传</div>
        </div>
      );

      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));

      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="内容">
            {getFieldDecorator('ndesc', {
              rules: [
                {
                  required: true,
                  message: '请输入动态内容',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.TextArea />)}
          </Form.Item>
          <Form.Item label="链接">
            {getFieldDecorator('turnurl', {
              rules: [{ required: false, message: '请输入外部链接' }],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="www.websevan.club"
              >
                <Input />
              </AutoComplete>,
            )}
          </Form.Item>
          <Form.Item  label="图片">
            <Upload
                action = {imgUpURL}
                customRequest={this.customRequest}
                listType="picture-card"
                fileList={fileList}
                multiple={true}
                name="file"
                headers={this.state.headers}
                onPreview={this.handlePreview}
                onRemove={()=> false}
                >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          <Form.Item  {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">发布</Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
    const addNew = Form.create({ name: 'addNews' })(addNews);
 
    export default addNew;