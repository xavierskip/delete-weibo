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


