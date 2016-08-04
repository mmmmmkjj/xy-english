
function navChange(i) {
	$('nav').find('li').eq(i).css({
		border : '1px solid #8d8d8d',
		borderRadius: '8px'
	});
	$('nav').find('li').eq(i).find('a').css('color','white');
}

$('.menuImage').click(function() {
	$('#selectNav').css({
		right : 0,
		top : $('nav').height()
	}).slideToggle(500);
})
$('#selectNav>section').hover(function(){
	$(this).find('a').css('color','white');
},function() {
	$(this).find('a').css('color','black');
})
