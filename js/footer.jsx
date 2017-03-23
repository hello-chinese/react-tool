import React from 'react'

class Footer extends React.Component{
  render(){
    return(
      <footer className="footer">        
        <span className="todo-count"><strong>{this.props.count}</strong> item left</span>        
        <ul className="filters">
          <li>
            <a className="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>        
        <button 
        className="clear-completed"
        onClick={this.props.clearCompleted}
        >Clear completed</button>
      </footer>
      )
  }
}

export default Footer