/**
 * 实现自动刷新读取题库，包括题干，题目类型，选项。单选、多选、判断，按选择题处理，填空题（尚未开发）
 *  * 待实现功能
 * 1、题库map无变化时停止递归调用(已实现，待测试)
 * 2、导出题库为json文件
 * 
 */


var time = 5;// 间隔时间秒数
let examinationQuestions = new Map();
var href = window.location.href//当前问卷网址
let eqCount = 0;
let eqSize = 0;
let jsonObject;
let jsonString;

// let d = {};
if (time > 0) {
    setTimeout(reload, 1000 * time)
}
jsonObject = Object.fromEntries(examinationQuestions);
jsonString = JSON.stringify(jsonObject);
console.log(jsonString);
// 定义一个reload函数
function reload() {
    // 定义一个fram变量，用于存储frame的html代码
    var fram = '<frameset col="*"><frame src="' + href + '"/></frameset>'
    // 使用with语句，将document对象作为上下文
    with (document) {
        // 将fram写入document中
        write(fram)
        // 关闭document
        void (close())
    }
    // 获取frame元素
    iframe = document.querySelector("frame");
    // 监听frame的onload事件
    iframe.onload = function () {
        // 打印提示信息
        console.log('Iframe content has fully loaded.');
        // frame加载完成查找所有考题元素，并遍历填入map。
        // 使用Array.from方法将所有考题元素转换为数组，并遍历每个元素
        Array.from(document.querySelector("frame").contentDocument.querySelectorAll(".field.ui-field-contain")).forEach(function (item) {
            // 将每个元素的topic属性值转换为数字，并将元素文本内容填入map中
            examinationQuestions.set(Number(item.getAttribute("topic")), item.textContent);
        });
        //连续三次题库map的size没有变化则退出调用
        // 如果eqCount等于3，则退出调用
        if (eqCount == 6) {
            return false
        }
        // 如果eqSize等于examinationQuestions的size，则打印eqCount
        if (eqSize == examinationQuestions.size) {
            console.log(eqCount);
            // 将eqCount加1
            eqCount++;
        }
        // 将eqSize赋值为examinationQuestions的size
        eqSize = examinationQuestions.size
        // 使用setTimeout函数，每隔time秒调用一次reload函数
        setTimeout(reload, 1000 * time)
    }
}
