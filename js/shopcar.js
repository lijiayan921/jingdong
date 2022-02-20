window.addEventListener('load',function(){
    // 获取到是哪样商品
    let username=this.localStorage.getItem('username')
    let shenglue=this.document.querySelector('.shenglue')
    shenglue.querySelector('a').innerHTML=username;
let uid=this.localStorage.getItem('user_id')
let token=localStorage.getItem('token');
let xhr0=new XMLHttpRequest();
xhr0.open('GET','http://139.155.69.249:8081/v1/good/car?userid='+uid+'&token='+token+'');
xhr0.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr0.setRequestHeader('Origin','http://39.144.218.38');
xhr0.send();
xhr0.onreadystatechange=function(){
    if(xhr0.readyState===4){
        if(xhr0.status>=200&&xhr0.status<300){
            obj1=JSON.parse(xhr0.response);
            console.log(xhr0.response);
            let arr1=[...obj1.data];
            console.log(arr1);
            let item_det=document.querySelector('.item_det');
            let x=arr1.map(item=>{
                console.log((item.num));
                        return `
                               <div class="cart_item">
                               <div class="p-checkbox">
                                   <input type="checkbox" class="j-checkbox">
                               </div>
                               <div class="p-goods">
                               <img src="http://${item.image}" alt="">
                               <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
                               <p class="item_color">颜色：${item.color}</p>
                               <p class="item_version">版本：${item.parm}</p>
                               </div>
                               <div class="p-price">￥${item.price}</div>
                               <div class="p-num">
                               <div class="quan_form">
                                   <a href="javascript:;" class="decrement">-</a>
                                   <input type="text" class="itxt" value=${item.num}>
                                   <a href="javascript:;" class="increment">+</a>
                               </div>
                               </div>
                               <div class="p-sum"></div>
                               <div class="p-action">删除</div>
                       </div>`
                               })
                              item_det.innerHTML=x.join('');
                              let p_sum=document.querySelectorAll('.p-sum');
                         
                           // 全选 全不选部分
    // 选中商品，商品的背景颜色改变
    let checkall=document.querySelectorAll('.checkall')
    let j_checkbox=document.querySelectorAll('.j-checkbox')
    let cart_item=document.querySelectorAll('.cart_item');
    for(let i=0;i<checkall.length;i++){
        //j_checkbox[i].checked=true
         checkall[i].addEventListener('click',function(){ 
            
        for(let i=0;i<j_checkbox.length;i++){
            j_checkbox[i].checked=this.checked;
            if(j_checkbox[i].checked){
                cart_item[i].classList.add("check-cart-item");   
            }else{
                cart_item[i].classList.remove("check-cart-item")
            }
        }
        getSum();
    });
    for(let i=0;i<j_checkbox.length;i++){
        j_checkbox[i].onclick=function(){
            let flag=true;
            if(j_checkbox[i].checked){
                cart_item[i].classList.add("check-cart-item");
                
            }else{
                cart_item[i].classList.remove("check-cart-item")
            }
            for(let i=0;i<j_checkbox.length;i++){
                if (!j_checkbox[i].checked) {
                    flag = false;
                    break; // 退出for循环 这样可以提高执行效率 因为只要有一个没有选中，剩下的就无需循环判断了
                }
            }
              for(let i=0;i<checkall.length;i++){
                 checkall[i].checked=flag
             }
             getSum();
        }
    }

    }
  
//增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。

let increment=document.querySelectorAll('.increment');
let decrement=document.querySelectorAll('.decrement');
let itxt=document.querySelectorAll('.itxt')
let p_price=document.querySelectorAll('.p-price');

for(let i=0;i<p_price.length;i++){
    p_sum[i].innerHTML='￥'+arr1[i].price;
}
console.log(itxt);
for(let i=0;i<increment.length;i++){
    increment[i].addEventListener('click',function(){
        //得到当前兄弟文本框的值
    let n=this.previousElementSibling.value;
   console.log(n);
   if(j_checkbox[i].checked){
   let n1=parseInt(n)+1
   let xhr5=new XMLHttpRequest();
xhr5.open('PUT','http://139.155.69.249:8081/v1/good/car?car_id='+arr1[i].car_id+'&token='+token+'&num='+n1+'');
xhr5.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr5.setRequestHeader('Origin','http://39.144.218.38');
xhr5.send();
xhr5.onreadystatechange=function(){
if(xhr5.readyState===4){
if(xhr5.status>=200&&xhr5.status<300){
   console.log(xhr5.response);
}
}
}
}
    this.previousElementSibling.value=parseInt(n)+1;
    let m=this.previousElementSibling.value
    // 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
    // 当前商品的价格
    let p=this.parentNode.parentNode.previousElementSibling.innerHTML
    p=p.substr(1); 
    console.log(p);
    let price=parseFloat(p)*m;
    price=price.toFixed(2); 
    this.parentNode.parentNode.nextElementSibling.innerHTML='￥'+price;
    getSum();
    console.log(j_checkbox[i].checked);
})
}
for(let i=0;i<decrement.length;i++){
    decrement[i].addEventListener('click',function(){
        //得到当前兄弟文本框的值
    let n=this.nextElementSibling.value;
    if(n==1){
        return false;
    }
    if(j_checkbox[i].checked){
        let n2=parseInt(n)-1
        let xhr5=new XMLHttpRequest();
     xhr5.open('PUT','http://139.155.69.249:8081/v1/good/car?car_id='+arr1[i].car_id+'&token='+token+'&num='+n2+'');
     xhr5.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
     xhr5.setRequestHeader('Origin','http://39.144.218.38');
     xhr5.send();
     xhr5.onreadystatechange=function(){
     if(xhr5.readyState===4){
     if(xhr5.status>=200&&xhr5.status<300){
        console.log(xhr5.response);
     }
     }
     }
     }
    console.log(n);
    this.nextElementSibling.value=parseInt(n)-1;
    let m=this.nextElementSibling.value;
    // 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
    // 当前商品的价格
    let p=this.parentNode.parentNode.previousElementSibling.innerHTML
    p=p.substr(1); 
    console.log(p);
    let price=parseFloat(p)*m;
    price=price.toFixed(2); 
    this.parentNode.parentNode.nextElementSibling.innerHTML='￥'+price;
    getSum();
  
})
}
for(let i=0;i<itxt.length;i++){
    itxt[i].addEventListener('change',function(){
  // 先得到文本框的里面的值 乘以 当前商品的单价 
  let txt=this.value;
  let p=this.parentNode.parentNode.previousElementSibling.innerHTML
  p=p.substr(1); 
  console.log(p);
  let price=parseFloat(p)*txt;
  price=price.toFixed(2); 
  this.parentNode.parentNode.nextElementSibling.innerHTML='￥'+price;
  getSum();
    })
} 
// let money = 0; let count=0;

 // 5. 计算总计和总额模块
getSum();
function getSum() {
    let amount_sum=document.querySelector('.amount-sum');
    let items_sum=amount_sum.querySelector('em');
    let price_sum=document.querySelector('.price-sum');
    let psum=price_sum.querySelector('em');
let j=0;
let newarr=[];
let k=0;
let m=0
let newarr0=[] 
let arr2=[]
let money=0;
let count=0;
for(let i=0;i<j_checkbox.length;i++){
    if(j_checkbox[i].checked){
        console.log(arr1[i]);
        arr2[m]=arr1[i].unique_num;
        newarr0[k]=itxt[i].value;
        let x=j_checkbox[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
        console.log(x);
       x=x.substr(1);
        newarr[j]=x;
        m++
        j++;
        k++;
}
}
console.log(arr2);
console.log(newarr0);
console.log(newarr);
console.log(price_sum);
for(let i=0;i<newarr0.length;i++){
    count+=parseInt(newarr0[i])
    //console.log(newarr0[i]);
} 
for(let i=0;i<newarr.length;i++){
    money+=parseFloat(newarr[i]); 
}
items_sum.innerHTML=count
money=money.toFixed(2); 
psum.innerHTML=money

// 点击结算按钮，获得当前选中商品的unique_num
let btn_area=document.querySelector('.btn-area');
btn_area.addEventListener('click',function(){
    console.log(arr2);
   let str=arr2.join(',');
   console.log(str);
   sessionStorage.setItem('unique',str);
   sessionStorage.setItem('psum',money)
   sessionStorage.setItem('items_sum',items_sum.innerHTML)
   window.location.href='order.html'
})


}           
//   删除购物车的一件商品
                            let p_action=document.querySelectorAll('.p-action');
                            console.log(p_action);
                            for(let i=0;i<p_action.length;i++){
                                p_action[i].addEventListener('click',function(){
                                    let car_id=arr1[i].car_id;
                                    let xhr0=new XMLHttpRequest();
xhr0.open('DELETE','http://139.155.69.249:8081/v1/good/car?car_id='+car_id+'&token='+token+'');
xhr0.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr0.setRequestHeader('Origin','http://39.144.218.38');
xhr0.send();
xhr0.onreadystatechange=function(){
    if(xhr0.readyState===4){
        if(xhr0.status>=200&&xhr0.status<300){
            obj1=JSON.parse(xhr0.response);
            let str=xhr0.response;
            console.log(xhr0.response);
            if(str.includes('')){
                let xhr0=new XMLHttpRequest();
xhr0.open('GET','http://139.155.69.249:8081/v1/good/car?userid='+uid+'&token='+token+'');
xhr0.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr0.setRequestHeader('Origin','http://39.144.218.38');
xhr0.send();
xhr0.onreadystatechange=function(){
    if(xhr0.readyState===4){
        if(xhr0.status>=200&&xhr0.status<300){
            let str=xhr0.response
            console.log(str);
            if(str.includes('null')){
                window.location.href='empty_shopcar.html'
            }
            else{
            obj1=JSON.parse(xhr0.response);
            console.log(xhr0.response);
            let arr1=[...obj1.data];
            console.log(arr1);
            let item_det=document.querySelector('.item_det');
            let x=arr1.map(item=>{
                        return `
                               <div class="cart_item">
                               <div class="p-checkbox">
                                   <input type="checkbox" class="j-checkbox">
                               </div>
                               <div class="p-goods">
                               <img src="http://${item.image}" alt="">
                               <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
                               <p class="item_color">颜色：${item.color}</p>
                               <p class="item_version">版本：${item.parm}</p>
                               </div>
                               <div class="p-price">￥${item.price}</div>
                               <div class="p-num">
                               <div class="quan_form">
                                   <a href="javascript:;" class="decrement">-</a>
                                   <input type="text" class="itxt" value="1">
                                   <a href="javascript:;" class="increment">+</a>
                               </div>
                               </div>
                               <div class="p-sum"></div>
                               <div class="p-action"><a href="javascript:;">删除</a></div>
                       </div>`
                               })
            item_det.innerHTML=x.join('');
    // 全选 全不选部分
    // 选中商品，商品的背景颜色改变
    let checkall=document.querySelectorAll('.checkall')
    let j_checkbox=document.querySelectorAll('.j-checkbox')
    let cart_item=document.querySelectorAll('.cart_item');
    for(let i=0;i<checkall.length;i++){
        //j_checkbox[i].checked=true
         checkall[i].addEventListener('click',function(){ 
            
        for(let i=0;i<j_checkbox.length;i++){
            j_checkbox[i].checked=this.checked;
            if(j_checkbox[i].checked){
                cart_item[i].classList.add("check-cart-item");
                
            }else{
                cart_item[i].classList.remove("check-cart-item")
            }
        }
        getSum();
    });
    for(let i=0;i<j_checkbox.length;i++){
        j_checkbox[i].onclick=function(){
            
            let flag=true;
            if(j_checkbox[i].checked){
                cart_item[i].classList.add("check-cart-item");
                
            }else{
                cart_item[i].classList.remove("check-cart-item")
            }
            for(let i=0;i<j_checkbox.length;i++){
                if (!j_checkbox[i].checked) {
                    flag = false;
                    break; // 退出for循环 这样可以提高执行效率 因为只要有一个没有选中，剩下的就无需循环判断了
                }
            }
              for(let i=0;i<checkall.length;i++){
                 checkall[i].checked=flag
             }
             getSum();
        }
    }

    }
//增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。

let increment=document.querySelectorAll('.increment');
let decrement=document.querySelectorAll('.decrement');
let itxt=document.querySelectorAll('.itxt')
let p_price=document.querySelectorAll('.p-price');
let p_sum=document.querySelectorAll('.p-sum')
console.log(p_sum);
for(let i=0;i<p_price.length;i++){
    p_sum[i].innerHTML='￥'+arr1[i].price;
}
console.log(itxt);
for(let i=0;i<increment.length;i++){
    increment[i].addEventListener('click',function(){
        //得到当前兄弟文本框的值
    let n=this.previousElementSibling.value;
    console.log(n);
    this.previousElementSibling.value=parseInt(n)+1;
    let m=this.previousElementSibling.value
    // 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
    // 当前商品的价格
    let p=this.parentNode.parentNode.previousElementSibling.innerHTML
    p=p.substr(1); 
    console.log(p);
    let price=parseFloat(p)*m;
    price=price.toFixed(2); 
    this.parentNode.parentNode.nextElementSibling.innerHTML='￥'+price;
    getSum();
})
}
for(let i=0;i<decrement.length;i++){
    decrement[i].addEventListener('click',function(){
        //得到当前兄弟文本框的值
    let n=this.nextElementSibling.value;
    if(n==1){
        return false;
    }
    console.log(n);
    this.nextElementSibling.value=parseInt(n)-1;
    let m=this.nextElementSibling.value;
    // 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
    // 当前商品的价格
    let p=this.parentNode.parentNode.previousElementSibling.innerHTML
    p=p.substr(1); 
    console.log(p);
    let price=parseFloat(p)*m;
    price=price.toFixed(2); 
    this.parentNode.parentNode.nextElementSibling.innerHTML='￥'+price;
    getSum();
})
}
for(let i=0;i<itxt.length;i++){
    itxt[i].addEventListener('change',function(){
  // 先得到文本框的里面的值 乘以 当前商品的单价 
  let txt=this.value;
  let p=this.parentNode.parentNode.previousElementSibling.innerHTML
  p=p.substr(1); 
  console.log(p);
  let price=parseFloat(p)*txt;
  price=price.toFixed(2); 
  this.parentNode.parentNode.nextElementSibling.innerHTML='￥'+price;
  getSum();
    })
} 
// let money = 0; let count=0;

 // 5. 计算总计和总额模块
getSum();
function getSum() {
    let amount_sum=document.querySelector('.amount-sum');
    let items_sum=amount_sum.querySelector('em');
    let price_sum=document.querySelector('.price-sum');
    let psum=price_sum.querySelector('em');
let j=0;
let newarr=[];
let k=0;
let m=0
let newarr0=[] 
let arr2=[]
let money=0;
let count=0;
for(let i=0;i<j_checkbox.length;i++){
    if(j_checkbox[i].checked){
        console.log(arr1[i]);
        arr2[m]=arr1[i];
        newarr0[k]=itxt[i].value;
        let x=j_checkbox[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
        console.log(x);
       x=x.substr(1);
        newarr[j]=x;
        m++
        j++;
        k++;
}
}
console.log(arr2);
console.log(newarr0);
console.log(newarr);
for(let i=0;i<newarr0.length;i++){
    count+=parseInt(newarr0[i])
    //console.log(newarr0[i]);
} 
for(let i=0;i<newarr.length;i++){
    money+=parseFloat(newarr[i]); 
}
items_sum.innerHTML=count
money=money.toFixed(2); 
psum.innerHTML=money
}          
                            }
                        }}}
            }
         }
         }
         }
        })
    }
}
// 清空购物车
let clear_all=document.querySelector('.clear-all');
clear_all.addEventListener('click',function(){
    let xhr6=new XMLHttpRequest();
xhr6.open('PUT','http://139.155.69.249:8081/v1/good/car/clean?user_id='+uid+'&token='+token+'');
// xhr6.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr6.setRequestHeader('Origin','http://39.144.218.38');
xhr6.send();
xhr6.onreadystatechange=function(){
    if(xhr6.readyState===4){
        if(xhr6.status>=200&&xhr6.status<300){
            console.log(xhr6.response);
        }
    }
}
})
    }
}   
})