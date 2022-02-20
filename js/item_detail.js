// 京东放大镜
window.addEventListener('load',function(){ 
    let username=document.querySelector('.username');
    username.innerHTML=localStorage.getItem('username');
    let mask=document.querySelector('.mask');
    let big=document.querySelector('.big');
    let preview_img=document.querySelector('.preview_img');
    preview_img.addEventListener('mouseover',function(){
        mask.style.display='block';
        big.style.display='block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
     // 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove',function(e){
        //计算鼠标在盒子内的坐标
        let x=e.pageX-this.offsetLeft;
        let y=e.pageY-this.offsetTop;
        let maskX=x-mask.offsetWidth/2;
        let maskY=y-mask.offsetHeight/2;
        let maskMax=preview_img.offsetWidth-mask.offsetWidth;
        if(maskX<=0){
            maskX=0;
        }else if(maskX>maskMax){
            maskX=maskMax;
        }
        if(maskY<=0){
            maskY=0;
        }else if(maskY>maskMax){
            maskY=maskMax;
        }
        mask.style.left=maskX+'px';
        mask.style.top=maskY+'px';
        //大图片移动距离
        //大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        let bigIMg=document.querySelector('.bigImg');
        let bigMax=bigIMg.offsetWidth-big.offsetWidth;
        let bigX=maskX*bigMax/maskMax;
        let bigY=maskY*bigMax/maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';
    })
// 不同版本价格不同部分
let price=document.querySelector('.price');
let version=this.document.querySelector('.version')
let dif_version=version.querySelectorAll('a');
let color=this.document.querySelector('.color');
let dif_color=color.querySelectorAll('a')
console.log(dif_version);
    // 点击不同的颜色添加边框
for(let i=0;i<dif_color.length;i++){
    dif_color[i].setAttribute('index', i);
    sessionStorage.setItem('index',0);
    dif_color[i].addEventListener('click',function(){
        for (let i = 0; i < dif_color.length; i++) {
            dif_color[i].className = '';
           }
           // 留下我自己 
           this.className = 'current';
           let index = this.getAttribute('index');
           sessionStorage.setItem('index',index);
          // console.log(index);
    })
   
}
// 给每一个版本添加点击事件
for(let j=0;j<dif_version.length;j++){
    dif_version[j].setAttribute('index1', j);
    sessionStorage.setItem('index1',0);
    dif_version[j].addEventListener('click',function(){
        for (let j = 0; j < dif_version.length; j++) {
            dif_version[j].className = '';
           }
           // 留下我自己 
           this.className = 'current';
           let index1 = this.getAttribute('index1');
           //console.log(index1);
           sessionStorage.setItem('index1',index1);
        let xhr0=new XMLHttpRequest();
xhr0.open('GET','http://139.155.69.249:8081/v1/phone/detail?good_id=501');
xhr0.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr0.setRequestHeader('Origin','http://39.144.218.38');
xhr0.send();
xhr0.onreadystatechange=function(){
    if(xhr0.readyState===4){
        if(xhr0.status>=200&&xhr0.status<300){
            obj1=JSON.parse(xhr0.response);
            // console.log(obj1.data);
            let arr1=[...obj1.data] 
            price.innerHTML='￥'+arr1[j].price
        }
    }
}
    })
}



//增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
let add=this.document.querySelector('.add');
let reduce=this.document.querySelector('.reduce');
let text=this.document.querySelector('.text');
add.addEventListener('click',function(){
    let n=text.value;
    text.value=parseInt(n)+1;
})
reduce.addEventListener('click',function(){
    let n=text.value;
    if(n==1){
        return false;
    }
    text.value=parseInt(n)-1;
})
// tab栏切换
   // 获取元素
   let detail_tab_list = document.querySelector('.detail_tab_list');
   let tab_lis = detail_tab_list.querySelectorAll('li');
   let mokuais = document.querySelectorAll('.mokuai');
   // for循环绑定点击事件
   for (var i = 0; i < tab_lis.length; i++) {
       // 开始给5个小li 设置索引号 
       tab_lis[i].setAttribute('index', i);
       tab_lis[i].onclick = function() {
           // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式
           // 干掉所有人 其余的li清除 class 这个类
           for (var i = 0; i < tab_lis.length; i++) {
            tab_lis[i].className = '';
           }
           // 留下我自己 
           this.className = 'current';
           // 2. 下面的显示内容模块
           var index = this.getAttribute('index');
        //    console.log(index);
           // 干掉所有人 让其余的模块 隐藏
           for (var i = 0; i < mokuais.length; i++) {
            mokuais[i].style.display = 'none';
           }
           // 留下我自己 让对应的模块 显示出来
           mokuais[index].style.display = 'block';
       }
   }
let first_list=this.document.querySelector('.first_list');
let list_des =first_list.querySelectorAll('li');
console.log(list_des);
let coms = document.querySelectorAll('.com');
console.log(coms);
// for循环绑定点击事件
for (let i = 0; i < list_des.length; i++) {
    // 开始给5个小li 设置索引号 
    list_des[i].setAttribute('index', i);
    list_des[i].addEventListener('click',function(){
        for (let i = 0; i < list_des.length; i++) {
            list_des[i].className = '';
        }
        // 留下我自己 
        this.className = 'list_current';
        // 2. 下面的显示内容模块
        var index = this.getAttribute('index');
     //    console.log(index);
        // 干掉所有人 让其余的模块 隐藏
        for (var i = 0; i < coms.length; i++) {
            coms[i].style.display = 'none';
        }
        // 留下我自己 让对应的模块 显示出来
        coms[index].style.display = 'block';
        })
}
//    商品评论部分
let token=localStorage.getItem('token');
// console.log(token);
// 添加评论模块
let box=document.querySelector('textarea');
let btn=document.querySelector('.btn');
let start_box=document.querySelector('.start_box')
btn.onclick=function(){
    if(box.value===''){
        alert('您还没有输入内容！');
    }else{
        let xhr3=new XMLHttpRequest();
xhr3.open('POST','http://139.155.69.249:8081/v1/good/comment');
xhr3.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr3.setRequestHeader('Origin','http://39.144.218.38');
xhr3.send('token='+token+'&good_id=501&score='+start_box.value+'&comment='+box.value+'');
xhr3.onreadystatechange=function(){
if(xhr3.readyState===4){
    if(xhr3.status>=200&&xhr3.status<300){
        obj1=JSON.parse(xhr3.response);
        console.log(xhr3.response);
        let str=xhr3.response;
        if(str.includes('success')){
            let xhr=new XMLHttpRequest();
xhr.open('GET','http://139.155.69.249:8081/v1/good/comment?good_id=501&token='+token+'');
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.setRequestHeader('Origin','http://39.144.218.38');
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
            obj1=JSON.parse(xhr.response);
            // console.log(obj1.data);
            let arr1=[...obj1.data] 
            console.log(arr1);
            let x=arr1.map(item=>{
                return`
                <li class="review">
                <div class="user">
                    <div class="user_id">${item.comment_id}</div>
                    <div class="member">PLUS会员</div>
                </div>
                <div class="rev_det">
                    <div class="starts">${item.score}颗★</div>
                    <div class="rev_des">${item.context}</div>
                    <div class="rev_time">${item.create_time}</div>
                </div>
            </li>`
            })
            console.log(x);
            let ul=document.querySelector('.all_coments')
            x.innerHTML=x.join('')
            ul.innerHTML=x.innerHTML
        }
    }
}
            list_des[0].className = 'list_current';
            coms[0].style.display = 'block';
            list_des[4].className ='';
            coms[4].style.display = 'none';
        }
    }
}
}   
    }
}
let xhr=new XMLHttpRequest();
xhr.open('GET','http://139.155.69.249:8081/v1/good/comment?good_id=501&token='+token+'');
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.setRequestHeader('Origin','http://39.144.218.38');
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
            obj1=JSON.parse(xhr.response);
            // console.log(obj1.data);
            let arr1=[...obj1.data] 
            console.log(arr1);
            let x=arr1.map(item=>{
                return`
                <li class="review">
                <div class="user">
                    <div class="user_id">${item.comment_id}</div>
                    <div class="member">PLUS会员</div>
                </div>
                <div class="rev_det">
                    <div class="starts">${item.score}颗★</div>
                    <div class="rev_des">${item.context}</div>
                    <div class="rev_time">${item.create_time}</div>
                </div>
            </li>`
            })
            console.log(x);
            let ul=document.querySelector('.all_coments')
            x.innerHTML=x.join('')
            ul.innerHTML=x.innerHTML
        }
    }
}
list_des[1].addEventListener('click',function(){
 let xhr1=new XMLHttpRequest();
xhr1.open('GET','http://139.155.69.249:8081/v1/good/comment?good_id=501&code=5&token='+token+'');
xhr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr1.setRequestHeader('Origin','http://39.144.218.38');
xhr1.send();
xhr1.onreadystatechange=function(){
    if(xhr1.readyState===4){
        if(xhr1.status>=200&&xhr1.status<300){
            obj1=JSON.parse(xhr1.response);
            // console.log(obj1.data);
            let arr1=[...obj1.data] 
            console.log(arr1);
            let y=arr1.map(item=>{
                return`
                <li class="review">
                <div class="user">
                    <div class="user_id1">${item.comment_id}</div>
                    <div class="member">PLUS会员</div>
                </div>
                <div class="rev_det">
                    <div class="starts1">${item.score}颗★</div>
                    <div class="rev_des1">${item.context}</div>
                    <div class="rev_time1">${item.create_time}</div>
                </div>
            </li>`
            })
            console.log(y);
            let ul=document.querySelector('.good_comments')
            y.innerHTML=y.join('')
            ul.innerHTML=y.innerHTML
        }
    }
}
}) 
list_des[2].addEventListener('click',function(){
    let rev_des=document.querySelectorAll('.rev_des2');
    console.log(rev_des);
    let xhr1=new XMLHttpRequest();
    xhr1.open('GET','http://139.155.69.249:8081/v1/good/comment?good_id=501&code=3&token='+token+'');
    xhr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr1.setRequestHeader('Origin','http://39.144.218.38');
    xhr1.send();
    xhr1.onreadystatechange=function(){
        if(xhr1.readyState===4){
            if(xhr1.status>=200&&xhr1.status<300){
                obj1=JSON.parse(xhr1.response);
                // console.log(obj1.data);
                let arr1=[...obj1.data] 
                console.log(arr1);
                let z=arr1.map(item=>{
                    return`
                    <li class="review">
                    <div class="user">
                        <div class="user_id2">${item.comment_id}</div>
                        <div class="member">PLUS会员</div>
                    </div>
                    <div class="rev_det">
                        <div class="starts2">${item.score}颗★</div>
                        <div class="rev_des2">${item.context}</div>
                        <div class="rev_time2">${item.create_time}</div>
                    </div>
                </li>`
                })
                console.log(z);
                let ul=document.querySelector('.nor_comments')
                z.innerHTML=z.join('')
                ul.innerHTML=z.innerHTML
            }
        }
    }
    }) 
