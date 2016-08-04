/**
 *	Bim页脚本
 *	19/05/2016
 *
 */
navChange(4);
var currentTop = 0,
    endTop = 0;
var isBegin = false;//用于判断当前是否已经开始滚动，也就是只需要一象素滚动就可改变这个值，直到滚动到目标位置，此值将会重新变为false

function MouseWheel(ele, fun) {
    var agent = window.navigator.userAgent;
    if (agent.indexOf('Firefox') != -1) {
        ele.addEventListener('DOMMouseScroll', wheel);
    } else {
        ele.onmousewheel = wheel;
    }

    function wheel(ev) {
        ev.preventDefault();
        var down = false;
        if (ev.detail < 0 || ev.wheelDelta > 0) {
            down = true;
        }
        if (!isBegin) {
            fun(down)
        }
        isBegin = true;
    }
}
MouseWheel(window, function(b) {
    currentTop = $(document).scrollTop();
    if (b) {
        endTop = currentTop - 655 - 67;
    } else {
        endTop = currentTop + 655 + 67;
    }
    setTimeout(function() {
        _scroll();
    }, 1000)
})

function _scroll() {
    var begin = 0,
        step = 80;
    var change = endTop - currentTop;

    function _run() {
        begin++;
        var t = Tween.Sine.easeInOut(begin, currentTop, change, step);
        $(document).scrollTop(t);
        if (begin < step) {
            requestAnimationFrame(_run);
        } else {
            isBegin = false;
        }
    }
    _run();

}
