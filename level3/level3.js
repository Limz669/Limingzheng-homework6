// 传入最基本的配置，会合并之后调用方法时传入的配置
const ajax = ({
    xhr: "",
    url: 'http://musicapi.leanapp.cn/personalized',
    data: JSON.stringify({
        // 传递参数
    }),
    headers: {
        'Content-Type': 'application/json'
    },
    beforeSuccess: () => {
        //开始请求前先实例化XMLHttpRequest对象
        let xhr
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveObject) {
            //兼容IE6以下版本
            xhr = new ActiveXobject('Microsoft.XMLHTTP');
        }
        return xhr;
    },
    afterSuccess: (res) => {
        // 成功请求后显示数据
        const tuijian = document.getElementById("container-tuijian")
        for (let i = 0; i < 10; i++) {
            const div = document.createElement("div");
            const name = document.createElement("span");
            let numspan = document.createElement("p");
            const img = new Image();
            let num;
            num = res.result[i].playCount;
            num = Math.round(num / 10000);
            div.style.width = "190px"
            div.style.height = "250px"
            div.style.margin = "10px"
            let nums
            if (num > 9999) {
                num = Math.round(num / 10000);
                nums = num.toString() + '亿'
            } else {
                nums = num.toString() + '万'
            }
            numspan.innerText = nums
            numspan.style.textAlign = "center"
            numspan.style.width = "45px"
            numspan.style.color = "white"
            numspan.style.fontSize = "10px"
            numspan.style.position = "relative"
            numspan.style.top = "40px"
            numspan.style.left = "145px"
            div.appendChild(numspan);
            img.src = res.result[i].picUrl;
            div.appendChild(img);
            name.innerText = res.result[i].name;
            div.appendChild(name);
            tuijian.appendChild(div);
        }
    },
    get: (jsonObj) => {
        ajax.xhr = ajax.beforeSuccess();
        ajax.xhr.open("GET", ajax.url);
        ajax.xhr.onreadystatechange = () => {
            if (ajax.xhr.readyState === 4) {
                if (ajax.xhr.status >= 200 && ajax.xhr.status < 300 || ajax.xhr.status == 304) {
                    jsonObj.success(ajax.xhr.responseText);
                } else {
                    jsonObj.error(ajax.xhr.responseText);
                }
            }
        }
        ajax.xhr.send();
    },
    post: (jsonObj) => {
        ajax.xhr = ajax.beforeSuccess();
        ajax.xhr.open("POST", ajax.url,true);
        ajax.xhr.onreadystatechange = () => {
            if (ajax.xhr.readystate === 4) {
                if (ajax.xhr.status >= 200 && ajax.xhr.status < 300 || ajax.xhr.status == 304) {
                    jsonObj.success(ajax.xhr.responseText);
                } else {
                    jsonObj.error(ajax.xhr.responseText);
                }
            }
        }
        ajax.xhr.send();
    },
    beforeError: () => { console.log("beforeError"); },
    afterError: () => { console.log("afterError"); }
})

document.getElementById("get").onclick = () => {
    ajax.get({
        url: 'http://musicapi.leanapp.cn/personalized',
        data: JSON.stringify({
            // 传递参数
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        // xhrFields: { withCredentials: true },
        success: (responseText) => {
            console.info("success: " + responseText);
            let res = JSON.parse(responseText)
            ajax.afterSuccess(res)
        },
        error: () => {
            ajax.afterError();
        }
    })
}

document.getElementById("post").onclick = () => {
    ajax.post({
        url: 'http://musicapi.leanapp.cn/personalized',
        data: JSON.stringify({
            // 传递参数
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        // xhrFields: { withCredentials: true },
        success: (responseText) => {
            console.info("success: " + responseText);
            let res = JSON.parse(responseText)
            ajax.afterSuccess(res)
        },
        error: () => {
            ajax.afterError()
        }
    })
}

