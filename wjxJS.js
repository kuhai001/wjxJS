// ==UserScript==
// @name         问卷星测试——支持input radio checkbox
// @version      1.1
// @description  测试
// @author       蛋片鸡
// @match        https://www.wjx.top/*
// @match        https://www.wjx.cn/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==
 
 
/*
**info 第一个参数:对应的填入选项（字符串）
**info 第二个参数:匹配的标题（正则表达式）
**info 第三个参数:(可选)，当答题框为单选|多选时匹配的选项（正则表达式）
*/
 
(function() {
    'use strict';
    const info=[
        ["蛋片鸡",/(姓名)|(名字)/],
        ["18711111",/(学号)/],
        ["单选框_性别",/(性别)/,/(女)|(女生)/],
        ["单选框_年级",/(年级)/,/(18级)|(2018级)/],
        ["机自学院",/(学院)/],
        ["自动化三班",/(班级)/],
        ["计算机",/(专业)/],
        ["11011001100",/(联系方式)|(电话)|(手机)|(手机号)/],
        ["1000000000@qq.com",/(QQ)|(qq)/]
    ];
    const ini={
        module:".ui-field-contain",//每个问题模块
        title:".field-label",//标题
        type:{
            
           "input_text":".ui-input-text",
           "radio":".ui-controlgroup",
           "checkbox":".ui-controlgroup"
        }
    };
    $(document).ready(function(){
        let itemNum = 0;
        $(ini.module).each(function(){
            itemNum += 1;
            let title=$(this).find(ini.title).text();
            console.log("title: ", title);
            //判断类别
            for(let i=0;i<info.length;i++){//匹配用户信息
                if(info[i][1].test(title)){//匹配到一处信息,判断答题框类型,加break！
                   for(let tp in ini.type){
                       console.log("tp: ", tp);
                       let dom=$(this).find(ini.type[tp]);
                       if(dom.length>0){
                           switch(tp){
                               case "input_text":
                                   $("#q"+itemNum)[0].value = info[i][0]; //赋值
                                   break;
                               case "radio":
                               case "checkbox":
                                   $(this).find(".ui-radio").each(function(){
                                       if(info[i].length>=3&&info[i][2].test($(this).text())){
                                           $(this).find("a")[0].click();
                                       }
                                   });
                                   break;
                               default:console.log("ini.type中没有匹配"+tp+"的键值");
                           }
                           break;
                       }
                   }
                    break;
                }
            }
        });
    });
})();　