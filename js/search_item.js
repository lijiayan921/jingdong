window.addEventListener('load',function(){
    let username=document.querySelector('.username');
    username.innerHTML=localStorage.getItem('username');
    // 页面一加载，就请求左侧侧边栏数据
let item_id=document.querySelectorAll('.item_id');
let fenlei=document.querySelector('.fenlei');
let left_nav=document.querySelector('.left-nav');
// let nav_l=document.querySelector('.nav_l');
// console.log(nav_l);
console.log(item_id[0]);
console.log(item_id.length);
let search_ipt=this.sessionStorage.getItem('search_ipt')
let xhr=new XMLHttpRequest();
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
fenlei.addEventListener('mouseover',function(){
    left_nav.style.display='block';
}) 
fenlei.addEventListener('mouseout',function(){
    left_nav.style.display='none';
}) 
left_nav.addEventListener('mouseover',function(){
    left_nav.style.display='block';
}) 
left_nav.addEventListener('mouseout',function(){
    left_nav.style.display='none';
}) 
// tab栏切换
let navitems=document.querySelector('.navitems')
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
xhr2.open('GET','http://139.155.69.249:8081/v1/home/goods?good_name='+search_ipt+'');
xhr2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr2.setRequestHeader('Origin','http://39.144.218.38');
xhr2.send();
xhr2.onreadystatechange=function(){
    if(xhr2.readyState===4){
        if(xhr2.status>=200&&xhr2.status<300){
            let str=xhr2.response
            console.log(xhr2.response);
            let phone_list=document.querySelector('.phone_list');
            let cart_empty=document.querySelector('.cart_empty');
            if(str.includes('null')){
               phone_list.style.display='none';
               cart_empty.style.display='block';
            }else{
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
                   <span class="phone_brand attr">${item.introduce}</span>
                  
               </div>
               <div class="comment_box"> 
                  <span class="comment">${item.store_name}</span>
                  
               <div class="bottom_desc">
                   <span class="zy">自营</span>
                   <span class="fxg">放心购</span>
                   <span class="guanzhu">
                       <i class="iconfont icon-aixin-"></i>关注
                   </span>
               </div>
           </li>`
            })
            
          
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
        this.className='head_click';
    })
}
            }
  
}
    }
}
})