list_des[3].addEventListener('click',function(){
        let rev_des=document.querySelectorAll('.rev_des3');
        console.log(rev_des);
         let xhr1=new XMLHttpRequest();
        xhr1.open('GET','http://139.155.69.249:8081/v1/good/comment?good_id=501&code=1&token='+token+'');
        xhr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr1.setRequestHeader('Origin','http://39.144.218.38');
        xhr1.send();
        xhr1.onreadystatechange=function(){
            if(xhr1.readyState===4){
                if(xhr1.status>=200&&xhr1.status<300){
                    obj1=JSON.parse(xhr1.response);
                    // console.log(obj1.data);
                    let arr1=[...obj1.data] 
                    console.log(arr1);
                    let z=arr1.map(item=>{
                        return`
                        <li class="review">
                        <div class="user">
                            <div class="user_id3">${item.comment_id}</div>
                            <div class="member">PLUS会员</div>
                        </div>
                        <div class="rev_det">
                            <div class="starts3">${item.score}颗★</div>
                            <div class="rev_des3">${item.context}</div>
                            <div class="rev_time3">${item.create_time}</div>
                        </div>
                    </li>`
                    })
                    console.log(z);
                    let ul=document.querySelector('.bad_comments')
                    z.innerHTML=z.join('')
                    ul.innerHTML=z.innerHTML
                }
            }
        }
        }) 
