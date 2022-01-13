import React from 'react'
import axios from 'axios';

const Image = ()=>{
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <button onClick={e=>{
                        axios.post("/ping/post").then(res=>console.log(res))
                    }}>PingPost</button>
                    <button onClick={e=>{
                        axios.post("/ping/post/param",{param1:"123"}).then(res=>console.log(res))
                    }}>PingPostParam</button>
                    <button onClick={e=>{
                        axios.post("/download/csv",{param1:"test"})
                        .then(res=>{
                            let fileBlob = new Blob([res.data], {type: 'text/csv'})
                            const url = window.URL.createObjectURL(fileBlob)
                            const a = document.createElement("a")
                            a.href = url
                            a.download = "aaa.csv"
                            a.click()
                            a.remove()
                        })
                    }}>DownloadCsvFile</button>

                </div>
            </div>
        </div>
    );
}

export default Image;
