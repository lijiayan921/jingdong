window.addEventListener('load',function(){
// 点击顶部叉号，顶部广告消失
let cha=document.querySelector('.cha')
let bg=document.querySelector('.bg')
cha.addEventListener('click',function(){
    bg.style.display='none'
});
// 页面一加载，就请求左侧侧边栏数据
let item_id=document.querySelectorAll('.item_id');
console.log(item_id[0]);
console.log(item_id.length);
const xhr=new XMLHttpRequest();
xhr.open('GET','http://139.155.69.249:8081/v1/home/category/code?code=1000');
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.setRequestHeader('Origin','http://39.144.218.38');
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
            let str=xhr.response;
            obj=JSON.parse(xhr.response);
            console.log(typeof(obj.data));
           let arr=Object.values(obj.data);
           for(let i=0;i<arr.length;i++){
               item_id[i].innerHTML=arr[i];
           }
        }
    }
}  
//搜索商品模块
let search_ipt=document.querySelector('.search_ipt');
let search_btn=document.querySelector('.search_btn');
console.log(search_btn);
search_btn.addEventListener('click',function(){
    console.log(search_btn);
    if(search_ipt.value==''){
        console.log(11);
    }else{
        let xhr1=new XMLHttpRequest();
xhr1.open('GET','http://139.155.69.249:8081/v1/home/goods?good_name='+search_ipt.value+'');
xhr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr1.setRequestHeader('Origin','http://39.144.218.38');
xhr1.send();
xhr1.onreadystatechange=function(){
    if(xhr1.readyState===4){
        if(xhr1.status>=200&&xhr1.status<300){
            let str=xhr1.response;
            console.log(str);
        sessionStorage.setItem('search_ipt',search_ipt.value);
        window.location.href='search_item.html';
        }
    }
} 
    }
})
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
},2000)
// 右侧导航工具栏
let life_nav=this.document.querySelector('.life_nav');
let lifeservice=this.document.querySelector('.lifeservice')
let det_service=this.document.querySelector('.det_service')
lifeservice.addEventListener('mouseover',function(){
    life_nav.style.display='none';
    det_service.style.display='block';
    // 显示了之后，出现滑动门
    let subMenu=document.querySelector('.subMenu');
    let menu_lis=subMenu.querySelectorAll('li');
    let subContent=document.querySelector('.subContent');
    let tabCon = subContent.getElementsByTagName("ul");

    // for循环绑定点击事件
   for (var i = 0; i < menu_lis.length; i++) {
       // 开始给5个小li 设置索引号 
       menu_lis[i].setAttribute('index', i);
       menu_lis[i].onmouseover = function() {
           // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式
           // 干掉所有人 其余的li清除 class 这个类
           for (var i = 0; i < menu_lis.length; i++) {
            menu_lis[i].className = '';
           }
           // 留下我自己 
           this.className = 'cur_service';
           // 2. 下面的显示内容模块
           var index = this.getAttribute('index');
        //    console.log(index);
           // 干掉所有人 让其余的模块 隐藏
           for (var i = 0; i < tabCon.length; i++) {
            tabCon[i].style.display = 'none';
           }
           // 留下我自己 让对应的模块 显示出来
           tabCon[index].style.display = 'block';
       }
   }
    })
    lifeservice.addEventListener('mouseout',function(){
        det_service.style.display='none';
        life_nav.style.display='block';
    })

   
