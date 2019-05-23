import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { changePath } from '../../store/actions/layout';
import navData from './path'
import './../../static/less/layout.less'
  
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const menu = navData.map(function(item,index){
  let childNav = subarr => {
      return subarr.map(function(item){
          return <Menu.Item key={item.path}>{item.name}</Menu.Item>
      })
  }
  if(item.children){
      return <SubMenu key={item.path} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>{childNav(item.children)}</SubMenu>
  }else{
      return <Menu.Item key={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
              </Menu.Item>
  }
})

  
class MLayout extends Component {
    constructor (props) {
        super(props)
        this.state = {
            collapsed: false,
            ss:1
        };
        this.menuClick = this.menuClick.bind(this);
    }
    componentDidMount(){
      console.log(this.props.history.location.pathname);
    }
    onCollapse = (collapsed) => {
      this.setState({ collapsed });
    }
    menuClick (e) {
        this.props.history.push(e.key);
        let mkey = e.item.props.subMenuKey.split("-")[0];
        this.props.changePath({path:e.key,mkey:mkey});
    }

   

    render() {
      let { path,mkey } = this.props.layData.path;
      return (
        <Layout className="gwrap">
          <Layout>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            > 
            <div className="logo">
                  <h1 style={{fontSize:'28px',lineHeight:'80px',textAlign:'center',color:'#fff'}}>Websevan Blog</h1>
              </div>
              <Menu theme="dark"  defaultSelectedKeys={[path]}  defaultOpenKeys={[mkey]} mode="inline" onClick = {this.menuClick}>
                {menu}
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ margin: '0 16px',minHeight:'auto' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
                  {this.props.children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                blog ©2019 Created by sevan
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      );
    }
  }

const mapStateToProps = ({ layData }) => ({ layData })

const mapDispatchToProps =  {
  changePath
}
export default connect(mapStateToProps, mapDispatchToProps)(MLayout);