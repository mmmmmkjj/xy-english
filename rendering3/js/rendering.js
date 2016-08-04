/**
 *	rendering页脚本
 *	18/05/2016
 *
 */
navChange(2);
var mySwiper = new Swiper('.swiper-container', {
    effect: 'fade',
    autoplay: 3000,
    loop: true,
    speed: 300,
    autoplayDisableOnInteraction: false,
    pagination: '.swiper-pagination',
    paginationType: 'bullets',
});
var imgData = { 'data': [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpeg" }, { "src": "4.jpeg" }, { "src": "5.jpeg" }, { "src": "6.jpg" }, { "src": "7.jpg" }, { "src": "8.jpg" }, { "src": "9.jpg" }, { "src": "10.jpg" }, { "src": "11.jpg" }, { "src": "12.jpg" }, { "src": "13.jpg" }, { "src": "14.jpg" }, { "src": "15.jpg" }, { "src": "16.jpg" }] }
$(window).on('load', function() {
    windowWidht()
    run();
    $(window).resize(function() {
        windowWidht()
        run()
    })
    MouseWheel(window, function(b) {
        if (!b && scrollside()) {
            run();
        }
    });
    /**
     *下面这段代码替换了你原来的那个  createZoom方法  使用事件委托的方式   给每一个Li添加事件
     *而放大镜那个蒙版  改为了  在rendering.html中初始化，然后rendering.css中指定了对应的样式
     *只需要在鼠标移入li时指定蒙版的大小及位置即可
     *然后需要先解除click事件  再重新绑定click事件
     *
     *
     *
     *
     */
    $("#renderingFall>ul").on("mouseenter", "li", function() {
    	var that = $(this);
        $(".zoom").css({
        	width:$(this).width(),
        	height : $(this).height(),
        	top : $(this).offset().top+5,
        	left : $(this).offset().left+5
        }).fadeIn().off("click").on("click",function(){
        	createDivZoomWrap(that.children("img"));
        });
    })

});

function windowWidht() {
    if ($(window).width() >= 580) {
        $('.display').show();
        $('.show').css('width', '25%')
    } else {
        $('.display').hide();
        $('.show').css('width', '50%')
    }
}
//创建li
function createLi() {
    $.each(imgData.data, function(m, n) {
        var newli = $('<li/>');
        var img = $('<img>').attr('src', 'img/' + $(n).attr("src")).appendTo(newli);
        img.load(function() {
            setPosition(newli);
        })
    });
}
//排列
var uls = $('#renderingFall>ul');

function setPosition(ele) {
    var minIndex = 0;
    //取出第一个ul的高度
    var minH = uls.eq(minIndex).height();
    uls.each(function(m, n) {
        var uHeight = $(this).height();
        if (minH > uHeight) {
            minH = uHeight;
            minIndex = m;
        }
    })
    ele.appendTo($('#renderingFall>ul').eq(minIndex));
}
//滚动条位置判断
function scrollside() {
    var li = $('#renderingFall>ul').find('li');
    var lastLiHeight = li.last().offset().top; //最下面一张图片的top
    var scrollTop = $(window).scrollTop();
    var pageHeight = document.documentElement.clientHeight;
    if (lastLiHeight + li.last().height() <= scrollTop + pageHeight) {
        return true;
    }
}
//判断滚动方向 好像没啥用
function MouseWheel(ele, fun) {
    var agent = window.navigator.userAgent;
    if (agent.indexOf('Firefox') != -1) {
        ele.addEventListener('DOMMouseScroll', wheel);
    } else {
        ele.onmousewheel = wheel;
    }

    function wheel(ev) {
        var down = false;
        if (ev.detail < 0 || ev.wheelDelta > 0) {
            down = true;
        }
        fun(down)
    }
}

function run() {
    createLi()
}
//创建弹窗
function createDivZoomWrap(thisImg) {
	console.log(thisImg)
    var divZoomWrap = $('<div/>')
        .css({
            width: '100%',
            height: $(window).height(),
            background: 'rgba(0,0,0,0.7)',
            position: 'fixed',
            zIndex: 9,
            top: 0,
        })
    var divZoomImgWrap = $('<div/>')
        .css({
            width: '60%',
            border: '5px solid white',
            position: 'absolute',
            margin: '0 auto',
            background: 'white',
            borderBottom: '20px solid white',
            left: '20%',
            top: '20%',
            animation: 'zoomAnimate',
            animationDuration: '1s'
        })
    var divZoomImg = $('<img />').attr('src', thisImg.attr('src'))
//      .css('width', '100%');
//      var w,h;
        divZoomImg.load(function() {
        		console.log($(this).height())
        })
        divZoomImg.css('width', '50%');
    divZoomWrap.click(function() {
        $(this).hide();
    })
    divZoomImg.appendTo(divZoomImgWrap);
//  divZoomImgWrap.appendTo(divZoomWrap).fadeIn(1000);
    
    divZoomImg.appendTo(divZoomWrap).fadeIn(1000);
    divZoomWrap.prependTo('body');
}
//预加载
var obj = {
    imgs: imgData.data,
    loading: loading,
    loaded: loaded,
}
var lodp = $('<p/>').html('loading...').css({
    position: 'fixed',
    bottom: 0
});

function loading() {
    lodp.appendTo('body');
}

function loaded() {
    lodp.remove();
}
//loadingFun(obj);
