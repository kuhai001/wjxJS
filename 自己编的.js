/**
 * 目前可以实现自动刷新读取题库
 * 待实现功能
 * 1、题库map无变化时停止递归调用
 * 2、导出题库为json文件
 * 
 */

var time = 5;
let examinationQuestions = new Map();
var href = window.location.href;
let eqCount = 0;
// let d = {};
if (time > 0) {
    setTimeout(reload, 1000 * time)
}
function reload() {
    var fram = '<frameset col="*"><frame src="' + href + '"/></frameset>'

    with (document) {
        write(fram)
        void (close())
    }
    iframe = document.querySelector("frame");
    iframe.onload = function() {

        console.log('Iframe content has fully loaded.');
        // console.log(document.querySelector("frame").contentDocument.querySelectorAll(".field.ui-field-contain"));
        // 可以在这里执行需要在iframe加载完成后进行的操作
        Array.from(document.querySelector("frame").contentDocument.querySelectorAll(".field.ui-field-contain")).forEach(function(item) {

            // d.topic = item.getAttribute("topic");
            // d.title = item.textContent;
            examinationQuestions.set(item.getAttribute("topic"),item.textContent);
        });

    }
    // console.log(document.readyState);
    if (eqCount == 10) {
        return false
    }
    console.log(eqCount);
    eqCount++;
    setTimeout(reload, 1000 * time)
}
