window.addEventListener('load',function(){
   
    let uname=document.querySelector('.uname');
    uname.innerHTML='Hi~'+localStorage.getItem('username')+'';
    let username=document.querySelector('.username');
    username.innerHTML=localStorage.getItem('username');
    let token=localStorage.getItem('token');
    console.log(token);
    let exit_login=document.querySelector('.exit_login');
    exit_login.addEventListener('click',function(){
        const xhr=new XMLHttpRequest();
        xhr.open('POST','http://139.155.69.249:8081/v1/user/loginout');
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.setRequestHeader('Origin','http://39.144.218.38');
        //xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        xhr.send('username='+username.innerHTML+'&token='+token+'');
        xhr.onreadystatechange=function(){
            let str=xhr.response;
            if(str.includes('true'))
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.clear();
                window.location.href="index.html";
        }

    })
})
