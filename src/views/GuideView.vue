<template>
    <!DOCTYPE html>
<html>
<head>
<title>用户手册.md</title>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8">



</head>
<body>

<h2 id="%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C">用户手册</h2>
<h4 id="1%E6%B3%A8%E5%86%8C">1、首页展示</h4>
<p>点击开始使用进入登录或注册页面</p>
<p><strong><img src="@/assets/Guide1.png" style="width:600px" alt="image-20230903060527913"></strong></p>
<p>注册时输入邮箱后点击发送验证码即可发送验证码</p>
<p>输入正确的验证码即可注册成功</p>
<h4 id="2%E7%99%BB%E5%BD%95">2、登录</h4>
<p>在登录页面输入邮箱和密码即可登录，登录后跳转至主界面</p>
<p><img src="@/assets/Guide2.png" style="width:600px" alt="image-20230903060706693"></p>
<h4 id="3%E4%BF%AE%E6%94%B9%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF">3、修改个人信息</h4>
<p>在页面右上方的个人信息界面可以修改个人信息</p>
<p>可以更改昵称，描述和密码</p>
<p>更改密码时需要输入原密码</p>
<h4 id="4%E5%88%9B%E5%BB%BA%E5%9B%A2%E9%98%9F">4、创建团队</h4>
<p>点击右侧创建团队按钮可创建团队</p>
<p></p>
<p>输入团队名称可创建成功</p>
<p>左侧将生成团队队员管理界面</p>
<p></p>
<h4 id="5%E5%88%87%E6%8D%A2%E5%9B%A2%E9%98%9F">5、切换团队</h4>
<p>在左侧选择团队栏中可以选择自己加入的团队进行切换</p>
<h4 id="6%E6%B7%BB%E5%8A%A0%E9%98%9F%E5%91%98">6、添加队员</h4>
<p>在左侧栏的右上方点击邀请队员按钮</p>
<p></p>
<p>输入正确的用户邮箱可将队员邀请进入团队，记得选择用户权限</p>
<p>图为邀请成功后的队员界面</p>
<h4 id="7%E5%88%A0%E9%99%A4%E9%98%9F%E5%91%98">7、删除队员</h4>
<p>管理员和创建者可以删除非管理员队员，点击队员信息右侧删除队员按钮即可</p>
<h4 id="8%E4%BF%AE%E6%94%B9%E9%98%9F%E5%91%98%E6%9D%83%E9%99%90">8、修改队员权限</h4>
<p>创建者点击队员权限身份的图标即可做到身份切换</p>
<h4 id="9%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE">9、新建项目</h4>
<p>点击返回主页按钮返回主页，在主页选择团队后点击新建项目按钮</p>
<p>输入项目名称和项目描述点击确认按钮即可新建项目</p>
<p>随后页面会自动跳转至项目页面</p>
<h4 id="10%E5%88%A0%E9%99%A4%E9%A1%B9%E7%9B%AE">10、删除项目</h4>
<p>点击返回项目即可返回至项目列表页</p>
<p>再点击下方返回主页即可返回主页</p>
<p>在主页可以看到团队新建的项目，右侧有删除项目按钮，点击即可删除</p>
<h4 id="11%E5%9B%9E%E6%94%B6%E7%AB%99%E6%81%A2%E5%A4%8D%E9%A1%B9%E7%9B%AE">11、回收站恢复项目</h4>
<p>点击上方团队项目右侧的垃圾桶图标可以进入项目回收站，回收站自动保存一天的删除项目，点击下方</p>

</body>
</html>

</template>

<style scoped>
/* https://github.com/microsoft/vscode/blob/master/extensions/markdown-language-features/media/markdown.css */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

body {
	font-family: var(--vscode-markdown-font-family, -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif);
	font-size: var(--vscode-markdown-font-size, 14px);
	padding: 0 26px;
	line-height: var(--vscode-markdown-line-height, 22px);
	word-wrap: break-word;
}

#code-csp-warning {
	position: fixed;
	top: 0;
	right: 0;
	color: white;
	margin: 16px;
	text-align: center;
	font-size: 12px;
	font-family: sans-serif;
	background-color:#444444;
	cursor: pointer;
	padding: 6px;
	box-shadow: 1px 1px 1px rgba(0,0,0,.25);
}

#code-csp-warning:hover {
	text-decoration: none;
	background-color:#007acc;
	box-shadow: 2px 2px 2px rgba(0,0,0,.25);
}

body.scrollBeyondLastLine {
	margin-bottom: calc(100vh - 22px);
}

body.showEditorSelection .code-line {
	position: relative;
}

body.showEditorSelection .code-active-line:before,
body.showEditorSelection .code-line:hover:before {
	content: "";
	display: block;
	position: absolute;
	top: 0;
	left: -12px;
	height: 100%;
}

body.showEditorSelection li.code-active-line:before,
body.showEditorSelection li.code-line:hover:before {
	left: -30px;
}

.vscode-light.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(0, 0, 0, 0.15);
}

