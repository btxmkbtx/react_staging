import React, { Component } from 'react'
import qs from "querystring"

const DetailData = [
	{id:'01',content:'你好，佑佑'},
	{id:'02',content:'你好，朱庭瑞'},
	{id:'03',content:'你好，ニワズイ'}
]
export default class Detail2 extends Component {
    render() {
        const {search} = this.props.location
        const {id,title} = qs.parse(search.slice(1))
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
