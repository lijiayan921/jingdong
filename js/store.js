window.addEventListener('load',function(){
    let username=document.querySelector('.username');
    username.innerHTML=localStorage.getItem('username');
    // 轮播图模块
let focus=document.querySelector('.focus');
let arrow_r=document.querySelector('.arrow-r');
let arrow_l=document.querySelector('.arrow-l');
let focusWidth=focus.offsetWidth;
// console.log(focusWidth);
focus.addEventListener('mouseenter',function(){
    arrow_l.style.display='block';
    arrow_r.style.display='block';
    clearInterval(timer);
    timer=null;
})
focus.addEventListener('mouseleave',function(){
    timer=setInterval(function(){
        arrow_r.click();
    },2000);
    arrow_l.style.display='none';
    arrow_r.style.display='none';
})
//动态生成小圆圈
let ul=focus.querySelector('ul');
let ol=focus.querySelector('.circle');
for(let i=0;i<ul.children.length;i++){
    let li=document.createElement('li');
    li.setAttribute('index',i);
    ol.appendChild(li); 
    li.addEventListener('click',function(){
        for(let i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        this.className='current';
        let index=this.getAttribute('index');
        num=index;
        circle=index;
        animate(ul,-index*focusWidth);
    });
}
ol.children[0].className='current';
let first=ul.children[0].cloneNode(true);
ul.appendChild(first);
console.log(ul.children.length);
let num=0;
let circle=0;
arrow_r.addEventListener('click',function(){
    if(num==ul.children.length-1){
        ul.style.left=0;
        num=0;
    }
    num++;
    animate(ul,-num*focusWidth); 
    circle++;
    if(circle==ol.children.length){
        circle=0;
    }
    for(let i=0;i<ol.children.length;i++){
        ol.children[i].className='';
    }
    ol.children[circle].className='current';
})
arrow_l.addEventListener('click',function(){
    if(num==0){
        num=ul.children.length-1;
        ul.style.left=-num*focusWidth+'px';
    }
    num--;
    animate(ul,-num*focusWidth);
    circle--;
    if(circle<0){
        circle=ol.children.length-1;
    }
    for(let i=0;i<ol.children.length;i++){
        ol.children[i].className='';
    }
    ol.children[circle].className='current';
})
let timer=setInterval(function(){
    arrow_r.click();
},2000);
let link=document.getElementById('link');
let login=document.querySelector('.login');
let mask=document.querySelector('.login-bg');
let closeBtn = document.querySelector('#closeBtn');
let title = document.querySelector('#title');
closeBtn.addEventListener('click', function() {
        mask.style.display = 'none';
        login.style.display = 'none';
    })
title.addEventListener('mousedown',function(e){
        let x=e.pageX-login.offsetLeft;
        let y=e.pageY-login.offsetTop;
        document.addEventListener('mousemove',move);
        function move(e) {
        login.style.left = e.pageX - x + 'px';
        login.style.top = e.pageY - y + 'px';
    }
        document.addEventListener('mouseup',function(){
            document.removeEventListener('mousemove', move);
        })
})
// 店铺展示物品
let redmi_nav=this.document.querySelector('.redmi_nav');
let redmi_lis=redmi_nav.querySelectorAll('a'); 
let nav_det=document.querySelector('.nav_det');
let det_uls=nav_det.querySelectorAll('ul');
for(let i=0;i<redmi_lis.length;i++){
    redmi_lis[i].addEventListener('mouseover',function(){
        nav_det.style.display='block';
        for(let i=0;i<det_uls.length;i++){
            det_uls[i].style.display='none'
        }
        det_uls[i].style.display='block';
        let xhr=new XMLHttpRequest();
xhr.open('GET','http://139.155.69.249:8081/v1/store/head?store_id=4');
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.setRequestHeader('Origin','http://39.144.218.38');
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
            let str=xhr.response;
            console.log(str);
            obj=JSON.parse(xhr.response);
            console.log(obj.data);
            let x=obj.data.map(item=>{
                return`    <li>
                <div class="head_tag">
                <span>${item.head_tag}</span></div>
                <div class=img_box><img src="http://${item.image}"></div>
                <div class="good_name">${item.good_name}</div>
                <div class="foot_tag">${item.foot_tag}</div>
            </li>`
            })
            det_uls[i].innerHTML=x.join('');
           
        }
    }
} 
    });
//    redmi_lis[i].addEventListener('mouseout',function(){
//         nav_det.style.display='none'
//     })
}
    nav_det.addEventListener('mouseover',function(){
        nav_det.style.display='block'
        })
        nav_det.addEventListener('mouseout',function(){
            nav_det.style.display='none'
        })
        // 商品分类部分
        // tab栏切换
