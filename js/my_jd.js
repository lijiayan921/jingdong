window.addEventListener('load',function(){
    let user=this.document.querySelector('.user');
    let token=this.localStorage.getItem('token');
    let userid=this.localStorage.getItem('user_id')
    let username=this.localStorage.getItem('username')
    user.innerHTML=username;
    let shenglue=this.document.querySelector('.shenglue')
    shenglue.querySelector('a').innerHTML=username;
    let main_box=this.document.querySelector('.main_box')
    let fore_tit=document.querySelectorAll('.fore_tit')
    let my_box=document.querySelectorAll('.my_box');
for (var i = 0; i < fore_tit.length; i++) {
    // 开始给5个小li 设置索引号 
    fore_tit[i].setAttribute('index', i);
    fore_tit[i].onclick = function() {
        // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式
        // 干掉所有人 其余的li清除 class 这个类
        for (var i = 0; i < fore_tit.length; i++) {
            fore_tit[i].className = '';
        }
        // 留下我自己 
        this.className = 'tit_current';
        // 2. 下面的显示内容模块
        var index = this.getAttribute('index');
     //    console.log(index);
        // 干掉所有人 让其余的模块 隐藏
        for (var i = 0; i < my_box.length; i++) {
            my_box[i].style.display = 'none';
        }
        // 留下我自己 让对应的模块 显示出来
        my_box[index].style.display = 'block';
    }
}
//我的订单部分
fore_tit[1].addEventListener('click',function(){ 
     //  查看不同状态的订单
     let f_sort=document.querySelector('.f_sort');
     let dif_ord=f_sort.querySelectorAll('li');
     let dingdan=document.querySelectorAll('.dingdan') 
    for (var i = 0; i < dif_ord.length; i++) {
    // 开始给5个小li 设置索引号 
    dif_ord[i].setAttribute('index', i);
    dif_ord[i].onclick = function() {
        // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式
        // 干掉所有人 其余的li清除 class 这个类
        for (var i = 0; i < dif_ord.length; i++) {
            dif_ord[i].className = '';
        }
        // 留下我自己 
        this.className = 'bor_cur';
        // 2. 下面的显示内容模块
       var index = this.getAttribute('index');
        console.log(index);
       // 干掉所有人 让其余的模块 隐藏
        for (var i = 0; i < dingdan.length; i++) {
            dingdan[i].style.display = 'none';
        }
        //留下我自己 让对应的模块 显示出来
        dingdan[index].style.display = 'block';
        
       
    }
}
    let xhr1=new XMLHttpRequest();
    xhr1.open('GET','http://139.155.69.249:8081/v1/order?token='+token+'&user_id='+userid+'&code=3');
    xhr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr1.setRequestHeader('Origin','http://39.144.218.38');
    xhr1.send();
    xhr1.onreadystatechange=function(){
        if(xhr1.readyState===4){
            if(xhr1.status>=200&&xhr1.status<300){
                let str=xhr1.response
                let empty_box=document.querySelector('.empty_box');
                if(str.includes('null')){
                    empty_box.style.display='block';
                }else{
                    empty_box.style.display='none'
                    let data=JSON.parse(xhr1.response);
                console.log(xhr1.response);
                        console.log(data.data);
                        let obj=data.data;
                          let arr2=[];
                        let j=0;
                        for(let i=0;i<obj.length;i++){
                             arr2[j]=obj[i].data;
                             j++;
                        }
                        console.log(arr2);
                        let arr3=arr2.flat()
                        console.log(arr3);
                         let newarr2=[];
                                let k=0;
                        let newarr3=[];
                        let m=0
                        for(let i=0;i<arr2.length;i++){
                            if(arr2[i].length==1){
                                newarr2[k]=arr2[i];
                                k++;
                            }
                            else{
                                newarr3[m]=arr2[i];
                                m++;
                            }
                        }
                       
                        console.log(newarr3);
                        console.log(newarr2);
                let x=newarr2.flat().map(item=>{
                    return`
                    <div class="order_title">
                    <span class="dealtime">aaaa</span>
                    <span class="or_id">333333</span>
                </div>
                    <div class="goods_box">
    <div class="p-goods">
    <img src="http://${item.image}" alt="">
        <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
        <p class="item_color">颜色：${item.color}</p>
        <p class="item_version">版本：${item.parm}</p>
        </div>
        <div class="p-price">￥${item.price}</div>
        <div class="count">x1</div>
        <div class="store">有货</div>
  </div>
  <div class="order_sums">
                            <span class="user_name">零零零零</span>
                            <span class="adress"></span>
                            <span class="tal_money"></span>
                        </div>
                `
                })
                let y=newarr3.map(item=>{
                   return`
                   <ul class="two_det"><div class="order_title">
                   <span class="dealtime">aaaa</span>
                   <span class="or_id">333333</span>
               </div>
               </ul>
               `
                }); 
                let newarr4=[];
                        let n=0;
                for(let i=0;i<newarr3.length;i++){
                newarr4[n]=newarr3[i].flat().map(item=>{
                 return `
                    <div class="goods_box">
    <div class="p-goods">
    <img src="http://${item.image}" alt="">
        <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
        <p class="item_color">颜色：${item.color}</p>
        <p class="item_version">版本：${item.parm}</p>
        </div>
        <div class="p-price">￥${item.price}</div>
        <div class="count">x1</div>
        <div class="store">有货</div>
  </div>`
                });
                n++;
            }
                  let tal_det=document.querySelector('.tal_det')
                  let li = document.createElement("li");
                  li.innerHTML = x.join('')
                  tal_det.appendChild(li);  
                  let li1 = document.createElement("li");
                  li1.innerHTML = y.join('')
                  tal_det.appendChild(li1);
                  let two_det=document.querySelectorAll('.two_det');
                  let li2=[];
                  for(let i=0;i<two_det.length;i++){
                    li2[i] = document.createElement("li");
                  }
                  console.log(li2);
                 for(let i=0;i<li2.length;i++){
                     li2[i].innerHTML=newarr4[i].join('')
                    two_det[i].appendChild(li2[i]);
                 }
                 let li3=[];
                 for(let i=0;i<two_det.length;i++){
                    li3[i] = document.createElement("li");
                  }
                 for(let i=0;i<li3.length;i++){
                     li3[i].innerHTML=`<div class="order_sums">
                     <span class="user_name">零零零零</span>
                     <span class="adress"></span>
                     <span class="tal_money"></span>
                 </div>`
                    two_det[i].appendChild(li3[i]);
                 }
                 let dealtime=document.querySelectorAll('.dealtime');
                 let or_id=document.querySelectorAll('.or_id');
                 let user_name=document.querySelectorAll('.user_name')
                 let adress=document.querySelectorAll('.adress')
                 let tal_money=document.querySelectorAll('.tal_money')
                 for(let i=0;i<dealtime.length;i++){
                       dealtime[i].innerHTML='创建时间：'+obj[i].create_time
                       or_id[i].innerHTML='订单编号：'+obj[i].order_id
                       user_name[i].innerHTML='收货人：'+username;
                       adress[i].innerHTML='收货地址：'+obj[i].location
                       tal_money[i].innerHTML='总金额：'+obj[i].order_amount
                 }
                }
                
 
// 
// 点击
for(let i=0;i<dif_ord.length;i++){
    dif_ord[i].addEventListener('click',function(){
        let xhr2=new XMLHttpRequest();
        console.log(i);
        xhr2.open('GET','http://139.155.69.249:8081/v1/order?token='+token+'&user_id='+userid+'&code='+i+'');
        xhr2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr2.setRequestHeader('Origin','http://39.144.218.38');
        xhr2.send();
        xhr2.onreadystatechange=function(){
            if(xhr2.readyState===4){
                if(xhr2.status>=200&&xhr2.status<300){
                    let empty_box=document.querySelector('.empty_box');
                    let str=xhr2.response
                   
                    if(str.includes('null')){
                        empty_box.style.display='block';
                    }else{ 
                        let dingdan1=document.querySelectorAll('.dingdan')
                        empty_box.style.display='none'
                        console.log(dingdan1[i].childNodes.length);
                        
                      
                        if(dingdan1[i].childNodes.length==0){
                        let data=JSON.parse(xhr2.response);
                        console.log(xhr2.response);
                                console.log(data.data);
                                let obj=data.data;
                                  let arr2=[];
                                let j=0;
                                for(let i=0;i<obj.length;i++){
                                     arr2[j]=obj[i].data;
                                     j++;
                                }
                                console.log(arr2);
                                let arr3=arr2.flat()
                                console.log(arr3);
                                 let newarr20=[];
                                        let k=0;
                                let newarr30=[];
                                let m=0
                                for(let i=0;i<arr2.length;i++){
                                    if(arr2[i].length==1){
                                        newarr20[k]=arr2[i];
                                        k++;
                                    }
                                    else{
                                        newarr30[m]=arr2[i];
                                        m++;
                                    }
                                }
                                console.log(newarr30);
                                console.log(newarr20);
                        let x=newarr20.flat().map(item=>{
                            return`
                            <div class="order_title">
                            <span class="dealtimes">aaaa</span>
                            <span class="or_ids">333333</span>
                        </div>
                            <div class="goods_box">
            <div class="p-goods">
            <img src="http://${item.image}" alt="">
                <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
                <p class="item_color">颜色：${item.color}</p>
                <p class="item_version">版本：${item.parm}</p>
                </div>
                <div class="p-price">￥${item.price}</div>
                <div class="count">x1</div>
                <div class="store">有货</div>
          </div>
          <div class="order_sums">
                                    <span class="user_names">零零零零</span>
                                    <span class="adresss"></span>
                                    <span class="tal_moneys"></span>
                                </div>
                        `
                        })
                        let y=newarr30.map(item=>{
                           return`
                           <ul class="two_dets1"><div class="order_title">
                           <span class="dealtimes">aaaa</span>
                           <span class="or_ids">333333</span>
                       </div>
                       </ul>
                       `
                        }); 
                        let newarr40=[];
                                let n=0;
                        for(let i=0;i<newarr30.length;i++){
                        newarr40[n]=newarr30[i].flat().map(item=>{
                         return `
                            <div class="goods_box">
            <div class="p-goods">
            <img src="http://${item.image}" alt="">
                <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
                <p class="item_color">颜色：${item.color}</p>
                <p class="item_version">版本：${item.parm}</p>
                </div>
                <div class="p-price">￥${item.price}</div>
                <div class="count">x1</div>
                <div class="store">有货</div>
          </div>`
                        });
                        n++;
                    }
                    // let dingdan1=document.querySelectorAll('.dingdan')
                    console.log(dingdan1);
                        //   let tal_det=document.querySelector('.tal_det')
                          let li =document.createElement("li");
                          li.innerHTML = x.join('');
                          dingdan1[i].appendChild(li);  
                          let li1 =document.createElement("li");
                          li1.innerHTML = y.join('')
                          dingdan1[i].appendChild(li1);
                          let two_dets=document.querySelectorAll('.two_dets');
                          let li2=[];
                          for(let i=0;i<two_dets.length;i++){
                            li2[i] =document.createElement("li");
                          }
                          console.log(li2);
                         for(let i=0;i<li2.length;i++){
                             console.log(li2.length);
                             console.log(newarr40[i]);
                            li2[i].innerHTML=newarr40[i].join('');
                            two_dets[i].appendChild(li2[i]);
                         }
                         let li3=[];
                         for(let i=0;i<two_dets.length;i++){
                            li3[i] = document.createElement("li");
                          }
                         for(let i=0;i<li3.length;i++){
                             li3[i].innerHTML=`<div class="order_sums">
                             <span class="user_names">零零零零</span>
                             <span class="adresss"></span>
                             <span class="tal_moneys"></span>
                         </div>`
                            two_dets[i].appendChild(li3[i]);
                         }
                         let dealtimes=document.querySelectorAll('.dealtimes');
                         let or_ids=document.querySelectorAll('.or_ids');
                         let user_names=document.querySelectorAll('.user_names')
                         let adresss=document.querySelectorAll('.adresss')
                         let tal_moneys=document.querySelectorAll('.tal_moneys')
                         console.log(obj);
                         console.log(dealtimes);
                         for(let i=0;i<dealtimes.length;i++){
                               dealtimes[i].innerHTML='创建时间：'+obj[i].create_time
                               or_ids[i].innerHTML='订单编号：'+obj[i].order_id
                               user_names[i].innerHTML='收货人：'+username;
                               adresss[i].innerHTML='收货地址：'+obj[i].location
                               tal_moneys[i].innerHTML='总金额：'+obj[i].order_amount
                         }
                        }
                        else{
                        for(let i=0;i<dingdan1.length;i++){
                        dingdan1[i].removeChild(li);
                    }
                    // empty_box.style.display='none'
                    let data=JSON.parse(xhr2.response);
                    console.log(xhr2.response);
                            console.log(data.data);
                            let obj=data.data;
                              let arr2=[];
                            let j=0;
                            for(let i=0;i<obj.length;i++){
                                 arr2[j]=obj[i].data;
                                 j++;
                            }
                            console.log(arr2);
                            let arr3=arr2.flat()
                            console.log(arr3);
                             let newarr20=[];
                                    let k=0;
                            let newarr30=[];
                            let m=0
                            for(let i=0;i<arr2.length;i++){
                                if(arr2[i].length==1){
                                    newarr20[k]=arr2[i];
                                    k++;
                                }
                                else{
                                    newarr30[m]=arr2[i];
                                    m++;
                                }
                            }
                            console.log(newarr30);
                            console.log(newarr20);
                    let x=newarr20.flat().map(item=>{
                        return`
                        <div class="order_title">
                        <span class="dealtimes">aaaa</span>
                        <span class="or_ids">333333</span>
                    </div>
                        <div class="goods_box">
        <div class="p-goods">
        <img src="http://${item.image}" alt="">
            <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
            <p class="item_color">颜色：${item.color}</p>
            <p class="item_version">版本：${item.parm}</p>
            </div>
            <div class="p-price">￥${item.price}</div>
            <div class="count">x1</div>
            <div class="store">有货</div>
      </div>
      <div class="order_sums">
                                <span class="user_names">零零零零</span>
                                <span class="adresss"></span>
                                <span class="tal_moneys"></span>
                            </div>
                    `
                    })
                    let y=newarr30.map(item=>{
                       return`
                       <ul class="two_dets"><div class="order_title">
                       <span class="dealtimes">aaaa</span>
                       <span class="or_ids">333333</span>
                   </div>
                   </ul>
                   `
                    }); 
                    let newarr40=[];
                            let n=0;
                    for(let i=0;i<newarr30.length;i++){
                    newarr40[n]=newarr30[i].flat().map(item=>{
                     return `
                        <div class="goods_box">
        <div class="p-goods">
        <img src="http://${item.image}" alt="">
            <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
            <p class="item_color">颜色：${item.color}</p>
            <p class="item_version">版本：${item.parm}</p>
            </div>
            <div class="p-price">￥${item.price}</div>
            <div class="count">x1</div>
            <div class="store">有货</div>
      </div>`
                    });
                    n++;
                }
                // let dingdan1=document.querySelectorAll('.dingdan')
                console.log(dingdan1);
                    //   let tal_det=document.querySelector('.tal_det')
                      let li =document.createElement("li");
                      li.innerHTML = x.join('');
                      dingdan1[i].appendChild(li);  
                      let li1 =document.createElement("li");
                      li1.innerHTML = y.join('')
                      dingdan1[i].appendChild(li1);
                      let two_dets=document.querySelectorAll('.two_dets');
                      let li2=[];
                      for(let i=0;i<two_dets.length;i++){
                        li2[i] =document.createElement("li");
                      }
                      console.log(li2);
                     for(let i=0;i<li2.length;i++){
                         console.log(li2.length);
                         console.log(newarr40[i]);
                        li2[i].innerHTML=newarr40[i].join('');
                        two_dets[i].appendChild(li2[i]);
                     }
                     let li3=[];
                     for(let i=0;i<two_dets.length;i++){
                        li3[i] = document.createElement("li");
                      }
                     for(let i=0;i<li3.length;i++){
                         li3[i].innerHTML=`<div class="order_sums">
                         <span class="user_names">零零零零</span>
                         <span class="adresss"></span>
                         <span class="tal_moneys"></span>
                     </div>`
                        two_dets[i].appendChild(li3[i]);
                     }
                     let dealtimes=document.querySelectorAll('.dealtimes');
                     let or_ids=document.querySelectorAll('.or_ids');
                     let user_names=document.querySelectorAll('.user_names')
                     let adresss=document.querySelectorAll('.adresss')
                     let tal_moneys=document.querySelectorAll('.tal_moneys')
                     for(let i=0;i<dealtimes.length;i++){
                           dealtimes[i].innerHTML='创建时间：'+obj[i].create_time
                           or_ids[i].innerHTML='订单编号：'+obj[i].order_id
                           user_names[i].innerHTML='收货人：'+username;
                           adresss[i].innerHTML='收货地址：'+obj[i].location
                           tal_moneys[i].innerHTML='总金额：'+obj[i].order_amount
                     }
                        }
                }
            }
            }
        }
    })
}

                // let number=document.querySelector('.number');
                // number.innerHTML=arr1.length;
            }
        }
    }

});
fore_tit[2].addEventListener('click',function(){
    let xhr=new XMLHttpRequest();
    xhr.open('GET','http://139.155.69.249:8081/v1/user/detail?token='+token+'&user_id='+userid+'');
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.setRequestHeader('Origin','http://39.144.218.38');
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status>=200&&xhr.status<300){
                obj1=JSON.parse(xhr.response);
                let obj2=obj1.data;
                let money=document.querySelector('.td1_cont');
                let tal_mon=document.querySelector('.tal_mon');
                money.innerHTML=obj2.money.toFixed(2);
                tal_mon.innerHTML='全部余额：'+obj2.money;
                console.log(obj2.money);
                sessionStorage.setItem('chushi_money',obj2.money)
                let btn1=document.querySelector('.add_ye');
                btn1.addEventListener('click',function(){
                    // 充值界面
                    let rich_cont=document.querySelector('.rich_cont');
                    rich_cont.style.display='none';
                    let chongzhi=document.querySelector('.chongzhi');
                    chongzhi.style.display='block';
                    // 点击不同的金额，改变金额的背景
                    // for循环绑定点击事件
                    let greenbr=document.querySelectorAll('.greenbr');
                    let cz_je=document.querySelector('.cz_je');  
                      let moneys=document.querySelectorAll('.money1');
                    console.log(moneys[0].innerHTML);
                    let moneys1=[];
                    let j=0;
                    for(let i=0;i<moneys.length;i++){
                        moneys1[j]=parseInt(moneys[i].innerHTML.substring(0,moneys[i].innerHTML.length-1));
                        j++;
                    }
   for (var i = 0; i < greenbr.length; i++) {
    //  console.log(moneys1);
    greenbr[i].onclick = function() {
        // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式
        // 干掉所有人 其余的li清除 class 这个类
        for (var i = 0; i < greenbr.length; i++) {
            greenbr[i].className = '';
        }
        // 留下我自己 
        this.className = 'cur_bg';
    }
}
console.log(userid);
for(let i=0;i<greenbr.length; i++){
    greenbr[i].addEventListener('click',function(){
        cz_je.value=moneys1[i]
        console.log(cz_je.value);
        sessionStorage.setItem('cz_money',cz_je.value)
    })
}

let btn3=document.querySelector('.btn3');
btn3.addEventListener('click',function(){
    let xhr3=new XMLHttpRequest();
    xhr3.open('POST','http://139.155.69.249:8081/v1/user/recharge');
    xhr3.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr3.setRequestHeader('Origin','http://39.144.218.38');
    xhr3.send('money='+cz_je.value+'&token='+token+'');
    xhr3.onreadystatechange=function(){
        if(xhr3.readyState===4){
            if(xhr3.status>=200&&xhr3.status<300){
                obj1=JSON.parse(xhr3.response);
                if(obj1.status){
                    chongzhi.style.display='none';
                    window.location.href='my_jd.html'
                    // rich_cont.style.display='block';
                }
            }
        }
    }
})
                });
            }
        }
    }
})
    let xhr=new XMLHttpRequest();
    xhr.open('GET','http://139.155.69.249:8081/v1/good/focus?token='+token+'');
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.setRequestHeader('Origin','http://39.144.218.38');
    xhr.send();
    xhr.onreadystatechange=function(){
         let number=document.querySelector('.number');
        if(xhr.readyState===4){
            if(xhr.status>=200&&xhr.status<300){
                let str=xhr.response;
                if(str.includes('null')){
                    number.innerHTML=0;
                }
                obj1=JSON.parse(xhr.response);
                console.log(obj1.data);
                let arr1=[...obj1.data]
                console.log(arr1.length);
                number.innerHTML=arr1.length;
            }
        }
    }
   let num=this.document.querySelector('.yue');
    num.innerHTML=parseInt(sessionStorage.getItem('chushi_money'))+parseInt(sessionStorage.getItem('cz_money'))
})