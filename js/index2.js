(function () {
    var menu = document.getElementById("menu");
    var menuDL = document.getElementById("menuDL");
    var menuData = menu.getElementsByClassName("lll");
    for (var i = 0; i < dataList.length; i++) {
        var str1 = "";
        var str = "";
        var cur = dataList[i];
        str += "<li class='liLeft'>";
        str += "<a>";
        str += cur.title;
        str += "<img src='" + cur.img + "'/>";
        str += "</a>";
        str += "<div class='firstLeftDLData'>";
        for (var j = 0; j < cur.detail.length; j++) {
            var curDeta = cur.detail[j];
            str1 += "<dl>";
            str1 += "<dt>";
            str1 += curDeta.title;
            str1 += "</dt>";
            str1 += "<dd>";
            str1 += curDeta.detail;
            str1 += "</dd>";
            str1 += "</dl>";
            menuData.innerHTML += str1;
        }
        str += str1;
        str += "</div>";
        str += "</li>";
        menu.innerHTML += str;
    }
})();//虽然实现数据绑定，但是用的是动态创建，引发回流次数太多，应换成文档碎片的方式

(function(){
    var oDiv = document.getElementById("navBodyLeft");
    var oAs = oDiv.getElementsByTagName("a");
    var frg = document.createDocumentFragment();
    var aaa = document.createDocumentFragment();
    var oUl = document.createElement("ul");
    for (var i = 0; i < topLeftData.length; i++) {
        this.haha = i ;
        var cur = topLeftData[this.haha];
        var sss = document.createElement("a");
        sss.innerHTML = cur["title"];
        frg.appendChild(sss);
    }
    oDiv.appendChild(frg);
    frg = null;
})();//数据绑定部分

(function(){
    var navBodyLeft = document.getElementById("navBodyLeft");
    var navhan = document.getElementById("navhan") ;
    var itembox = navhan.getElementsByTagName("ul");
    var oAs = navBodyLeft.getElementsByTagName("a");
    for(var i = 1 ; i<oAs.length ; i++){
        oAs[i].i = i ;
        itembox.onmouseenter = oAs[i].onmouseenter = function(e){
            for(var j = 0 ; j<itembox.length ; j++){
                j+1===this.i?itembox[j].style.backgroundColor = "#eae4e4":itembox[j].style.backgroundColor = "#FFFFFF"
            }
        };

        oAs[i].onmouseleave = function(e){
            for(var j = 0 ; j<itembox.length ; j++){
                itembox[j].style.backgroundColor = "#ffffff";
            }
        };
    }

    navBodyLeft.onmouseenter = function(e){
        e = e||window.event ;
        var tar = e.target|| e.srcElement;
        if(tar.className==="navBodyLeft"){
            navhan.style.display = "block";
        }
    };

    navBodyLeft.onmouseleave = function(e){
        e = e||window.event ;
        var tar = e.target|| e.srcElement;
        if(tar.className==="navBodyLeft"){
            navhan.style.display = "none";
        }
    };
})();//利用事件委托实现导航左侧部分实现滑动，滑到下拉框部分时，背景没有选中

(function () {
    var menu = document.getElementById("menu");
    var firstDlData = menu.getElementsByClassName("firstLeftDLData");
    var liList = menu.getElementsByTagName("li");
    for (var i = 0; i < liList.length; i++) {
        liList[i].index = i;
        liList[i].onmouseover = function () {
            firstDlData[this.index].style.display = "block";
        };
        liList[i].onmouseout = function () {
            firstDlData[this.index].style.display = "none";
        };
    }
})();//Top部分左侧滑动显示数据部分

(function () {
    var ary = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg", "img/banner5.jpg", "img/banner6.jpg"];
    var autoTimer = null, step = 0, count = ary.length, interval = 2000;
    var inner = document.getElementById("inner"), banner = document.getElementById("banner"), imgList = inner.getElementsByTagName("img");
    var tip = document.getElementById("tip"), tipList = tip.getElementsByTagName("li");
    var btnLeft = document.getElementById("btnLeft"), btnRight = document.getElementById("btnRight");
    bindData();
    function bindData() {
        var str = "";
        for (var i = 0; i < ary.length; i++) {
            str += "<div><img src='' trueImg='" + ary[i] + "'/></div>";
        }
        str += "<div><img src='' trueImg='" + ary[0] + "'/></div>";
        inner.innerHTML = str;
        inner.style.width = (count + 1) * 1000 + "px";

        str = "";
        for (var i = 0; i < ary.length; i++) {
            str += "<li></li>";
        }
        tip.innerHTML = str;
        selectTip();
    }

    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    animate(curImg, {opacity: 1}, 200);
                }
            }(i)
        }
    }

    function selectTip() {
        var tempStep = step;
        tempStep >= tipList.length ? tempStep = 0 : null;
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = i === tempStep ? "bg" : null;
        }
    }

    tipMove();
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var curTip = tipList[i];
            curTip.index = i;
            curTip.onmouseenter = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(inner, {left: -step * 560}, 500, 3);
                selectTip();
                autoTimer = window.setInterval(autoMove, interval);
            }
        }
    }

    btnRight.onclick = function () {
        window.clearInterval(autoTimer);
        autoMove();
        autoTimer = window.setTimeout(autoMove, interval);
    };

    btnLeft.onclick = function () {
        window.clearInterval(autoTimer);
        step--;
        if (step < 0) {
            step = count - 1;
            inner.style.left = -count * 560 + "px";
        }
        animate(inner, {left: -step * 560}, 500, 3);
        selectTip();
        autoTimer = window.setInterval(autoMove, interval);

    };

    banner.addEventListener("mouseenter", function () {
        window.clearInterval(autoTimer);
        btnLeft.style.display = btnRight.style.display = "block";
    }, false);

    banner.addEventListener("mouseleave", function () {
        autoTimer = window.setInterval(autoMove, interval);
        btnLeft.style.display = btnRight.style.display = "none";
    }, false);

    function autoMove() {
        step++;
        if (step > count) {
            step = 1;
            inner.style.left = 0;
        }
        animate(inner, {left: -step * 560}, 500, 3);
        selectTip();
    }

    autoTimer = window.setInterval(autoMove, interval);

})();

