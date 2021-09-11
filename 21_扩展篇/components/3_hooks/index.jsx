import React from 'react'
import ReactDOM from 'react-dom'

//类式组件
/* class Demo extends React.Component {

	state = {count:0}

	myRef = React.createRef()

	add = ()=>{
		this.setState(state => ({count:state.count+1}))
	}

	unmount = ()=>{
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	show = ()=>{
		alert(this.myRef.current.value)
	}

	componentDidMount(){
		this.timer = setInterval(()=>{
			this.setState( state => ({count:state.count+1}))
		},1000)
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}

	render() {
		return (
			<div>
				<input type="text" ref={this.myRef}/>
				<h2>当前求和为{this.state.count}</h2>
				<button onClick={this.add}>点我+1</button>
				<button onClick={this.unmount}>卸载组件</button>
				<button onClick={this.show}>点击提示数据</button>
			</div>
		)
	}
} */

function Demo() {

	//这里用到数组的解构赋值写法，只要顺序写对就可以正确赋值
	const [count, setCount] = React.useState(0)//useState接收一个参数，即为state的初始值
	const [name, setName] = React.useState("Tom")
	const myRef = React.useRef()

	React.useEffect(() => {
		let timer = setInterval(() => {
			setCount(count => count + 1)
		}, 1000)
		return () => {
			clearInterval(timer)
		}
	}, [])

	//加的回调
	function add() {
		//setCount(count+1) //第一种写法
		setCount(count => count + 1)
	}

	//改名的回调
	function change() {
		setName('Jack')
	}

	//提示输入的回调
	function show() {
		alert(myRef.current.value)
	}

	//卸载组件的回调
	function unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	return (
		<div>
			<input type="text" ref={myRef} />
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>点我+1</button>
			<button onClick={unmount}>卸载组件</button>
			<button onClick={show}>点我提示数据</button>
			<h2>当前名称为：{name}</h2>
			<button onClick={change}>点我改名</button>
			
		</div>
	)
}

export default Demo
