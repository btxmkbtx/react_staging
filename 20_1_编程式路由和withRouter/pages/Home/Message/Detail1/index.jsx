import React, { Component } from 'react'

const DetailData = [
	{id:'01',content:'你好，佑佑'},
	{id:'02',content:'你好，朱庭瑞'},
	{id:'03',content:'你好，ニワズイ'}
]
export default class Detail1 extends Component {
    render() {
        const {id,title} = this.props.match.params
        const findResult = DetailData.find((detailObj) => {
            return detailObj.id === id
        }) || {}
        return (
            <ul>
                <li>ID:{id}</li>
                <li>Title:{title}</li>
                <li>Content:{findResult.content}</li>
            </ul>
        )
    }
}
