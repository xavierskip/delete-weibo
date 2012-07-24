// Auto_remove_weibo_script
// 自动删除新浪微博脚本
//
// 运行方式：
//   #打开你的个人新浪微博页面。就是“我的微博“页面。从你打开的位置开始删起。
//   #在你的浏览器中按F12键打开控制台，复制粘贴以上代码在控制台中运行即可。
//  （注：只支持chrome,firefox浏览器，其他的没有测试，IE的就算了，推荐使用chrome浏览器运行此脚本。）
//
//version:0.15
// author:xavierskip

function del_weibo(){
	var array = [],
		weibo_lists = document.getElementsByClassName("feed_list W_linecolor");
        // get whole page weibo_mid
	for(var i=0;i<weibo_lists.length;i++){
		array.push(weibo_lists[i].getAttribute("mid"));
	};
	output('get all mid and ready to del!');      // output
	//sent XMLHttpRequest to del weibo 
	function deletes(mid){
		var	del   = new XMLHttpRequest();
		del.open('post','http://weibo.com/aj/mblog/del?',false);
		del.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		del.send('mid='+mid+'&_t=0');
		var Return = eval("("+del.response+")");
		if(Return.code=='100000'){
			done++;
		}else{
			fail++;
		};
		output('delete'+mid+'weibo!');        // out put
		return true;
	};
	for(i in array){
		deletes(array[i]);
	};	
};

function next_page(){
	var next_page = document.getElementsByClassName("W_pages")[0];
	next_page.children[next_page.children.length-1].click();
	next++;
};

function main(){
	var onload_page = setInterval(function(){
		window.scroll(0,document.body.scrollHeight);
		//output("scrolling~");   
		if(document.getElementsByClassName("W_pages")[0] != undefined){
    		clearInterval(onload_page);
			output("loading page complete!!!!");     // out put
			del_weibo();
			next_page();
			output(next+" page done. jump to the next page");    // out put
    	}
    },1000);//可以适当调小一下这个数值。至于你的电脑会不会滚烂。。。我也不知道！
};

function output(content){
	document.getElementById('output').innerHTML = content;
};

function goto_del(number){
	for (var x=0;x<number;x++){
		if(x==number){
			alert('删除掉'+done+'条微博！\n'+fail+'条删除失败');  // out put	
			location.reload();
		}else{
			main();
		};
	};
};

// UI
function UI(){
	var layer   = document.createElement('div'),
		wrap    = document.createElement('div'),
		output  = document.createElement('div'),
		content = '<h1>WARNING！！正在删除你的微博~！</h1><h2>后悔的话，马上按F5键，或者关闭本页面！</h2>',
		layer_css = 'opacity: 0.8;background: #000;position: fixed;width: 100%;height: 100%;top: 0;z-index: 99;padding-top: 100px;',
		wrap_css  = 'margin:0 auto;color:#14FF00;width: 720px;height:405px;',
		output_css = 'color:#14FF00;position: relative;bottom:-20%;margin: 50px 0 0 320px;';
							   
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
}


//main
var next =0,
    done = 0,
	fail = 0;
var weibo_num = document.getElementsByTagName('strong')[3].textContent;
var weibo_pags = Math.ceil(weibo_num/45);
UI();
goto_del(weibo_pags);//可以改为你想删除的页数