// 达人选购部分
let xhr2=new XMLHttpRequest();
xhr2.open('GET','http://139.155.69.249:8081/v1/phone?brand=小米');
xhr2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr2.setRequestHeader('Origin','http://39.144.218.38');
xhr2.send();
xhr2.onreadystatechange=function(){
if(xhr2.readyState===4){
    if(xhr2.status>=200&&xhr2.status<300){
        obj1=JSON.parse(xhr2.response);
        // console.log(obj1.data);
        let arr1=[...obj1.data] 
        // console.log(arr1);
        let items=arr1.map(item=>{
            return`
            <li class="xuangou_item">
            <img src="http://${item.good_image}" class="pic">
            <div class="xuangou_des">${item.good_name}</div>
             <div class="xuangou_price">
                <i>￥</i><span class="xuangou_pr">${item.price}</span>
            </div>
        </li>`
        })
        let xuangou_box=document.querySelector('.xuangou_box');
        xuangou_box.innerHTML=items.join('')
    }
}
}
// 点击关注后显示已关注
let guanzhu=document.querySelector('.guanzhu');
// let token=localStorage.getItem('token');
console.log(token);

let flag=0;
   console.log(guanzhu);
    guanzhu.addEventListener('click',function(){
               if(flag==0){
                let xhr0=new XMLHttpRequest();
                xhr0.open('POST','http://139.155.69.249:8081/v1/good/focus');
                xhr0.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr0.setRequestHeader('Origin','http://39.144.218.38');
                xhr0.send('good_id=501&token='+token+'');
                xhr0.onreadystatechange=function(){
                    if(xhr0.readyState===4){
                        if(xhr0.status>=200&&xhr0.status<300){
                            obj1=JSON.parse(xhr0.response);
                            console.log(xhr0.response);
                        }
                    }
                }
                   this.innerHTML='❤已关注'
                //this.className='ygz'
                flag=1;
               }else{
                let xhr1=new XMLHttpRequest();
                xhr1.open('PUT','http://139.155.69.249:8081/v1/good/focus');
                xhr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr1.setRequestHeader('Origin','http://39.144.218.38');
                xhr1.send('good_id=501&token='+token+'');
                xhr1.onreadystatechange=function(){
                    if(xhr1.readyState===4){
                        if(xhr1.status>=200&&xhr1.status<300){
                            obj1=JSON.parse(xhr1.response);
                            console.log(xhr1.response);
                        }
                    }
                }
                   this.innerHTML='❤关注'
                   //this.className='guanzhu'
                   flag=0;
               }  
       })
   
})