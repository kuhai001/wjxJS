/**
 * 目前可以实现自动刷新读取题库
 * 待实现功能
 * 1、题库map无变化时停止递归调用(已实现，待测试)
 * 2、导出题库为json文件
 * 
 */
var time = 5;
let examinationQuestions = new Map();
var href = window.location.href;
let eqCount = 0;
let eqSize = 0;
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
    iframe.onload = function () {
        console.log('Iframe content has fully loaded.');
        // frame加载完成查找所有考题元素，并遍历填入map。
        Array.from(document.querySelector("frame").contentDocument.querySelectorAll(".field.ui-field-contain")).forEach(function (item) {
            examinationQuestions.set(Number(item.getAttribute("topic")), item.textContent);
        });
        //连续三次题库map的size没有变化则退出调用
        if (eqCount == 3) {
            return false
        }
        if (eqSize == examinationQuestions.size) {
            console.log(eqCount);
            eqCount++;
        }
        eqSize = examinationQuestions.size
        setTimeout(reload, 1000 * time)
    }
}

get __proto__() {
    // Let O be ? ToObject(this value).
    if(this === void(0) || this === null) {
        throw TypeError(`Cannot read property '__proto__' of ${this}`);
    }
    let O = Object(this);  // this !== null 或 undefined 时, Return ! ToObject(value);
    // Return ? O.[[GetPrototypeOf]]().
    return Object.getPrototypeOf(O);
}