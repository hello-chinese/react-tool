// 1.引包
import React from 'react'
import ReactDom from 'react-dom'

import TodoItem from './todoItem.jsx'
import Footer from './footer.jsx'

// 2.定义组件
class TodoApp extends React.Component{
  constructor(){
    super()
    this.state={
      todos:[
      {id:1,name:'吃饭',completed:false},
      {id:2,name:'睡觉',completed:false},
      {id:3,name:'学习',completed:true},
      {id:4,name:'学习',completed:false}
      ],
      newTodo:'',
      toggleAll:false // 表示全选或全不选的状态
    }
  }
  // 在组件加载完成之后立即读取数据
  componentDidMount(){
    var str = localStorage.getItem('todos') || '[]'
    this.setState({
      todos:JSON.parse(str)
    })
  }
  componentWillUpdate(){}
  componentDidUpdate(){

    //每次调用了this.setState({})，之后就自动保存数据
    this.save()
  }
  render(){
    //  在每渲染之前，重新计算是否有未完成的任务，如果有this.toggleAll为false，否则为true
    // 只要在遍历时有一个为false就可以结束循环，然后设置this.toggleAll为false
    // 数组的some，可以跳出循环，返回值为true就会跳出
   // [].forEach(function(){
   //   // break;
   // })
   // 计算是否有未完成任务。
   this.state.toggleAll = !this.state.todos.some(item =>{
     if(!item.completed) return true
   })
   // this.state.toggleAll = true
   console.log(this.state.toggleAll)

   // 计算未完成的任务数据
   // var count = 10
   // for (var i = 0; i < Things.length; i++) {
   //   Things[i]
   // }

   // 数组的reduce方法
   // 1.reduce的第二个参数值，是回调第一次时第一个参数的值。
   // 2.每一次回调return的值是下一次回调的第一个参数的值
   // 3.最后一次回调返回的值给了reduce的返回值。
   var count = this.state.todos.reduce(function(a,item){
      if(!item.completed){
        return a+1
      }else{
        return a
      }
    },0)


    return(
      <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form 
          onSubmit={this.hanldeSubmit.bind(this)}>
          {/*在form表单中的input中按下回车键，会触发表单提交事件*/}
          <input
          onChange={this.handleChange.bind(this)}
          value={this.state.newTodo}
          className="new-todo" placeholder="What needs to be / done?"/>
        </form>
      </header>      
      <section className="main">
        <input className="toggle-all"
        onChange={this.toggleAllState.bind(this)}
        checked={this.state.toggleAll}
         type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {
            //这里应该有个组件，被遍历
          }
          {
            this.state.todos.map( todo =>{
            return (
              <TodoItem 
                key={todo.id}  
                todo={todo}
                edit={this.edit.bind(this,todo)}
                toggleState={this.toggleState.bind(this,todo)}
                delete={this.delete.bind(this,todo)}
                />
             )
            })
          }
        </ul>
      </section>
      <Footer 
      count={count}
      clearCompleted={this.clearCompleted.bind(this)}/>
    </section>
    )
  }
  // 6.toggleAllState, 批量修改任务状态
  toggleAllState(){
    // 遍历数组让所有数据的completed属性为true/false
    let newTodos = this.state.todos.map(item => {
      item.completed = !this.state.toggleAll
      return item
    })

    this.state.toggleAll = !this.state.toggleAll

    // 通知组件渲染
    this.setState({
      todos:newTodos
    })
  }

  // 清除所有已完成任务,completed = true
  clearCompleted(){
    let newTodos = this.state.todos.filter(item =>{
      if(!item.completed){
        return true
      }else{
        return false
      }
    })

    this.setState({
      todos: newTodos
    })
  }


  // 5.删除任务
  delete(todo){
     // 数组的filter方法，此时接收到的就是一个没有todo的数组
    let newTodos =  this.state.todos.filter( item => {
      // 如果这个当前返回true,会把当前元素拼到返回值中做为数组。
      if(item.id == todo.id){
        return false
      }else{
        return true
      }
     })
    this.setState({
      todos: newTodos
    })
    // 从数组中删除元素. splice  10 ,  [1,2,3,4,5,6,7,8,9,10]
    // for (var i = 0; i < Things.length; i++) {
    //    i = 3 // 
    // }
  }
  // 4.切换任务状态
  toggleState(todo){
    todo.completed = !todo.completed
    this.setState({})
  }

  // 保存数据到本地存储
  // 3.
  save(){
    let str = JSON.stringify(this.state.todos)
    localStorage.setItem('todos',str)
  }

  // 3.编辑数据
  edit(todo){
    
    // 只需要通知组件重新渲染,父组件更新，子组件跟着更新
    this.setState({})
  }

  // 2.添加数据
  hanldeSubmit(e){
    e.preventDefault()
    // console.log(111)
    if(!this.state.newTodo.trim()){return}

    this.state.todos.push({
      id:Math.random(),
      name:this.state.newTodo,
      completed:false
    })
    this.state.newTodo = '' // 清空
    this.setState({})
  }

  // 2.添加数据input框（双向）
  handleChange(event){
    // currentTarget
    this.setState({
      newTodo: event.target.value
    })
  }
}

// 3.渲染组件
ReactDom.render(
  <TodoApp />,
  document.getElementById('box')
  )