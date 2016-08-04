/**
 *	 Home页脚本
 *	 18/05/2016
 * 
 */
function sectionHover(i,src1,src2) {
	$('#main>section').eq(i).hover(function() {
	$(this).find('img').attr('src',src1);
	$(this).find('.middle').css('background','#cfdb00');
	$(this).css('color','black');
	},function() {
		$(this).find('img').attr('src',src2);
		$(this).find('.middle').css('background','#b0b0b0');
		$(this).css('color','#b4b4b4');
	});
}
sectionHover(0,'img/home_1_3.png','img/home_1_1.png');
sectionHover(1,'img/home_2_2.png','img/home_2_1.png');
sectionHover(2,'img/home_3_2.png','img/home_3_1.png');
$('#main>section').eq(0).click(function() {
	location.href = '../rendering3/rendering.html';
})
$('#main>section').eq(1).click(function() {
	location.href = '../Bim/bim.html';
})
$('#main>section').eq(2).click(function() {
	location.href = '../3DAnimation/animation.html';
})
navChange(0)