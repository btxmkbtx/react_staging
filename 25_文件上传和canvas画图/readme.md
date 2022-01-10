# 课程目标：了解用于前端文件上传下载相关的几种基础数据对象类型和他们之间的关系
Arraybuffer 最基础的底层类型，不可操作
Typebuffer  可以将Arraybuffer转换为Typebuffer进行一系列操作修改
Dataview  可以将Arraybuffer转换为Dataview进行一系列操作修改
Blob  一种类文件对象,90%的情况会用到Blob对象完成上传下载工作
File  继承了Blob的类文件对象，内置readAsArrayBuffer, readAsDataURL, readAsText等转换器, 以及onLoad, onChange等一系列回调方法

文件上传后会以base64的形式存在，img标签的src属性执行的就是base64
base64信息的构成是「类型信息+","+base64的encode码」
例如:data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…cjSSI0EwQ6Uq2MXJEYSrspbTK+GPP6W07dg4CjR84nD/uz//Z

atob是javascript内置的base64解码函数，可以把base64解码为byte, 它的反向操作是btoa函数
注意使用atob解码base64只需要传递逗号后面的64码部分,
如：atob("/9j/4AAQSkZJRgABAQEASABIAAD…cjSSI0EwQ6Uq2MXJEYSrspbTK+GPP6W07dg4CjR84nD/uz//Z")

为什么做upload的时候,要这么麻烦的把base64转成byte再转成blob传递给后台做处理？
因为base64比二进制大,base64是把三个字节变成4个字节的编码，所以比二进制大了三分之一