(function () {
    var step = 0;
    var bottomPicture = document.getElementById("bottomPicture");
    var oDiv = bottomPicture.getElementsByTagName("div");
    var btnBottomLeft = document.getElementById("btnBottomLeft");
    var btnBottomRight = document.getElementById("btnBottomRight");

    btnBottomRight.addEventListener("click", function () {
        step++;
        if (step > 5) {
            bottomPicture.style.left = 0 + "px";
            step = 1;
        }
        animate(bottomPicture, {left: step * -186}, 500);
    }, false);

    btnBottomLeft.addEventListener("click", function () {
        step--;
        if (step < 0) {
            step = 4;
            bottomPicture.style.left = -930 + "px";
        }
        animate(bottomPicture, {left: -step * 186}, 500);
    }, false);

})();

(function(){
    var type1 = document.getElementById("type-list1");
    var type2 = document.getElementById("type-list2");
    var lione = document.getElementById("lione");
    var wili = document.getElementById("wili");
    var kecheng = document.getElementById("kecheng");
    var kecheng1 = document.getElementById("kecheng1");
    var shequn = document.getElementById("shequn");
    var wenda1 = document.getElementById("wenda1");
    var bottomInfoList = document.getElementById("bottomInfoList");
    var content = document.getElementById("content");
    var wiki3 = document.getElementById("wiki3");
    lione.onmouseenter = function(){
        bottomInfoList.style.display = "none";
        type1.style.display = "block";
        wiki3.style.display = "none";
    };

    type1.onmouseleave = function(){
        bottomInfoList.style.display = "block";
        type1.style.display = "none";
        wiki3.style.display = "block";
    };

    wili.onmouseenter = function(){
        bottomInfoList.style.display = "none";
        type1.style.display = "block";
        wenda1.style.display = "none";
    };

    kecheng.onmouseenter = function(){
        bottomInfoList.style.display = "none";
        type1.style.display = "block";
        kecheng1.style.display = "none";
    };
})();//主体第一部分右侧

(function(){
    var thirdNavTop = document.getElementById("thirdNavTop");
    var thirdNavOne = document.getElementById("thirdNavOne");
    var oUl = thirdNavOne.getElementsByTagName("ul");
    var oLi = thirdNavOne.getElementsByTagName("li");
    var oTli = thirdNavTop.getElementsByTagName("li") ;

    for(var i=0;i<oTli.length ; i++){
        var curLi = oTli[i] ;
        curLi.index = i ;
        oUl[0].style.display = "block";
        curLi.addEventListener("mouseenter",function(){
            for(var j = 0 ; j<oUl.length ; j++){
                j===this.index?oUl[this.index].style.display = "block":oUl[j].style.display ="none";
            }
        },false) ;
    }

    for(var i=0 ; i<oLi.length ; i++){
        var curLi2 = oLi[i] ;
        curLi2.addEventListener("mouseenter",function(){
            var oDiv = this.getElementsByTagName("div")[1];
            var oImg = this.getElementsByTagName("img")[0];
            var oDiv2 = this.getElementsByTagName("div")[2];
            var oP = this.getElementsByTagName("p")[0];
            animate(oP,{height:87},500);
            animate(oDiv2,{height:160},500);
            oP.style.display = "block" ;
            oDiv.style.display = "block" ;
            oImg.style.opacity = 0.3;
        },false);

        curLi2.addEventListener("mouseleave",function(){
            var oDiv = this.getElementsByTagName("div")[1];
            var oImg = this.getElementsByTagName("img")[0];
            var oDiv2 = this.getElementsByTagName("div")[2];
            var oP = this.getElementsByTagName("p")[0];
            animate(oP,{height:0},500);
            animate(oDiv2,{height:88},500);
            oP.style.display = "none" ;
            oDiv.style.display = "none" ;
            oImg.style.opacity = 1;

        },false);
    }
})();//处理热门推进部分

