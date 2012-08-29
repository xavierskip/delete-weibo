// http://weibo.com/comment/outbox

function del_commit(cid){
	var del = new XMLHttpRequest();
	del.open('post','http://weibo.com/aj/comment/del?',true);
	del.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	del.send('cid='+cid+'&_t=0');
	console.log('del\t'+cid)
	// end
	count++
	if (count == cids.length){
		console.log('well done')
	}	
}

var count = 0,
	cids  = [],
	hover = document.getElementsByClassName('hover')

for (var i=0;i<hover.length;i++){
	var a = hover[i].children[0]
	var cid = a.getAttribute('action-data').slice(4)
	cids.push(cid)
}

for (i in cids){
	del_commit(cids[i])
}


//  http://weibo.com/*userID*/follow





//  http://weibo.com/*userID*/fans




// API 

var api = new XMLHttpRequest();
api.open('get','https://api.weibo.com/2/friendships/followers.json?source=1528555305&uid=1779182613&count=200',false);
api.send();
var res = JSON.parse(api.response);
for(var i=1;i<res.users.length;i++)
	{
		console.log(i+':'+res.users[i].name);
	}
console.log('totle:'+res.users.length)



function api(method,url,data){
	var api = new XMLHttpRequest();
	api.open(method,url+'?'+data,false);
	api.send();
	return JSON.parse(api.response);
};
var response = api('get','https://api.weibo.com/2/comments/by_me.json','source=1528555305&count=200');
var id = [];
for(var i=0;i<response.comments.length;i++){
	id.push(response.comments[i].id)
}
console.log(id)