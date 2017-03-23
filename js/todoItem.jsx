// 1.引包
import React from 'react'
import classNames from 'classnames'

// 2.创建组件

class TodoItem extends React.Component{
  constructor(){
    super()
    this.state={
      editing:false,
      tmpData:'' // 编辑时的临时任务名
    }
  }
  componentDidMount(){
    this.state.tmpData = this.props.todo.name
  }
  componentDidUpdate(){

    // 这在里调用 ，是为了保证，当前dom元素已经显示出来
    this.refs.myEdit.focus()
  }
  render(){
    return (
      <li className={classNames({
        completed:this.props.todo.completed,
        editing:this.state.editing
      })}>
           <div className="view">
              <input className="toggle" type="checkbox"
              onChange={this.props.toggleState}
              checked={this.props.todo.completed} />
              <label
              onDoubleClick={this.handeEdit.bind(this)}
              >{this.props.todo.name}</label>
              <button className="destroy"
              onClick={this.props.delete}></button>
            </div>
            <input
            ref="myEdit"
            className="edit"
            onBlur={this.handleBlur.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            value={this.state.tmpData} />
          </li>
      )
  }

  // 3.2 失去焦点事件
  handleBlur(){
    // a.隐藏编辑框，
    this.setState({editing:false})
    // b.保存数据
    this.props.todo.name = this.state.tmpData
    this.props.edit()
  }

  // input编辑框中键盘按下事件
  handleKeyDown(event){
    // console.log(event.keyCode)
    switch(event.keyCode){
      case 27: // 如果是按下了esc，我们就隐藏编辑框
          this.setState({
            editing:false
          })
      break;
      case 13:
         // a.隐藏文本框
         this.setState({editing:false})
         // b.更新数据
         this.props.todo.name = this.state.tmpData
         this.props.edit()
      break;
    }
  }

  // 3.编辑,双击时显示编辑的文本框
  handeEdit(){
     this.setState({ //
       editing:true,
       // 每次双击时，重新给编辑框赋值
       tmpData:this.props.todo.name
     })

  }
  // 3.文本框编辑，双向
  handleChange(event){
    // 由于我们要做，取消操作，就不直接把数据保存起来了
    // 我们临时存储数据，当按下回车时再保存数据
    this.state.tmpData = event.target.value
    this.setState({})
    // this.props.todo.name = event.target.value
    // this.props.edit() //
    // this.setState({
    //   this.
    // })
    
  }
}
// 3.导出组件

export default TodoItem