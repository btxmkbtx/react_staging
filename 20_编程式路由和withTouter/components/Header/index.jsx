import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
	back = ()=>{
		this.props.history.goBack()
	}

	forward = ()=>{
		this.props.history.goForward()
	}
	
	render() {
		// console.log('Header组件收到的props是',this.props);
		return (
			<div className="page-header">
				<h2>React Router Demo</h2>
				<button onClick={this.back}>回退</button>&nbsp;
				<button onClick={this.forward}>前进</button>&nbsp;
			</div>
		)
	}
}

export default withRouter(Header)
