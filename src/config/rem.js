/**
 * @Author: 'LanYue'
 * @Time: 2021/12/01/15:56
 */
// 基准大小
const baseSize = 16
// let clientWidth = document.documentElement.clientWidth
// 设置 rem 函数
function setRem() {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    if(getSystem()){
        //alert(screen.availWidth)

        //const scale = document.documentElement.clientWidth / screen.availWidth
        const scale = document.documentElement.clientWidth / 1920
        // 设置页面根节点字体大小
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    }else {
        const scale = document.documentElement.clientWidth / 1500
        //document.documentElement.style.fontSize = '14px'
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    }
}
function getSystem() {
    let agent = navigator.userAgent.toLowerCase();
    let isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if(isMac) {
        return false;
    }
    //现只针对windows处理，其它系统暂无该情况，如有，继续在此添加
    if (agent.indexOf("windows") >= 0) {
        return true;
    }
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
    setRem()
}
