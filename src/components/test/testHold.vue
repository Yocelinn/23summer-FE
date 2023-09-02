<template>
    <div>
        <h1>JSON to Vue Component Example</h1>
        <div id="output">
            <!-- 渲染的 Vue 组件将在这里显示 -->
        </div>
    </div>
</template>

<script>

export default {
    mounted() {
// 示例 JSON 数据
        const jsonStyles = {"container":{"name":"新建页","width":1024,"height":768,"backgroundColor":"#FFFFFF","backgroundImage":"","backgroundSize":"auto","backgroundRepeat":"repeat"},"isStore":false,"blocks":[{"top":11,"left":182,"zIndex":1,"key":"icon-shoppingCart","name":"icon-shoppingCart5","alignCenter":false,"props":{},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":50,"height":54,"focus":false},{"top":22,"left":259,"zIndex":1,"key":"input","name":"input6","alignCenter":false,"props":{"placeholder":"搜索...","type":"text"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":480,"height":32,"focus":false,"hasResize":true},{"top":22,"left":700,"zIndex":1,"key":"button","name":"button7","alignCenter":false,"props":{"text":" 搜索"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":31,"height":32,"focus":false},{"top":79,"left":47,"zIndex":1,"key":"menu","name":"menu12","alignCenter":false,"props":{"defaultActive":"1"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":104,"height":220,"focus":false},{"top":263,"left":47,"zIndex":1,"key":"menu","name":"menu13","alignCenter":false,"props":{"value1":"导航索引4","defaultActive":"0","value2":"导航索引5","value3":"导航索引6"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":104,"height":220,"focus":false},{"top":92,"left":185,"zIndex":1,"key":"card","name":"card14","alignCenter":false,"props":{"text":"开屏广告","backgroundColor":"#FFFFFF","shadow":"always"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":571,"height":376,"focus":false,"hasResize":true},{"top":89,"left":785,"zIndex":1,"key":"card","name":"card15","alignCenter":false,"props":{"text":"用户信息"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":200,"height":200,"focus":false},{"top":309,"left":785,"zIndex":1,"key":"card","name":"card16","alignCenter":false,"props":{"text":"商品分类"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":200,"height":152,"focus":false,"hasResize":true},{"top":537,"left":37,"zIndex":1,"key":"card","name":"card17","alignCenter":false,"props":{"text":"推荐商品3"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":200,"height":200,"focus":false},{"top":537,"left":275,"zIndex":1,"key":"card","name":"card18","alignCenter":false,"props":{"text":"推荐商品3"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":200,"height":200,"focus":false},{"top":537,"left":531,"zIndex":1,"key":"card","name":"card19","alignCenter":false,"props":{"text":"推荐商品3"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":200,"height":200,"focus":false},{"top":537,"left":778,"zIndex":1,"key":"card","name":"card20","alignCenter":false,"props":{"text":"推荐商品4"},"model":{},"animate":{},"events":[{"key":"redirect","label":"跳转事件","param":""},{"key":"alert","label":"alert 事件","param":""}],"width":200,"height":200,"focus":false}]}


// 将 JSON 样式对象转换为 CSS 字符串
        function jsonToCss(styles, selector = '') {
            let cssString = '';
            for (const key in styles) {
                if (styles.hasOwnProperty(key)) {
                    if (typeof styles[key] === 'object') {
                        // 如果属性值是对象，则递归调用 jsonToCss 处理嵌套对象
                        const nestedSelector = selector ? `${selector} ${key}` : key;
                        cssString += jsonToCss(styles[key], nestedSelector);
                    } else {
                        // 否则，将属性和值添加到 CSS 字符串中
                        cssString += `${selector} ${key}: ${styles[key]};\n`;
                    }
                }
            }
            return cssString;
        }

// 使用示例
        const cssStyles = jsonToCss(jsonStyles);

// 输出生成的 CSS 样式字符串
        console.log(cssStyles);
    },
};
</script>