//倒计时模块
let hour=document.querySelector('.hour');
let minute=document.querySelector('.minute');
let second=document.querySelector('.second');
let inputTime=+new Date('2022-3-15 23:00:00');
countDown();
setInterval(countDown,1000);
function countDown(){
    let nowTime=+new Date();
    let times=(inputTime-nowTime)/1000;
    let h=parseInt(times/60/60%24);
    h=h<10?'0'+h:h;
    hour.innerHTML=h;
    let m=parseInt(times/60%60);
    m=m<10?'0'+m:m;
    minute.innerHTML=m;
    let s=parseInt(times%60);
    s=s<10?'0'+s:s;
    second.innerHTML=s;
}
// 鼠标滑到地名那时显示的部分
let area=document.querySelector('.area');
let box_l=document.querySelector('.box_l');
let site=document.querySelector('.site');
// let item=document.querySelector('.item');
let site_detail=document.querySelector('.site_detail')
let uls=site_detail.querySelector('ul');
let lis=uls.querySelectorAll('li');
console.log(uls.children);
area.addEventListener('mouseover',function(){
    site.style.display='block';
    // area.style.backgroundColor='white'
});
area.addEventListener('mouseout',function(){
    site.style.display='none';
});
site.addEventListener('mouseover',function(){
    site.style.display='block';
});
site.addEventListener('mouseout',function(){
    site.style.display='none';
});
box_l.addEventListener('mouseover',function(){
    box_l.style.backgroundColor='white'
});
box_l.addEventListener('mouseout',function(){
    box_l.style.backgroundColor=''
});
for(let i=0;i<lis.length;i++){
    lis[i].addEventListener('click',function(){
        for(let i=0;i<lis.length;i++){
            lis[i].className='';
        }
        this.className='bg_current';
        area.innerHTML=this.innerHTML
    })
}
//鼠标滑倒我的京东一栏上的显示部分
let myjdlist=document.querySelector('.myjdlist');
let wd_jd=document.querySelector('.wd_jd');
wd_jd.addEventListener('mouseover',function(){
    myjdlist.style.display='block';
});
wd_jd.addEventListener('mouseout',function(){
    myjdlist.style.display='none';
});
// 鼠标滑倒手机一栏上时右边显示详细部分
let item02=document.querySelector('.item02');
let box_item=document.querySelector('.box_item')
box_item.addEventListener('mouseover',function(){
    box_item.style.display='block';
});
box_item.addEventListener('mouseout',function(){
    box_item.style.display='none';
});
item02.addEventListener('mouseover',function(){
    box_item.style.display='block';
});
item02.addEventListener('mouseout',function(){
    box_item.style.display='none';
});
//页面滚动到京东一下年货到家时显示的部分
let search_fix=document.querySelector('.search_fix')
let miaosha=document.querySelector('.seckill')
let elevator_list=document.querySelector('.elevator_list')
let elevator_lk=document.querySelector('.elevator_lk')
let miaoshaTop=miaosha.offsetTop;
let elevator_listTop=elevator_list.offsetTop
console.log(miaoshaTop);
let goBack=document.querySelector('.goBack');
let jd_kill=document.querySelector('.jd_kill');
let go_nianhuo=document.querySelector('.go_nianhuo');
let see_good=document.querySelector('.see_good');
let go_recom=document.querySelector('.go_recom');
// let elevator_fixTop=elevator_fix.offsetTop
document.addEventListener('scroll',function(){
    // console.log(window.pageYOffset);
    if(window.pageYOffset>=miaoshaTop){
        search_fix.style.display='block'
        search_fix.style.position='fixed'
    }else{
        search_fix.style.display='none';
    }
    if(window.pageYOffset>=elevator_listTop){
        elevator_list.style.position='fixed'
        elevator_list.style.top=100+'px';
    }else{
        elevator_list.style.position='absolute';
        elevator_list.style.top='732px';
    }
    if(window.pageYOffset>=624&&window.pageYOffset<=924){
        jd_kill.classList.add('c_bg');
    }else{
        jd_kill.classList.remove('c_bg');
    }
    if(window.pageYOffset>=942&&window.pageYOffset<=1090){
        go_nianhuo.classList.add('c_bg');
    }else{
        go_nianhuo.classList.remove('c_bg');
    }
    if(window.pageYOffset>=1280&&window.pageYOffset<=1400){
        see_good.classList.add('c_bg');
    }else{
        see_good.classList.remove('c_bg');
    }
    if(window.pageYOffset>=1400&&window.pageYOffset<=2000){
        go_recom.classList.add('c_bg');
    }
    else{
        go_recom.classList.remove('c_bg');
    }
})
jd_kill.addEventListener('click',function(){
    animater(window,624);
});
go_nianhuo.addEventListener('click',function(){
    animater(window,942);
});
see_good.addEventListener('click',function(){
    animater(window,1373);
});
go_recom.addEventListener('click',function(){
    animater(window,1685);
});
goBack.addEventListener('click',function(){
    animater(window,0);
});
function animater(obj,target,callback){
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
  obj.timer=setInterval(function(){
      let step=(target-window.pageYOffset)/10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if(window.pageYOffset==target){
          clearInterval(obj.timer);
          callback && callback();
      }
      window.scroll(0, window.pageYOffset + step);
  },15)
}
// 发现好物滚动部分
let x = 0;
let list = document.querySelector('.list')
		//oList.innerHTML += oList.innerHTML;
		 setInterval(function(){
			x-=2;
			if(x<-150*4) {
				x = 0;
			}
			list.style.left = x+"px";
		},30);
// 当页面滚动到1220px时，发送请求，显示为你推荐部分
let recom_detail=document.querySelector('.recom_detail');
document.addEventListener('scroll',function(){
    if(window.pageYOffset>=1500){
        recom_detail.style.display='block'
        const xhr=new XMLHttpRequest();
xhr.open('GET','http://139.155.69.249:8081/v1/home/allgoods/1');
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.setRequestHeader('Origin','http://39.144.218.38');
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
        let str=xhr.response;
           let  obj=JSON.parse(xhr.response);
           console.log(obj);
            let arr=[...obj.data]
            console.log(arr);
            let recom_detail=document.querySelector('.recom_detail')
            let items=arr.map(item=>{
                return`
                <li class="recom_items">
                <img src="http://${item.good_image}" class="images">
               <div class="decr_item">
                   <i class="ziying">自营</i>
               <span class="det">${item.good_name}</span></div>
               <div class="price_box">
               <div class="price_inbox">
                   <i>￥</i><span class="price">${item.price}</span>
               </div>
               <span class="quan">券</span>
               </div>
           </li>`
            })
            recom_detail.innerHTML=items.join('')
       
        
           
        }
    }
}
    }
})
// 商品滑动门
//定义盒子
var box=document.querySelector('.containers');
//定义图片
var imgs=box.getElementsByTagName('img');
//图片宽度
var imgWidth = imgs[0].offsetWidth;
//隐藏宽度
var exposeWidth = 210;
//盒子宽度
var boxWidth = imgWidth + (imgs.length -1) * exposeWidth;
box.style.width='px';
//设置每道门的初始位置
function SetImgsPos(){
for(var i = 1;i<imgs.length;i++){
    imgs[i].style.left = imgWidth + exposeWidth*(i -1)+ 'px';
    }
}
SetImgsPos();
 //计算每道门应该移动的距离
var translate = imgWidth - exposeWidth;
//为每道门绑定事件
for(var i=0;i<imgs.length;i++){
    //使用立即调用的函数表达式，为了获得不同的i值
    (function(i){
       imgs[i].onmouseover = function(){
           SetImgsPos();
           //打开门
           for(var j=1;j<=i;j++){
               imgs[j].style.left = parseInt(imgs[j].style.left,10) - translate + 'px';
           }
       }
    })(i);
}
})

