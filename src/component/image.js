import React, { useState, useEffect, useRef } from 'react'

const Image = ()=>{

    const [fileAttr, setFileAttr] = useState({
        file: null,//选中的图片文件
        dataUrl: '',//选中的文件的原始的base64字符串
        times: 1, //拖拽区图片倍率
        startX: 0,//鼠标拖拽开始横坐标
        startY: 0,//鼠标拖拽开始纵坐标
        startDrag: false,//开始拖动
        preOffsetX: 0,//上次拖动后的横坐标偏移量
        preOffsetY: 0,//上次拖动后的纵坐标偏移量
        avatarDataURL: ""
    })

    const imgRef = useRef()
    const canvasRef = useRef()
    const avatarRef = useRef()

    //选择上传图片
    const handleChange = (event)=>{
        let file = event.target.files[0]
        let fileReader = new FileReader()
        fileReader.onload = (event) => {//readAsDataURL成功后会进入到这个回调
            setFileAttr({
                file,//文件上传控件传递过来的文件对象
                dataUrl:event.target.result, //readAsDataURL的结果
                //第一次加载一个新图片时，下面的状态全部需要初始化
                times: 1, 
                startX: 0,
                startY: 0,
                startDrag: false,
                preOffsetX: 0,
                preOffsetY: 0,
                avatarDataURL: ""
            })
            imgRef.current.onload = ()=>{drawImage(0,0)}
        }
        fileReader.readAsDataURL(file)
    }

    const bigger = ()=>{
        setFileAttr({...fileAttr,times:fileAttr.times+0.1})
    }
    const smaller = ()=>{
        const times = fileAttr.times-0.1
        if(times > 0){
            setFileAttr({...fileAttr,times:fileAttr.times-0.1})
        }
    }

    const handleMouseDown = (event) => {
        setFileAttr({...fileAttr, startX:event.clientX, startY:event.clientY, startDrag:true})
    }

    const handleMouseMove = (event) => {
        if(fileAttr.startDrag){
            const offsetX = event.clientX - fileAttr.startX + fileAttr.preOffsetX
            const offsetY = event.clientY - fileAttr.startY + fileAttr.preOffsetY
            drawImage(offsetX, offsetY)
        }
    }
    
    const handleMouseUp = (event) => {
        //计算拖拽完成后的最新偏移量
        const preOffsetX = event.clientX - fileAttr.startX + fileAttr.preOffsetX
        const preOffsetY = event.clientY - fileAttr.startY + fileAttr.preOffsetY
        setFileAttr({...fileAttr, startDrag:false, preOffsetX, preOffsetY})
    }

    const confirm = (event) => {
        let canvasDom = canvasRef.current
        let ctx = canvasDom.getContext('2d')
        const avatarData = ctx.getImageData(100,100,100,100)
        let avatarCanvasDom = document.createElement('canvas')
        avatarCanvasDom.width=100
        avatarCanvasDom.height=100
        let avatarCtx = avatarCanvasDom.getContext('2d')
        avatarCtx.putImageData(avatarData, 0, 0)
        let avatarDataURL = avatarCanvasDom.toDataURL() //所谓的dataURL就是一段base64码
        avatarRef.current.src=avatarDataURL
        setFileAttr({...fileAttr, avatarDataURL})
    }

    const upload = (event) => {
        if(fileAttr.avatarDataURL===""){
            return
        }
        //atob是javascript内置的base64解码函数，可以把base64解码为byte, 它的反向操作是btoa函数
        let bytes = atob(fileAttr.avatarDataURL.split(',')[1])
        let arrayBuffer = new ArrayBuffer(bytes.length)
        let uint8Array = new Uint8Array(arrayBuffer)
        for(let i = 0; i < bytes.length; i++){
            uint8Array[i] = bytes.charCodeAt(i)
        }
        let blob = new Blob([uint8Array], {type:'image/jpg'})
        let request = new XMLHttpRequest()
        let formData = new FormData()
        formData.append("dir", "bbs")
        //为什么要这么麻烦的把base64转成byte再转成blob传递给后台做处理？
        //因为base64比二进制大,base64是把三个字节变成4个字节的编码，所以比二进制大了三分之一
        formData.append("file", blob)
        request.open("POST", "http://localhost:8777/upload/file2", true)
        request.send(formData)
    }

    /**
     * 绘画拖拽区图片
     * @param {*} offsetX 横坐标偏移量
     * @param {*} offsetY 纵坐标偏移量
     */
    const drawImage = (offsetX, offsetY) => {
        let imgDom = imgRef.current
        let canvasDom = canvasRef.current
        let ctx = canvasDom.getContext("2d")
        ctx.clearRect(0,0,canvasDom.width,canvasDom.height) //先清空拖拽区画板
        let imgWidth = imgDom.width
        let imgHeight = imgDom.height

        //通过数学计算，调整图片进入拖拽区后的宽高比, times是点击扩大缩小后的实时倍率
        if(imgWidth>imgHeight){
            let scale = canvasDom.width/imgWidth
            imgWidth = canvasDom.width*fileAttr.times
            imgHeight = imgHeight*scale*fileAttr.times
        }else{
            let scale = canvasDom.height/imgHeight
            imgHeight = canvasDom.height*fileAttr.times
            imgWidth = imgWidth*scale*fileAttr.times
        }
        //让canvas执行绘画填充 (复制对象dom, 图片开始坐标X, 图片开始坐标Y, 图片宽度， 图片高度)
        ctx.drawImage(imgDom, (canvasDom.width-imgWidth)/2+offsetX, (canvasDom.height-imgHeight)/2+offsetY, imgWidth, imgHeight)
    }
    
    useEffect(()=>{
        if(fileAttr.file){
            drawImage(fileAttr.preOffsetX, fileAttr.preOffsetY)

        }
    }, [fileAttr])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <input type="file" accept="image/*" onChange={handleChange} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-4'>
                    {fileAttr.file&&<img className="img-responsive" src={fileAttr.dataUrl} ref={imgRef} style={{border:'2px dashed green'}} alt=''/>}
                </div>
                <div className='col-md-4' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                    {
                        fileAttr.file&&(
                            <>
                                <div style={{position:'relative'}}>
                                    <canvas ref={canvasRef}
                                            width="300px"
                                            height="300px"
                                            style={{border:"2px dashed blue"}}/>
                                    <div style={{width:100, height:100, backgroundColor:'yellow', opacity:.3, position:'absolute', left:100, top:100}}></div>
                                </div>
                                <div className='btn-group'>
                                    <button type='button' className='btn btn-primary' onClick={e=>bigger(e)}>扩大</button>
                                    <button type='button' className='btn btn-primary' onClick={e=>smaller(e)}>缩小</button>
                                    <button type='button' className='btn btn-primary' onClick={e=>confirm(e)}>裁剪</button>
                                </div>
                            </>
                        )                  
                    }
                </div>
                <div className='col-md-4'>
                    {
                        fileAttr.file&&(
                            <>
                                <img ref={avatarRef} style={{border: '2px dashed pink'}} alt=''/>
                            </>
                        ) 
                    }
                    <button type='button' className='btn btn-primary' onClick={e=>upload(e)}>上传</button>
                </div>
            </div>
        </div>
    );
}

export default Image;
