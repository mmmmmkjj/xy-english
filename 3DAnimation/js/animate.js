/**
 *	3DAnimate页脚本
 *	19/05/2016
 *	
 */
navChange(3);
$('.animateBig').hover(function() {
	$(this).siblings('img').attr('src','img/play_small_b.png');
},function() {
	$(this).siblings('img').attr('src','img/play_small_h.png');
});
$('.animateBig').click(function() {
	$('#animateTopBig').attr('src',$(this).attr('src'));
});