(function(){
    var fourBottom = document.getElementById("fourNavSelfBottom");
    var spans = fourBottom.getElementsByTagName("span");
    for(var i=0 ; i<spans.length ; i++){
        var curSpan = spans[i] ;
        curSpan.addEventListener("mouseenter",function(){
            this.style.borderColor = "#54bc66";
            var studyAll = this.getElementsByTagName("p");
            var study = studyAll[2];
            var studys = studyAll[3];
            study.style.display = "none" ;
            animate(studys,{opacity:1},500);
        },false) ;

        curSpan.addEventListener("mouseleave",function(){
            this.style.borderColor = "#eae4e4";
            var studyAll = this.getElementsByTagName("p");
            var study = studyAll[2];
            var studys = studyAll[3];
            animate(studys,{opacity:0},500,1,function(){
                study.style.display = "block" ;
            });
        },false) ;
    }
})();//职业路径图

(function(){
    var talk=document.getElementById("talk2");
    var quest=document.getElementById("quest2");

    quest.addEventListener("mouseenter",function(){
        animate(talk,{opacity:1,left:145,top:-5},400,1)
    },false)
    quest.addEventListener("mouseleave",function(){
        animate(talk,{opacity:0,left:140,top:1},400,1)
    },false)
    var fourthBody=document.getElementById("fourthBody");
    var divs=fourthBody.getElementsByTagName("div");
    for(var i=1;i<divs.length;i++){
        var oDiv=divs[i];
        oDiv.addEventListener("mouseenter",function(e){
            e=e||window.event;
            var span=this.getElementsByTagName("span");
            var spanA=span[0],spanB=span[1];

            animate(spanA,{width:0,left:80},300,1,function(){
                animate(spanB,{width:162,left:0},10,1,function(){

                })
            });
            e.stopPropagation();
        },false);
        oDiv.addEventListener("mouseleave",function(e){
            e=e||window.event;
            var span=this.getElementsByTagName("span");
            var spanA=span[0],spanB=span[1];

            animate(spanB, {width: 0, left: 80}, 20, 1, function () {
                animate(spanA, {width: 132, left: 0}, 300, 1)
            })
        },false)
    }
})();//知识体系图

(function(){
    var fifthBody=document.getElementById("fifthBody");
    var imgs=fifthBody.getElementsByTagName("img");
    var Oi=fifthBody.getElementsByTagName("i");
    var divs=fifthBody.getElementsByTagName("div");
    var ps=fifthBody.getElementsByTagName("p");
    var lis=fifthBody.getElementsByTagName("li");

    for(var i=0;i<lis.length;i++){
        var Oli=lis[i];
        Oli.addEventListener("mouseenter",function(){
            this.style.color="#54bc66"
        },false)
        Oli.addEventListener("mouseleave",function(){
            this.style.color="gray"
        },false)

    }

    for(var i=0;i<ps.length;i++){
        ps[i].addEventListener("mouseenter",function(){
            this.style.color="#54bc66"
        },false)
        //ps[i].i=i;
        ps[i].addEventListener("mouseleave",function(){

            this.style.color="black"

        },false)
    }

    for(var i=0;i<divs.length;i++){
        divs[i].addEventListener("mouseenter",function(){
            this.style.borderColor="#54bc66"
        },false)
        divs[i].addEventListener("mouseleave",function(){
            this.style.borderColor="white"
        },false)
    }


    for(var i=0;i<imgs.length;i++){
        var oImg=imgs[i];
        oImg.i=i;
        oImg.addEventListener("mouseenter",function(){
            Oi[this.i].style.display="block";
            animate(this,{width:133},500,1)


        },false);
        oImg.addEventListener("mouseleave",function(){
            Oi[this.i].style.display="none";
            animate(this,{width:142},500,1)
            fifthBody.style.borderColor="white"
        },false)
    }

})();//翻页

(function(){
    var hg=document.documentElement.clientHeight||document.body.clientHeight;

    var top=document.getElementById("top1");

    window.onscroll = function () {
        var curT = goback("scrollTop");//当前滚动条卷去的高度
        var cliH = goback("clientHeight");//当前页面一屏幕的高度
        top.style.display = curT >= cliH ? "block" : "none";
    };

    top.onclick=function(){
        //document.documentElement.scrollTop||document.body.scrollTop=10

        var allTime=1000;
        var every=10;
        //var toplang=goback("scrollTop")-0;
        var toplang = goback("scrollTop") - 0;
        var step=(toplang/allTime)*every;
        var timer=window.setInterval(function(){
            var curT=goback("scrollTop");
            if(curT<=0){
                window.clearInterval(timer);
                return
            }else{
                goback("scrollTop",curT-step)
            }
        },every);
    };

    function goback(attr,value){
        if(typeof value==="undefined"){
            return document.documentElement[attr]||document.body[attr];
        }else {
            document.documentElement[attr] = value;
            document.body[attr] = value;
        }
    }
})()//回到顶部


