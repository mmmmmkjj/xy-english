/**
 *	rendering页脚本 
 *	18/05/2016
 *	缺：瀑布流响应  放大镜
 */
navChange(2);
var mySwiper = new Swiper('.swiper-container', {
	effect : 'fade',
	autoplay : 3000,
	loop : true,//轮播
	speed : 300,
	autoplayDisableOnInteraction : false,//false 手动操作后还继续自动播放
	pagination : '.swiper-pagination',//分页
	paginationType : 'bullets'//分页样式
});
$(window).on('load',function() {
	imgLocation();
	var imgData = {'data':[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpeg"},{"src":"4.jpeg"},{"src":"5.jpeg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"}]} 
	$(window).on('resize scroll',function(){
		imgLocation()
		MouseWheel(window,function(b) {
			if(scrollside()&& !b) {
				$.each(imgData.data,function(m,n) {
					var newli = $('<li/>').appendTo($('#renderingFall>ul'));
					$('<img>').attr('src','img/'+$(n).attr("src")).appendTo(newli);
				});
			}
			imgLocation()
		})
	})
});	

function imgLocation() {
	var li = $('#renderingFall').find('li');
	//放大镜  遍历li
	$.each(li,function(m,n) {
		var renderingFace = $('<div/>').prependTo($(this)).hide();
		renderingFace.css({
			width : $(this).find('img').width(),
			height : $(this).find('img').height(),
			background : 'rgba(0,0,0,0.3)',
			position : 'absolute',
		})
		$(this).hover(function() {
			renderingFace.fadeIn(200)
		},function() {
			renderingFace.fadeOut(200)
		})
		renderingFace.click(function() {
			createDivZoomWrap($(this).siblings('img'))
			console.log($(this).siblings('img').attr('src'))
		})
	})
//	if($(window).width() >= 570) {
//		li.css('width','25%')
//	}else {
//		li.css('width','50%')
//	}
	var liWidth = li.eq(0).width();
	//列数 没用 css宽度25%
	var cols = parseInt($(window).width() / liWidth);
	var liArr = [];
	$.each(li,function(m,n) {
		var liHeight = li.eq(m).height();
		if(m<cols) {
			liArr[m] = liHeight;
		}else {
			var minHeight = Math.min.apply(null,liArr);
			var minIndex = $.inArray(minHeight,liArr);
			$(n).css({
				position : 'absolute',
				top : minHeight,
				left : li.eq(minIndex).position().left
			});
			liArr[minIndex] += li.eq(m).height();
		}
	});
	
}
//加载判断
function scrollside() {
	var li = $('#renderingFall>ul').find('li');
	var lastLiHeight = li.last().offset().top;//最下面一张图片的top
	var scrollTop = $(window).scrollTop();
	var pageHeight = $(document).height();
	if(lastLiHeight <= scrollTop + pageHeight) {
		return true;
	}
}
//创建弹窗
function createDivZoomWrap(thisImg) {
	var divZoomWrap = $('<div/>')
	.css({
		width : '100%',
		height : $(window).height(),
		background : 'rgba(0,0,0,0.7)',
		position : 'fixed',
		zIndex : 9,
		top : 0,
	})
	var divZoomImgWrap = $('<div/>')
	.css({
		width : '60%',
		border : '5px solid white',
		position : 'absolute',
		margin : '0 auto',
		background : 'white',
		borderBottom : '20px solid white',
		left : '20%',
		top : '10%'
	})
	var divZoomImg = $('<img />').attr('src',thisImg.attr('src'))
	.css('width','100%')
	divZoomWrap.click(function() {
		$(this).hide();
	})
	divZoomImg.appendTo(divZoomImgWrap)
	divZoomImgWrap.appendTo(divZoomWrap)
	divZoomWrap.prependTo('body')
	console.log(divZoomWrap)
}
//判断鼠标滚动方向
function MouseWheel(ele,fun) {
	var agent = window.navigator.userAgent;
	if(agent.indexOf('Firefox') != -1) {
		ele.addEventListener('DOMMouseScroll',wheel);
	}else {
		ele.onmousewheel = wheel;
	}
	function wheel(ev) {
		var down = false;
		if(ev.detail < 0 || ev.wheelDelta > 0) {
			down = true;
		}
		fun(down)
	}
}