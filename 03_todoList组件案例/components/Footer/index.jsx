import React, { Component } from 'react'
import './index.css'

export default class index extends Component {

    handlerCheckAll = (e) => {
        this.props.checkAllTodos(e.target.checked)
    }

    handlerClearAllDone = () => {
        this.props.clearAllDone()
    }

    render() {
        const { todos } = this.props
        const doneCount = todos.reduce((pre, currentTodo)=>{return currentTodo.done?(pre+1):pre},0)
        const todosCount = todos.length
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={doneCount===todosCount&&todosCount!==0?true:false} onChange={(e) => this.handlerCheckAll(e)}/>
                </label>
                <span>
                    <span>已完成{doneCount}</span> / 全部{todosCount}
                </span>
                <button className="btn btn-danger" onClick={this.handlerClearAllDone}>清除已完成任务</button>
            </div>
        )
    }
}
