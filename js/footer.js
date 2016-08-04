/**
 *	页脚脚本 
 *	18/05/2016
 *	
 */
$('footer').find('img').eq(0).hover(function() {
	$(this).attr('src','../img/email_2.png');
},function() {
	$(this).attr('src','../img/email_1.png');
});
$('footer').find('img').eq(1).hover(function() {
	$(this).attr('src','../img/face_2.png');
},function() {
	$(this).attr('src','../img/face_1.png');
});
$('footer').find('img').eq(2).hover(function() {
	$(this).attr('src','../img/youtub_2.png');
},function() {
	$(this).attr('src','../img/youtub_1.png');
});
$('footer').find('img').eq(3).hover(function() {
	$(this).attr('src','../img/in_2.png');
},function() {
	$(this).attr('src','../img/in_1.png');
});
$('footer').find('img').eq(4).hover(function() {
	$(this).attr('src','../img/twitter_2.png');
},function() {
	$(this).attr('src','../img/twitter_1.png');
});