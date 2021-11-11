function createBannerArea(areaDom, options) {
    if (!options || options.length === 0) {
        return;
    }
    //1. 定义变量
    var imgArea = document.createElement("div"); //装图片的div
    var numberArea = document.createElement("div"); //装角标的div
    var curIndex = 0; //当前显示的索引
    var autoTimer = null; //自动变化计时器
    var autoRate = 3000; //自动变化间隔
    //2. 初始化：
    //2.1 初始化areaDom
    areaDom.innerHTML = "";
    areaDom.appendChild(imgArea);
    areaDom.appendChild(numberArea);
    //2.2 初始化图片区域
    createImgArea();
    //2.3 初始化角标区域
    createNumberArea();
    //2.4 设置显示状态
    show(0);
    //3. 自动变化
    autoChange();
    areaDom.addEventListener("mouseenter", function () {
        clearInterval(autoTimer);
        autoTimer = null;
    })

    areaDom.addEventListener("mouseleave", function () {
        autoChange();
    })


    //创建图片区域
    function createImgArea() {
        imgArea.style.width = "100%";
        imgArea.style.height = "100%";
        imgArea.style.display = "flex";
        imgArea.style.overflow = "hidden";
        for (let item of options) {
            var img = document.createElement("img");
            img.src = item;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.display = "block";
            img.style.marginLeft = "0%";
            img.style.cursor = "pointer";
            imgArea.appendChild(img);
        }
    }

    //创建数字区域
    function createNumberArea() {
        numberArea.style.textAlign = "center";
        numberArea.style.marginTop = "-30px";
        for (var i = 0; i < options.length; i++) {
            var span = document.createElement("span")
            span.style.display = "inline-block";
            span.style.width = "12px"
            span.style.height = "12px"
            span.style.background = "lightgray"
            span.style.cursor = "pointer";
            span.style.borderRadius = "50%";
            span.style.margin = "0 5px";
            (function (index) {
                span.addEventListener("click", function () {
                    show(index);
                })
            })(i)
            numberArea.appendChild(span);
        }
    }

    //根据指定的索引，设置显示状态
    function show(newIndex) {
        curIndex = newIndex;
        for (var i = 0; i < numberArea.children.length; i++) {
            var num = numberArea.children[i];
            var imgEle = imgArea.children[i];
            if (i == curIndex) {
                num.style.background = "#be926f";
                imgEle.style.display = "block";
            } else {
                num.style.background = "lightgrey";
                imgEle.style.display = "none";
            }
        }

    }
    //自动播放函数
    function autoChange() {
        if (autoTimer) {
            return;
        }
        autoTimer = setInterval(function () {
            if (curIndex === options.length - 1) {
                show(0);
            } else {
                show(curIndex + 1);
            }
        }, autoRate)
    }
}