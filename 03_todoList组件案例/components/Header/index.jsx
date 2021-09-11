import React, { Component } from 'react'
import PropTypes from "prop-types";//这个库需要自己安装:npm i prop-types
import { nanoid } from "nanoid";//这个库需要自己安装:npm i nanoid
import './index.css'

export default class index extends Component {

    // 为Header组件添加props限制
    static propTypes = {
        addTodo:PropTypes.func.isRequired
    }

    handlerKeyUp = (event) => {
        const { target, keyCode } = event
        //判断是否是回车
        if (keyCode !== 13) return
        //判断是否是空内容
        if (target.value.trim() === '') {
            alert("输入不能为空")
            return
        }
        //构建一个追加todo对象
        const todoObj = { id: nanoid(), name: target.value, done: false }
        //调用父组件传来的addTodo函数
        this.props.addTodo(todoObj)
        //清空输入框
        target.value = ''
    }

    render() {
        return (
            <div className="todo-header">
                <input type="text" onKeyUp={this.handlerKeyUp} placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}
