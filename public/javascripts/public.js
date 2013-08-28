$(document).ready(function () {
    //處理分頁
    if (isIE6() || isIE7()) {
        $("#page").css("position", "absolute");
    }

    $("#next_page").hide();

    $(".post_list1").click(function(){
        xh();
        
        //$(this).removeClass("post_list1");
    });

    //改变图标颜色
    ChangeBrowser();

    //字体高亮
    prettyPrint();

    //首页文章下一頁
    $("#next_p").click(function () {
        var page = $("#Hid_Page").val();

        //加載初始
        $.post(
            "/nextp",
            { "id": page },
            function (dats, status) {
                if (status = "success") {
                    var list = "";

                    $.each(dats, function(i, item){
                        list += "<div class='post_list'>"
                        + "<div class='post_title'>"
                        + "<a href='/detail/"+item.id+"' target='_blank' class='detail_a'>"+item.title+"</a></div>"
                        + "<div class='post_content'>"+item.content+"</div>"
                        + "<div class='post_info'>"+item.date+"&nbsp;&nbsp;"
                        + "<a href='/tag/"+item.tag +"' target='_blank'>"
                        + item.tag + "</a>&nbsp;&nbsp;"
                        + "&nbsp&nbsp"+item.access
                        + "&nbsp&nbsp<a href='/about' target='_blank' class='auth_a'>"+item.name+"</a>"
                        + "&nbsp&nbsp<a href='/tag' target='_blank' class='auth_a'>Tags</a>"
                        + "&nbsp;&nbsp;订阅：<a href='/feed' style='text-decoration:none;' target='_blank'>"
                        + "<span aria-hidden='true' title='订阅' style='color:#009933; cursor:pointer;' class='icon-feed'></span></a>"
                        + "</div></div>";
                    });

                    var html = list;

                    $("#Hid_Page").val(Number(page) + 1);

                    $("#next_page").before(html);

                    prettyPrint();
                }
            }
        );
    });

    //Tag文章下一頁
    $("#next_t").click(function () {
        var page = $("#Hid_Page").val();

        var url = location.href;            //获取url

        var ind = url.lastIndexOf("/");     //获取最后一个/的位置

        var key = url.substr(ind+1, url.length-ind-1);

        //加載初始
        $.post(
            "/nextt",
            { "id": page, "key": key },
            function (dats, status) {
                if (status = "success") {
                    var list = "";

                    $.each(dats, function(i, item){
                        list += "<div class='post_list'>"
                        + "<div class='post_title'>"
                        + "<a href='/detail/"+item.id+"' target='_blank' class='detail_a'>"+item.title+"</a></div>"
                        + "<div class='post_content'>"+item.content+"</div>"
                        + "<div class='post_info'>"+item.date+"&nbsp;&nbsp;"+ item.tag + "&nbsp&nbsp"+item.access
                        + "&nbsp&nbsp<a href='/about' target='_blank' class='auth_a'>"+item.name+"</a>"
                        + "&nbsp&nbsp<a href='/tag' target='_blank' class='auth_a'>Tags</a>"
                        + "&nbsp;&nbsp;订阅：<a href='/feed' style='text-decoration:none;' target='_blank'>"
                        + "<span aria-hidden='true' title='订阅' style='color:#009933; cursor:pointer;' class='icon-feed'></span></a>"
                        + "</div></div>";
                    });

                    var html = list;

                    $("#Hid_Page").val(Number(page) + 5);

                    $("#next_page").before(html);

                    prettyPrint();
                }
            }
        );
    });

    //Tag文章下一頁
    $("#next_c").click(function () {
        var page = $("#Hid_Page").val();
        var title = $("#Hid_Title").val();

        //加載初始
        $.post(
            "/nextc",
            { "ind": page, "title": title },
            function (dats, status) {
                if (status = "success") {
                    var list = "";

                    $.each(dats, function(i, item){
                        list += "<div class='reply_list'>" 
                            + "<table width='580' height='auto' border='0' align='center'>" 
                            + "<tr>" 
                            + "<td style='width:72px;' rowspan='2' align='center' valign='top'>" 
                            + "<img src='/images/head.jpg' width='50' height='50' alt='"+item.name+"' title='"+item.name+"' />" 
                            + "</td>" 
                            + "<td align='left' style='width:498px; font-size:11px; color:#555;'>" 
                            + ""+item.name+"&nbsp;&nbsp;"+item.date+"&nbsp;&nbsp;&nbsp;&nbsp;#"+i+"" 
                            + "</td>" 
                            + "</tr>" 
                            + "<tr>" 
                            + "<td align='left'>" 
                            + "<div style='width:100%; font-size:12px; color:#555; height:auto; word-wrap:break-word; word-break:break-all;'>" 
                            + ""+item.content+"" 
                            + "</div>" 
                            + "</td>" 
                            + "</tr>" 
                            + "</table>" 
                            + "</div>";
                    });

                    var html = list;

                    $("#Hid_Page").val(Number(page) + 15);

                    $("#next_page").before(html);
                }
            }
        );
    });

    //评论提交
    $("#Comment").submit(function(){
        var content = $("#Txt_Content").val();
        var user = $("#Txt_Name").val();

        //判断
        if(content.length == 0){
            $("#Txt_Content").val("请输入评论内容").css("color", "red");

            return false;
        }else if(user.length == 0){
            $("#Txt_Name").val("请输入您的名称").css("color", "red");

            return false;
        }else{
            $("#Comment").submit();
        }
    })

    //添加评论
    $("#Btn_Post").mouseover(function () {
        $(this).css("background", "#DFDFDF");
    }).mouseout(function () {
        $(this).css("background", "#e6e6e6");
    });


    //返回顶部的js方法
    $("#foots").hover(function () {
        $(this).html("").html("顶部").css({ "border": "1px dashed #CCC", "border-radius": "3px" });
    }, function () {
        $(this).html("").html("<img src='../images/up_48.png' width='48px' height='48px' />").css("border", "0px");
    }).click(function () {
        //跳转到锚记
        window.location.href = "#top";
    });

    //评论
    $("#SpanPost").click(function () {
        //得到層的狀態
        var vis1 = $("#Div_Reply").css("display");

        //判斷
        if (vis1 == "block") {
            $("#Div_Reply").css("display", "none");
        } else if (vis1 == "none") {
            $("#Div_Reply").css("display", "block");
        }
    });

});

