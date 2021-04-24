function ajax(url) {
    //实例化XMLHttpRequest对象
    let xhr
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject();
    }
    //初始化一个get请求
    xhr.open("get", url, true)//"http://musicapi.leanapp.cn/personalized"
    //接收返回值
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                success(xhr)
            } else {
                error(xhr)
            }
        }
    }
    //发送请求
    xhr.send()
}
function success(xhr){
    const res = JSON.parse(xhr.responseText)
    console.log("请求成功")
    // do something
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
}
function error(xhr){
    console.log("error");
}