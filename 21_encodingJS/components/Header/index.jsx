import React, { Component } from 'react'
import PropTypes from "prop-types";//这个库需要自己安装:npm i prop-types
import { nanoid } from "nanoid";//这个库需要自己安装:npm i nanoid
import './index.css'
import * as iconv from "iconv-lite"
import Encoding from "encoding-japanese"

export default class index extends Component {

    // 为Header组件添加props限制
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }

    //Shift_jis第一水準と第二水準漢字のチェック
    checkExistIllegalSjis = (keywords) => {

        for (let i = 0; i < keywords.length; i++) {
            let keyword = keywords.charAt(i)
            console.log("转码前:" + Encoding.detect(keyword))
            let keywordCode = Encoding.stringToCode(keyword);
            let sjisArray = Encoding.convert(keywordCode, 'SJIS', 'UNICODE')
            let keywordSjisCode = Encoding.urlEncode(sjisArray).split("%").join("")
            console.log("转SJIS十六进制码:" + keywordSjisCode)
            let sjisKeyword = Encoding.codeToString(sjisArray);
            console.log(sjisKeyword)
            console.log("十六进制码转SJIS文字:" + Encoding.detect(sjisKeyword))
            let numkeywordSjisCode = parseInt(Number("0x" + keywordSjisCode), 10)
            console.log("十六进制码转十进制:" + numkeywordSjisCode);
            const minNum = parseInt(Number("0x889f"), 10)
            const maxNum = parseInt(Number("0x88ae"), 10)
            if (numkeywordSjisCode < minNum || numkeywordSjisCode > maxNum) {
                return true
            }
        }

        return false

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

        //Shift_jis第一水準と第二水準漢字のチェック
        const isExistIllsjis = this.checkExistIllegalSjis(target.value.trim())
        if(isExistIllsjis) {
            alert("Shift_jis第一水準と第二水準漢字以外の文字は禁止です")
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
