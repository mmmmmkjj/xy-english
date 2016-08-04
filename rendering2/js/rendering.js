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
	autoplayDisableOnInteraction : false,
	pagination : '.swiper-pagination',//分页
	paginationType : 'bullets'//分页样式
});
var imgData = {'data':[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpeg"},{"src":"4.jpeg"},{"src":"5.jpeg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"}]} 
$(window).on('load',function() {
	run();
	$(window).resize(function() {
		getCols();
		var lis = $('ul').find('li');
		lis.each(function(m,n) {
			setPosition(n)
		})
	})
	$(window).on('scroll',function(){
		MouseWheel(window,function(b) {
			if(!b&&scrollside()) {
				run()
			}
		})
	})
});	
//获取当前页面宽度下的总列数
var colsArr;
var cols = 0;
function getCols() {
	colsArr = [];
	if($(window).width()>=570) {
		cols = 4;
	}else {
		cols = 2;
	}
	for(var i = 0;i < cols;i ++) {
		colsArr[i] = 0;
	}
}
getCols();
function setPosition(ele) {
	var minHeight = Math.min.apply(null,colsArr);
	var minIndex = $.inArray(minHeight,colsArr);
	ele.css({
		position : 'absolute',
		left : minIndex * $(window).width()/cols,
		top : minHeight
	})
	colsArr[minIndex] += ele.height();
	console.log(cols)
}
function createLi() {
	$.each(imgData.data,function(m,n) {
		var newli = $('<li/>').appendTo($('#renderingFall>ul'));
		var img = $('<img>').attr('src','img/'+$(n).attr("src")).appendTo(newli);
		img.load(function() {
			setPosition(newli);
		})
	});
}
function scrollside() {
	var li = $('#renderingFall>ul').find('li');
	var lastLiHeight = li.last().offset().top;//最下面一张图片的top
	var scrollTop = $(window).scrollTop();
	var pageHeight = $(document).height();
	if(lastLiHeight <= scrollTop + pageHeight) {
		return true;
	}
}
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
function run() {
	createLi()
	createZoom()
}






function createZoom() {
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