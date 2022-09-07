window.onload = function () {


    // 需求1：鼠标经过sildes，显示左右的按钮
    var container = document.querySelector('.container');
    var leftBox = document.querySelector('.arrow > a:first-child');
    var rightBox = document.querySelector('.arrow > a:last-child')
    container.onmouseenter = function () {
        leftBox.style.display = 'block';
        rightBox.style.display = 'block';

        // 鼠标经过停止定时器
        clearInterval(timer);
    }
    container.onmouseleave = function () {
        leftBox.style.display = 'none';
        rightBox.style.display = 'none';

        // 鼠标离开开启
        clearInterval(timer);
        timer = setInterval(function () {
            rightBox.onclick();
        }, 2000)
    }


    // 需求2：鼠标点击小圆点下标，切换图片的显示
    var olLis = document.querySelectorAll('ol li');
    var ulLis = document.querySelectorAll('ul li');
    olLis.forEach(function (el, index) {
        el.onclick = function () {
            changeImg(index);

            // 统一索引
            count = index;
        }
    })

    // 需求3：点击左右按钮，切换图片的显示
    var count = 0;
    var flag = true;
    rightBox.onclick = function () {
        if (flag) {
            flag = false;
            count++;
            if (count >= ulLis.length) count = 0;
            changeImg(count);
        }
    }
    leftBox.onclick = function () {
        if (flag) {
            flag = false;
            count--;
            if (count < 0) count = ulLis.length - 1;
            changeImg(count);
        }
    }

    function changeImg(n) {
        // 排他思想
        olLis.forEach(function (item, i) {
            item.removeAttribute('class');
            // 同步处理图片
            ulLis[i].style.opacity = 0;
        })

        olLis[n].className = 'current';
        ulLis[n].style.opacity = 1;
    }


    // 需求4：自动开启图片切换
    var timer = setInterval(function () {
        // 触发右按钮的点击事件
        rightBox.onclick();
    }, 2000)

    // 优化：开启节流阀（截流）
    ulLis.forEach(function (el) {
        el.ontransitionend = function () {
            flag = true;
        }
    })
}