window.n = 30;
window.t;
function xh(){

    if(n>=0){
        var du = "rotate("+this.n+"deg)";

        $(".post_list1").css("transform", du)
               .css("-ms-transform", du)
               .css("-webkit-transform", du)
               .css("-o-transform", du)
               .css("-moz-transform", du);

        n--;

        t = setTimeout("xh()", 100);
    }else{
        //$(".post_list1").removeClass("post_list1");
        $("#next_page").animate({ opacity: 'show' }, 1000 );
        clearTimeout(t);
    }
}


function ChangeBrowser() {
    var browserName = navigator.userAgent.toLowerCase();
    if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
        $(".icon-IE").css("color", "red");
        return;
    } else if (/firefox/i.test(browserName)) {
        $(".icon-firefox").css("color", "red");
        return;
    } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
        $(".icon-chrome").css("color", "red");
        return;
    } else if (/opera/i.test(browserName)) {
        $(".icon-opera").css("color", "red");
        return;
    } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
        $(".icon-safari").css("color", "red");
        return;
    } else {
        return;
    }
}

/*判斷各個瀏覽器*/
function isIE6() {
    try {
        return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 6.0") == "-1" ? false : true;
    } catch (ex) {
        return false;
    }
}
function isIE7() {
    try {
        return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 7.0") == "-1" ? false : true;
    } catch (ex) {
        return false;
    }
}


//監控鍵盤
$(document).keypress(function (e) {
    //判断
    if (e.which == 113) {
        //得到層的狀態
        var vis1 = $("#Div_Reply").css("display");

        //判斷
        if (vis1 == "block") {
            $("#Div_Reply").css("display", "none");
        } else if (vis1 == "none") {
            $("#Div_Reply").css("display", "block");
        }
    }
});

//运行代码
function RunCode(op) {
    var win = window.open('', "_blank", '');
    win.document.open('text/html', 'replace');
    win.opener = null
    alert($(op).val());
    win.document.write($(op).val());
    win.document.close();
} 