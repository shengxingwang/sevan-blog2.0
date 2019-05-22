import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import '../static/less/login.less';
import { login } from '../api';


const FormItem = Form.Item;

class Login extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
		  if (!err) {
				this.toLogin(values)
		  }
		})
	}
	async toLogin (prams) {
		const {userid, pwd} = prams;
		const res = await login({userid, pwd})
		if (res.code === 200) {
			window.sessionStorage.setItem('TOKEN', res.data.token);
			this.props.history.push('/home');
		}
	}
  render() {
		const { getFieldDecorator } = this.props.form
		return (
			<div className="loginBox">
				<div className="loginmark"></div>
				<div className="loginContent">
					<Form onSubmit={this.handleSubmit} className="loginForm">
						<FormItem>
							{getFieldDecorator('userid', {
								rules: [{ required: true, message: '请输入你的用户名!' }],
							})(
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入你的用户名" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('pwd', {
								rules: [{ required: true, message: '请输入你的密码!' }],
							})(
								<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入你的密码" />
							)}
						</FormItem>
						<FormItem>
							{/* {getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(
								<Checkbox>记住我</Checkbox>
							)} */}
							{/* <a className="loginFormForgot" href="">忘记密码</a> */}
							<Button type="primary" htmlType="submit" className="loginFormButton">
								登录
							</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
}

export default Form.create()(Login)