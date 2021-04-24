// fetch("http://musicapi.leanapp.cn/personalized")
// .then((response)=>{
//     return response.json();
// })
// .then((response)=>{
//     console.log(response);
// })
// .catch(console.error())
// let url="http://musicapi.leanapp.cn/personalized";
// let get=document.getElementById("get");
// let post=document.getElementById("post");
// get.onclick=()=>{
//     fetch(url,{
//         method:"get",
//         headers:{
//             "Content-type":"application/x-www-form-urlencoded;charset=UTF-8"
//         }
//     })
//     .then((response)=>{
//         return response.json();
//     })
//     .then((response)=>{
//         console.log(response);
//     })
//     .catch(console.error())
// }
// post.onclick=()=>{
//     fetch(url,{
//         method:"post",
//         headers:{
//             "Content-type":"application/x-www-form-urlencoded;charset=UTF-8"
//         }
//     })
//     .then((response)=>{
//         return response.json();
//     })
//     .then((response)=>{
//         console.log(response);
//     })
//     .catch(console.error())
// }
function fetchData(url, type) {
    return fetch(url, {
        data: JSON.stringify({
            // 传递参数
        }),
        headers: {
            // 设置请求头
            "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        method: type,
    })
        .then((response) => {
            return response.json()//将数据转换为字典格式
        })
        .then((response) => {
            console.log(response);
            callback(response);
        })
        .catch(() => {
            console.error();
        })
}
function callback(res) {
    const tuijian = document.getElementById("container-tuijian")
    console.log("请求成功")
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