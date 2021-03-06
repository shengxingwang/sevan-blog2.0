/**
 * @file
 * @author 盛兴旺
 * @date 2019/4/23
 */
import React, {Component} from 'react'
import marked from 'marked'
import cNames from 'classnames'
import './editor.less'

class MdEditor extends Component{
  constructor(props) {
    super(props);
    this.state = {
      onoff: false,
      panelClass: 'md-panel',
      mode: 'split',
      _isDirty:true,
      isFullScreen: false,
      result: marked(props.content || '')
    }
  }
  componentDidUpdate(){
    if (!this.state.onoff && this.props.content) {
      this.setState({
        onoff: true,
        result: marked(this.props.content || '')
      })
      this.textControl.value = this.props.content
    }
  }
  componentDidMount () {
    // cache dom node
    this.textControl = this.refs.editor
    this.previewControl = this.refs.preview
    this.textControl.value = this.props.content
  }
  componentWillUnmount () {
    this.textControl = null
    this.previewControl = null
  }
  render () {
    const panelClass = cNames([ 'md-panel', { 'fullscreen': this.state.isFullScreen } ])
    const editorClass = cNames([ 'md-editor', { 'expand': this.state.mode === 'edit' } ])
    const previewClass = cNames([ 'md-preview', 'markdown', { 'expand': this.state.mode === 'preview', 'shrink': this.state.mode === 'edit' } ])
    return (
      <div className={panelClass}>
        <div className="md-menubar">
          {this._getModeBar()}
          {this._getToolBar()}
        </div>
        <div className={editorClass}>
          <textarea 
            ref="editor" 
            name="content"
            onChange={this._onChange.bind(this)}>
          </textarea>{/* style={{height: this.state.editorHeight + 'px'}} */}
        </div>
        <div className={previewClass} ref="preview" dangerouslySetInnerHTML={{ __html: this.state.result }}></div>
        <div className="md-spliter"></div>
      </div>
    )
  }
  isDirty () {
    return this.state._isDirty || false
  }
  getValue () {
    return this.state.content
  }
  // widgets constructors
  _getToolBar () {
    return (
      <ul className="md-toolbar clearfix" style={{borderBottom: "1px solid #ccc"}}>
        <li className="tb-btn"><a title="加粗" onClick={this._boldText.bind(this)}><i className="
        iconfont">&#xe61e;</i></a></li>{/* bold */}
        <li className="tb-btn"><a title="斜体" onClick={this._italicText.bind(this)}><i className="iconfont">&#xe65a;</i></a></li>{/* italic */}
        <li className="tb-btn spliter"></li>
        <li className="tb-btn"><a title="链接" onClick={this._linkText.bind(this)}><i className="iconfont">&#xe665;</i></a></li>{/* link */}
        <li className="tb-btn"><a title="引用" onClick={this._blockquoteText.bind(this)}><i className="iconfont">&#xe715;</i></a></li>{/* blockquote */}
        <li className="tb-btn"><a title="代码段" onClick={this._codeText.bind(this)}><i className="iconfont">&#xe605;</i></a></li>{/* code */}
        <li className="tb-btn"><a title="图片" onClick={this._pictureText.bind(this)}><i className="iconfont">&#xe611;</i></a></li>{/* picture-o */}
        <li className="tb-btn spliter"></li>
        <li className="tb-btn"><a title="有序列表" onClick={this._listOlText.bind(this)}><i className="iconfont">&#xe67e;</i></a></li>{/* list-ol */}
        <li className="tb-btn"><a title="无序列表" onClick={this._listUlText.bind(this)}><i className="iconfont">&#xe645;</i></a></li>{/* list-ul */}
        <li className="tb-btn"><a title="标题" onClick={this._headerText.bind(this)}><i className="iconfont">&#xe607;</i></a></li>{/* header */}
        {this._getExternalBtn()}
      </ul>
    )
  }
  _getExternalBtn () {
    return React.Children.map(this.props.children, (option) => {
      if (option.type === 'option') {
        return <li className="tb-btn"><a {...option.props}>{option.props.children}</a></li>
      }
    })
  }
  _getModeBar () {
    const checkActive = (mode) => cNames({ active: this.state.mode === mode })
    return (
      <ul className="md-modebar">
        <li className="tb-btn pull-right">
          <a className={checkActive('preview')} onClick={this._changeMode('preview')} title="预览模式">
          <i className="iconfont">&#xe7b9;</i>
          </a>
        </li> { /* preview mode */ }
        <li className="tb-btn pull-right">
          <a className={checkActive('split')} onClick={this._changeMode('split')} title="分屏模式">
            <i className="iconfont">&#xe613;</i>
          </a>
        </li> { /* split mode */ }
        <li className="tb-btn pull-right">
          <a className={checkActive('edit')} onClick={this._changeMode('edit')} title="编辑模式">
            <i className="iconfont">&#xe636;</i>
          </a>
        </li> { /* edit mode */ }
        <li className="tb-btn spliter pull-right"></li>
        <li className="tb-btn pull-right"><a title="全屏模式" onClick={this._toggleFullScreen.bind(this)}><i className="iconfont">&#xe612;</i></a></li> {/* full-screen */}
      </ul>
    )
  }
  // event handlers
  _onChange (e) {
    const self = this;
    this.setState({
      _isDirty: true
    })
    if (this._ltr) clearTimeout(this._ltr)
    this._ltr = setTimeout(() => {
      this.setState({ result: marked(this.textControl.value) }) // change state
      this.props.editorChange(this.textControl.value, this.state.result)
    }, 300)
  }
  _changeMode (mode) {
    return (e) => {
      this.setState({ mode })
    }
  }
  _toggleFullScreen (e) {
    this.setState({ isFullScreen: !this.state.isFullScreen })
  }
  // default text processors
  _preInputText (text, preStart, preEnd) {
    const start = this.textControl.selectionStart
    const end = this.textControl.selectionEnd
    const origin = this.textControl.value

    if (start !== end) {
      const exist = origin.slice(start, end)
      text = text.slice(0, preStart) + exist + text.slice(preEnd)
      preEnd = preStart + exist.length
    }
    this.textControl.value = origin.slice(0, start) + text + origin.slice(end)
    // pre-select
    this.textControl.setSelectionRange(start + preStart, start + preEnd)
    this.setState({ result: marked(this.textControl.value) }) // change state
  }
  _boldText () {
    this._preInputText("**加粗文字**", 2, 6)
  }
  _italicText () {
    this._preInputText("_斜体文字_", 1, 5)
  }
  _linkText () {
    this._preInputText("[链接文本](www.yourlink.com)", 1, 5)
  }
  _blockquoteText () {
    this._preInputText("> 引用", 2, 4)
  }
  _codeText () {
    this._preInputText("```\ncode block\n```", 4, 14)
  }
  _pictureText () {
    this._preInputText("![alt](www.yourlink.com)", 2, 5)
  }
  _listUlText () {
    this._preInputText("- 无序列表项0\n- 无序列表项1", 2, 8)
  }
  _listOlText () {
    this._preInputText("1. 有序列表项0\n2. 有序列表项1", 3, 9)
  }
  _headerText () {
    this._preInputText("## 标题", 3, 5)
  }
}

export default MdEditor
