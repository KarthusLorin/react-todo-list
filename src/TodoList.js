import React, {Component, Fragment} from 'react'
import TodoItem from './TodoItem'
import './style.css'

class TodoList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  render () {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input
            id="insertArea"
            className="input"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>
          {this.getTodoItem()}
        </ul>
      </Fragment>
    )
  }

  // 减少模板中逻辑，抽离逻辑
  getTodoItem () {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          content={item}
          index={index}
          key={index}
          deleteItem={this.handleItemDelete}
        />
      )
    })
  }

  handleInputChange (e) {
    const value = e.target.value
    this.setState(() => {
      return {
        inputValue: value
      }
    })
  }

  handleBtnClick () {
    // prevState 是 state 改变前的状态
    this.setState((prevState) => {
      return {
        list: [...prevState.list, prevState.inputValue],
        inputValue: ''
      }
    })
  }

  handleItemDelete (index) {
    // immutable
    // state 不允许我们做任何直接的改变，所以，先拷贝出来
    this.setState((prevState) => {
      const list = [...prevState.list]
      list.splice(index, 1)
      return {
        list
      }
    })
  }
}

export default TodoList
