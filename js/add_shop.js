window.addEventListener('load',function(){
    let username=this.localStorage.getItem('username')
    let shenglue=this.document.querySelector('.shenglue')
    shenglue.querySelector('a').innerHTML=username;
    let index=this.sessionStorage.getItem('index')
    let index1=this.sessionStorage.getItem('index1')
    let item_color=this.document.querySelector('.item_color')
    let item_version=this.document.querySelector('.item_version');
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
                let arr1=[...obj1.data];
                // console.log(arr1);
                // console.log(arr1[0].color);
                function group(array, subGroupLength) {
                    let index = 0;
                    let newArray = [];
                    while(index < array.length) {
                        newArray.push(array.slice(index, index += subGroupLength));
                    }
                    return newArray;
                }
                var groupedArray = group(arr1, 4);
                for(let i=0;i<groupedArray.length;i++){
                    for(let j=0;j<groupedArray[i].length;j++){
                        // // if(index==i&&index1==j){
                        //    console.log(groupedArray[i][j]);
                           
                            if(index==i&&index1==j){
                                item_color.innerHTML='颜色：'+groupedArray[i][0].color;
                                item_version.innerHTML='版本：'+groupedArray[i][j].parm;
                                let unique_num=groupedArray[i][j].unique_num;
                                sessionStorage.setItem('unique_num',unique_num);
                                //  console.log(groupedArray[i][j].unique_num);
                                 // 点击购物车结算 将这个商品添加到购物车
    let go_shopcar=document.querySelector('.go_shopcar');
    let token=localStorage.getItem('token');
    go_shopcar.addEventListener('click',function(){
        let xhr=new XMLHttpRequest();
        xhr.open('POST','http://139.155.69.249:8081/v1/good/car');
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.setRequestHeader('Origin','http://39.144.218.38');
        xhr.send('token='+token+'&unique_num='+unique_num+'');
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status>=200&&xhr.status<300){
                    // obj1=JSON.parse(xhr.response);
                    // console.log(obj1);
                    let str=xhr.response
                    if(str.includes('OK')){
                        window.location.href='shopcar.html'
                    }
                }
            }
        }
    })
                            }
                    } 
                }
            }
        }
    }
   
})