let navitems=document.querySelector('.navitems1')
let lis=navitems.querySelectorAll('li');
console.log(lis);
for(let i=0;i<lis.length;i++){
    lis[i].onclick=function(){
        for(let i=0;i<lis.length;i++){
            lis[i].className='';
        }
        this.className='bg_head';
    }
}
//每个商品的展示部分
let xhr2=new XMLHttpRequest();
xhr2.open('GET','http://139.155.69.249:8081/v1/phone?store_id=4');
xhr2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr2.setRequestHeader('Origin','http://39.144.218.38');
xhr2.send();
xhr2.onreadystatechange=function(){
    if(xhr2.readyState===4){
        if(xhr2.status>=200&&xhr2.status<300){
            obj1=JSON.parse(xhr2.response);
            console.log(obj1.data);
            let arr1=[...obj1.data]
            console.log(arr1);
            let items=arr1.map(item=>{
               return`
               <li class="phone_child phone_item1">
               <img src="http://${item.good_image}" class="imgs">
               <div class="price_box">
                   <i>￥</i><span class="price_det">${item.price}</span>
               </div>
               <div class="des">${item.good_name}</div>
               <div class="other_det"> 
                   <span class="phone_brand attr">${item.brand}</span>
                   <span class="screen_size attr">${item.screen_size}英寸</span>
                   <span class="charging_power attr">${item.charging_power}W</span>
               </div>
               <div class="comment_box"> 
                  <span class="comment">${item.comment_num}</span>
                   <span class="comment_xz">条评论</span></div>
               <div class="bottom_desc">
                   <span class="zy">自营</span>
                   <span class="fxg">放心购</span>
                   <span class="guanzhu">
                       <i class="iconfont icon-aixin-"></i>关注
                   </span>
               </div>
           </li>`
            })
            let phone_list=document.querySelector('.phone_list');
          
            phone_list.innerHTML=items.join('');  
                           // 点击关注后显示已关注
      let guanzhu=document.querySelectorAll('.guanzhu'); 
    let token=localStorage.getItem('token');
      let flag=0;
         console.log(guanzhu);
         for(let i=0;i<guanzhu.length;i++){
                 guanzhu[i].addEventListener('click',function(){
                     if(flag==0){
                        let xhr0=new XMLHttpRequest();
                        xhr0.open('POST','http://139.155.69.249:8081/v1/good/focus');
                        xhr0.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                        xhr0.setRequestHeader('Origin','http://39.144.218.38');
                        xhr0.send('good_id='+arr1[i].good_id+'&token='+token+'');
                        xhr0.onreadystatechange=function(){
                            if(xhr0.readyState===4){
                                if(xhr0.status>=200&&xhr0.status<300){
                                    obj1=JSON.parse(xhr0.response);
                                    console.log(xhr0.response);
                                }
                            }
                        }
                         this.innerHTML='❤已关注'
                 this.className='ygz'
                 flag=1;
                     }else{
                        let xhr1=new XMLHttpRequest();
                        xhr1.open('PUT','http://139.155.69.249:8081/v1/good/focus');
                        xhr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                        xhr1.setRequestHeader('Origin','http://39.144.218.38');
                        xhr1.send('good_id='+arr1[i].good_id+'&token='+token+'');
                        xhr1.onreadystatechange=function(){
                            if(xhr1.readyState===4){
                                if(xhr1.status>=200&&xhr1.status<300){
                                    obj1=JSON.parse(xhr1.response);
                                    console.log(xhr1.response);
                                }
                            }
                        }
                         this.innerHTML='❤关注'
                         this.className='guanzhu'
                         flag=0;
                     }  
             })
         }
         let imgs=document.querySelectorAll('.imgs')
         for(let i=0;i<imgs.length;i++){
              imgs[i].addEventListener('click',function(){
             window.location.href='item_detail.html';
         })
        }
   // tab栏切换
let f_sort=document.querySelector('.f_sort');
let classify=f_sort.querySelectorAll('li');
console.log(classify.length);
for(let i=0;i<classify.length;i++){
    classify[i].addEventListener('click',function(){
        for(let i=0;i<classify.length;i++){
            classify[i].className='';
        }
        this.className='head_click1';
    })
}
   // 按不同的方法排序
for(let i=0;i<classify.length;i++){
    classify[i].addEventListener('click',function(){
        let xhr=new XMLHttpRequest();
        let x=i+1;
xhr.open('GET','http://139.155.69.249:8081/v1/phone?store_id=4&sort='+x+'');
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.setRequestHeader('Origin','http://39.144.218.38');
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
            obj=JSON.parse(xhr.response);
            console.log(obj.data);
            let arr1=[...obj.data]
            console.log(arr1);
            let items=arr1.map(item=>{
                return`
                <li class="phone_child phone_item1">
                <img src="http://${item.good_image}" class="imgs">
                <div class="price_box">
                    <i>￥</i><span class="price_det">${item.price}</span>
                </div>
                <div class="des">${item.good_name}</div>
                <div class="other_det"> 
                    <span class="phone_brand attr">${item.brand}</span>
                    <span class="screen_size attr">${item.screen_size}英寸</span>
                    <span class="charging_power attr">${item.charging_power}W</span>
                </div>
                <div class="comment_box"> 
                   <span class="comment">${item.comment_num}</span>
                    <span class="comment_xz">条评论</span></div>
                <div class="bottom_desc">
                    <span class="zy">自营</span>
                    <span class="fxg">放心购</span>
                    <span class="guanzhu">
                        <i class="iconfont icon-aixin-"></i>关注
                    </span>
                </div>
            </li>`
             })
             let phone_list=document.querySelector('.phone_list');
             phone_list.innerHTML=items.join('');
                            // 点击关注后显示已关注
      let guanzhu=document.querySelectorAll('.guanzhu');
      let token=localStorage.getItem('token');
      let flag=0;
         console.log(guanzhu);
         for(let i=0;i<guanzhu.length;i++){
                 guanzhu[i].addEventListener('click',function(){
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
                 this.className='ygz'
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
                         this.className='guanzhu'
                         flag=0;
                     }  
             })
         }
            let imgs=document.querySelectorAll('.imgs')
            for(let i=0;i<imgs.length;i++){
                 imgs[i].addEventListener('click',function(){
                window.location.href='item_detail.html';
            })
            } 
        }
    }
} 
})
}
}
    }
}
})