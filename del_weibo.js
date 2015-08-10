// Auto_remove_weibo_script
// 自动删除新浪微博脚本
//
// 运行方式：
//   #打开你的个人新浪微博页面。就是“我的微博“页面。从你打开的位置开始删起。
//   #在你的浏览器中按F12键打开控制台，复制粘贴以上代码在控制台中运行即可。
//  （注：只支持chrome,firefox浏览器，其他的没有测试，IE的就算了，推荐使用chrome浏览器运行此脚本。）
//
// version:0.2
// author:xavierskip
function deletes(mid){
    var oReq = new XMLHttpRequest();
    oReq.open('post','http://weibo.com/aj/mblog/del?',false);// false:sync  true:async
    oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oReq.onreadystatechange = function(e){
        if(oReq.readyState === 4){
            var Return = eval("("+oReq.response+")");
            if(Return.code=='100000'){
                done++;
            }else{
                fail++;
            };
            output('delete weibo: '+mid);
        }
    }
    oReq.send('mid='+mid+'&_t=0');
};

function del_weibo(mids){
    // sent XMLHttpRequest to del weibo 
    for(i in mids){
        deletes(mids[i]);
    };
    del_page++;
};

function next_page(d){
    var next = d.querySelector("a.next");
    next.click();
    output(del_page+" page done >> jump to the next page");       // out put
};

function main(next){
    var onload_page = setInterval(function(){
        window.scroll(0,document.body.scrollHeight); 
        var pages = document.querySelector(".W_pages");
        if(pages == null){
           console.log("scrool down");
           return  0;
        };
        output("loading page complete!!!!");
        clearInterval(onload_page);
    },1000);//可以适当调小一下这个数值。至于你的电脑会不会滚烂。。。我也不知道！ 
    var mids = [],
        feed_lists = document.querySelectorAll("#Pl_Official_MyProfileFeed__22 > div > div.WB_feed.WB_feed_profile > div");
    // get whole page weibo_mid
    for(var i=0;i<feed_lists.length;i++){
        var mid = feed_lists[i].getAttribute("mid");
        if(mid) mids.push(mid);
    };
    output('get all mid and ready to del!');
    del_weibo(mids);
    next ? next_page(pages) : output("END PAGE");
};

function goto_del(number){
    var count = number;
    alert('您将删除'+number+'页微博\n您有'+weibo_pags+'页；'+weibo_num+'条微博。');
    console.log('how many pages to del:'+count)  //  console.log() 
    for (var x=0;x<number;x++){
        (x == (number-1)) ? main(0) : main(1)
    };
    // mission complete
    if (del_page == count){
        alert('删除掉'+count+'页,\b'+done+'条微博！\n'+fail+'条删除失败');
        location.href = 'http://weibo.com/profile'; 
    }else{
        console.log("something happed",del_page,"del_page",count,"count")
    };
};

// UI
function output(content){
    document.getElementById('output').innerHTML = content;
    console.log(content);
};
function UI(){
    var layer   = document.createElement('div'),
        wrap    = document.createElement('div'),
        output  = document.createElement('div'),
        content    = '<h1>WARNING！！正在删除你的微博~！</h1><h2>后悔的话，马上按F5键，或者关闭本页面！</h2>',
        layer_css  = 'opacity: 0.8;background: #000;position: fixed;width: 100%;height: 100%;top: 0;z-index: 99;padding-top: 100px;',
        wrap_css   = 'margin:0 auto;color:#14FF00;width: 720px;height:405px;',
        output_css = 'color:#14FF00;position: relative;bottom:-20%;margin: 36px 0 0 320px;';
                               
    layer.setAttribute('id','mask');
    wrap.setAttribute('id','wrap');
    output.setAttribute('id','output');
    
    layer.setAttribute('style',layer_css);
    wrap.setAttribute('style',wrap_css);
    output.setAttribute('style',output_css);
    
    wrap.innerHTML = content;
    output.innerHTML = '>>>>>>>>>>>>>>>>>>>>>>';
    
    wrap.appendChild(output);
    layer.appendChild(wrap);
    document.body.appendChild(layer);   
};
// let's do it!!  
UI();
var del_page =0,
    done = 0,
    fail = 0;
// weibo amount 
var strong = document.getElementsByTagName('strong');
weibo_num = strong[strong.length-1].textContent;
// all weibo page
weibo_pags = Math.ceil(weibo_num/45);
console.log('weibo_num:'+weibo_num);    //   console.log() 
// let's remove !!!
goto_del(weibo_pags);//可以改为你想删除的页数