.vscode-light.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(0, 0, 0, 0.40);
}

.vscode-light.showEditorSelection .code-line .code-line:hover:before {
	border-left: none;
}

.vscode-dark.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(255, 255, 255, 0.4);
}

.vscode-dark.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(255, 255, 255, 0.60);
}

.vscode-dark.showEditorSelection .code-line .code-line:hover:before {
	border-left: none;
}

.vscode-high-contrast.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(255, 160, 0, 0.7);
}

.vscode-high-contrast.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(255, 160, 0, 1);
}

.vscode-high-contrast.showEditorSelection .code-line .code-line:hover:before {
	border-left: none;
}

img {
	max-width: 100%;
	max-height: 100%;
}

a {
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

a:focus,
input:focus,
select:focus,
textarea:focus {
	outline: 1px solid -webkit-focus-ring-color;
	outline-offset: -1px;
}

hr {
	border: 0;
	height: 2px;
	border-bottom: 2px solid;
}

h1 {
	padding-bottom: 0.3em;
	line-height: 1.2;
	border-bottom-width: 1px;
	border-bottom-style: solid;
}

h1, h2, h3 {
	font-weight: normal;
}

table {
	border-collapse: collapse;
}

table > thead > tr > th {
	text-align: left;
	border-bottom: 1px solid;
}

table > thead > tr > th,
table > thead > tr > td,
table > tbody > tr > th,
table > tbody > tr > td {
	padding: 5px 10px;
}

table > tbody > tr + tr > td {
	border-top: 1px solid;
}

blockquote {
	margin: 0 7px 0 5px;
	padding: 0 16px 0 10px;
	border-left-width: 5px;
	border-left-style: solid;
}

code {
	font-family: Menlo, Monaco, Consolas, "Droid Sans Mono", "Courier New", monospace, "Droid Sans Fallback";
	font-size: 1em;
	line-height: 1.357em;
}

body.wordWrap pre {
	white-space: pre-wrap;
}

pre:not(.hljs),
pre.hljs code > div {
	padding: 16px;
	border-radius: 3px;
	overflow: auto;
}

pre code {
	color: var(--vscode-editor-foreground);
	tab-size: 4;
}

/** Theming */

.vscode-light pre {
	background-color: rgba(220, 220, 220, 0.4);
}

.vscode-dark pre {
	background-color: rgba(10, 10, 10, 0.4);
}

.vscode-high-contrast pre {
	background-color: rgb(0, 0, 0);
}

.vscode-high-contrast h1 {
	border-color: rgb(0, 0, 0);
}

.vscode-light table > thead > tr > th {
	border-color: rgba(0, 0, 0, 0.69);
}

.vscode-dark table > thead > tr > th {
	border-color: rgba(255, 255, 255, 0.69);
}

.vscode-light h1,
.vscode-light hr,
.vscode-light table > tbody > tr + tr > td {
	border-color: rgba(0, 0, 0, 0.18);
}

.vscode-dark h1,
.vscode-dark hr,
.vscode-dark table > tbody > tr + tr > td {
	border-color: rgba(255, 255, 255, 0.18);
}

</style>

<style>
/* Tomorrow Theme */
/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */
/* Original theme - https://github.com/chriskempson/tomorrow-theme */

/* Tomorrow Comment */
.hljs-comment,
.hljs-quote {
	color: #8e908c;
}

/* Tomorrow Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
	color: #c82829;
}

/* Tomorrow Orange */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
	color: #f5871f;
}

/* Tomorrow Yellow */
.hljs-attribute {
	color: #eab700;
}

/* Tomorrow Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
	color: #718c00;
}

/* Tomorrow Blue */
.hljs-title,
.hljs-section {
	color: #4271ae;
}

/* Tomorrow Purple */
.hljs-keyword,
.hljs-selector-tag {
	color: #8959a8;
}

.hljs {
	display: block;
	overflow-x: auto;
	color: #4d4d4c;
	padding: 0.5em;
}

.hljs-emphasis {
	font-style: italic;
}

.hljs-strong {
	font-weight: bold;
}

/*
 * Markdown PDF CSS
 */

 body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif, "Meiryo";
	padding: 0 12px;
}

pre {
	background-color: #f8f8f8;
	border: 1px solid #cccccc;
	border-radius: 3px;
	overflow-x: auto;
	white-space: pre-wrap;
	overflow-wrap: break-word;
}

pre:not(.hljs) {
	padding: 23px;
	line-height: 19px;
}

blockquote {
	background: rgba(127, 127, 127, 0.1);
	border-color: rgba(0, 122, 204, 0.5);
}

.emoji {
	height: 1.4em;
}

code {
	font-size: 14px;
	line-height: 19px;
}

/* for inline code */
:not(pre):not(.hljs) > code {
	color: #C9AE75; /* Change the old color so it seems less like an error */
	font-size: inherit;
}

/* Page Break : use <div class="page"/> to insert page break
-------------------------------------------------------- */
.page {
	page-break-after: always;
}

</style>
