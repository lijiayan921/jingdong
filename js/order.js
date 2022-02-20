window.addEventListener('load',function(){
    let uid=this.localStorage.getItem('user_id')
let token=localStorage.getItem('token');
let username=this.localStorage.getItem('username')
    let shenglue=this.document.querySelector('.shenglue')
    shenglue.querySelector('a').innerHTML=username;
    let xhr0=new XMLHttpRequest();
xhr0.open('GET','http://139.155.69.249:8081/v1/good/car?userid='+uid+'&token='+token+'');
xhr0.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr0.setRequestHeader('Origin','http://39.144.218.38');
xhr0.send();
xhr0.onreadystatechange=function(){
    if(xhr0.readyState===4){
        if(xhr0.status>=200&&xhr0.status<300){
            obj1=JSON.parse(xhr0.response);
            let arr1=[...obj1.data];
            let str=sessionStorage.getItem('unique');
            console.log(str);
            let arr2=str.split(',');
            let arr3=[];
            let k=0;
            for(let i=0;i<arr2.length;i++){
                for(let j=0;j<arr1.length;j++){
                    if(arr1[j].unique_num==arr2[i]){
                       arr3[k]=arr1[j];
                       k++;
                    }
                }
            }
            console.log(arr3);
            let m=0;
            let arr4=[];
            for(let i=0;i<arr3.length;i++){
                arr4[m]=arr3[i].car_id;
                m++;
            }
            console.log(arr4);
            let x=arr3.map(item=>{
                return`
                <div class="goods_box">
                <div class="p-goods">
                    <img src="http://${item.image}" alt="">
                    <div class="p-msg"> Redmi K40 骁龙870 三星AMOLED 120Hz高刷直屏 4800万高清三摄</div>
                    <p class="item_color">颜色：${item.color}</p>
                    <p class="item_version">版本：${item.parm}</p>
                    </div>
                    <div class="p-price">￥${item.price}</div>
                    <div class="count"></div>
                    <div class="store">有货</div>
              </div>`
            })
            let goods_item=document.querySelector('.goods_item');
            goods_item.innerHTML=x.join('');
            // 总计部分
            let price_num=document.querySelector('.price_num');
            // let sum=0;
            // arr3.map(item=>{
            //     sum+=parseFloat(item.price);
            // })
            // console.log(sum);
            let count=document.querySelectorAll('.count');
            console.log(count);
            for(let i=0;i<count.length;i++){
                count[i].innerHTML='x'+sessionStorage.getItem('items_sum')
            }
            let sum=sessionStorage.getItem('psum')
            price_num.innerHTML='￥'+sum;
            let div_address=document.querySelector('.div_address');
            div_address.addEventListener('blur',function(){
            let add=document.querySelector('.add');
            add.innerHTML='寄送至：'+div_address.value
            let username=localStorage.getItem('username');
            let uname=document.querySelector('.uname');
            uname.innerHTML='收件人：'+username;
            let uid1=localStorage.getItem('user_id')
            console.log(uid1);
            // 地址栏失去焦点后创建订单
              let xhr=new XMLHttpRequest();
        xhr.open('POST','http://139.155.69.249:8081/v1/order?token='+token+'');
        xhr.setRequestHeader('Content-Type','application/json');
       // xhr.setRequestHeader('token',token)
        xhr.send(JSON.stringify({
            // "token":token,
        "user_id" : parseInt(uid1),
        "location" : div_address.value,
        "car_id" : arr4
        }));
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status>=200&&xhr.status<300){
                    obj1=JSON.parse(xhr.response);
                    console.log(xhr.response);
                    let arr1=[obj1.data];
                    console.log(arr1[0].order_id);
                    // sessionStorage.setItem('order_id',arr1[0].order_id);
                    // window.location.href='order_success.html'
                    // 点击取消订单，订单取消
                    let btn0=document.querySelector('.btn0');
                    btn0.addEventListener('click',function(){
                        let uid1=localStorage.getItem('user_id');
                        console.log(uid1);
                          let xhr=new XMLHttpRequest();
                    xhr.open('PUT','http://139.155.69.249:8081/v1/order?token='+token+'&user_id='+uid1+'&order_id='+arr1[0].order_id+'');
                    // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                   // xhr.setRequestHeader('token',token)
                    xhr.send();
                    xhr.onreadystatechange=function(){
                        if(xhr.readyState===4){
                            if(xhr.status>=200&&xhr.status<300){
                                // obj1=JSON.parse(xhr.response);
                                console.log(xhr.response);
                                window.location.href='shopcar.html'
                                
                    }}}
                    });
                    // 点击支付订单，订单支付完成
            let btn=document.querySelector('.btn');
            btn.addEventListener('click',function(){
                let uid1=localStorage.getItem('user_id');
                console.log(uid1);
                  let xhr=new XMLHttpRequest();
            xhr.open('POST','http://139.155.69.249:8081/v1/order/pay');
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
           // xhr.setRequestHeader('token',token)
            xhr.send('token='+token+'&user_id='+uid1+'&order_id='+arr1[0].order_id+'');
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4){
                    if(xhr.status>=200&&xhr.status<300){
                        obj1=JSON.parse(xhr.response);
                        console.log(xhr.response);
                        // let arr1=[obj1.data];
                        console.log(obj1.status);
                        sessionStorage.setItem('order_id',arr1[0].order_id);
                        if(obj1.status){
                            window.location.href='order_success.html'
                        }else{
                            let no_funds=document.querySelector('.no_funds');
                            no_funds.style.display='block'
                        }
                        
            }}}
            });
        }}}
            
            });
           
        }
    }
}
})