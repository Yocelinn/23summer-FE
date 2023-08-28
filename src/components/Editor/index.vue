<template>
    <el-upload :action="uploadUrl" :before-upload="handleBeforeUpload" :on-success="handleUploadSuccess" name="richTextFile"
        :on-error="handleUploadError" :show-file-list="false" class="editor-img-uploader" accept=".jpeg,.jpg,.png">
        <i ref="uploadRef" class="Plus editor-img-uploader"></i>
    </el-upload>
    <div class="editor">
        <QuillEditor id="editorId" ref="myQuillEditor" v-model:content="editorContent" contentType="html"
            @update:content="onContentChange" :options="options" />
        <!-- <QuillEditor theme="snow" :content="props.content" contentType="html"/> -->
    </div>
</template>
   
<script setup>
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { getCurrentInstance, reactive, ref, toRaw, computed, onMounted, watch, defineExpose } from "vue";
// 引入插入图片标签自定义的类
import './quill'

// 注册图片拖拽和大小修改插件(不起效果暂时屏蔽)
// import { ImageDrop } from 'quill-image-drop-module';
// import {ImageResize} from 'quill-image-resize-module';

// Quill.register('modules/ImageDrop', ImageDrop);
// Quill.register('modules/imageResize', ImageResize);

const { proxy } = getCurrentInstance();
const emit = defineEmits(['updateContent', 'getFileId', 'handleRichTextContentChange'])
const props = defineProps({
    /* 编辑器的内容 */
    content: {
        type: String,
        default: '',
    },
    /* 只读 */
    readOnly: {
        type: Boolean,
        default: false,
    },
    // 上传文件大小限制(MB)
    fileSize: {
        type: Number,
        default: 10,
    },
})

defineExpose({
    changeContent: (newValue) => {
        if (myQuillEditor.value)
            myQuillEditor.value.setHTML(newValue);
    }
})

const editContent = ref(props.content);

const myQuillEditor = ref(null)
watch(props.content, (newVal, oldVal) => {
    console.log('监听引用类型数据dataList')
    console.log('new', newVal)
    console.log('old', oldVal)
})



const editorContent = computed({
    get: () => {
        // console.log(props.content,myQuillEditor);

        return props.content;
    },
    set: (val) => {
        //   emit('update:content', val)
        console.log(val)
    }
});
const uploadUrl = ref('/sysFiles/upload') // 上传的图片服务器地址
//   const uploadUrl = ref(import.meta.env.VITE_BASEURL + '/sysFiles/upload') // 上传的图片服务器地址
const oldContent = ref('')

const options = reactive({
    theme: 'snow',
    debug: 'warn',
    modules: {
        // 工具栏配置
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                ['blockquote', 'code-block'], // 引用  代码块
                [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                [{ indent: '-1' }, { indent: '+1' }], // 缩进
                [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                [{ align: [] }], // 对齐方式
                ['clean'], // 清除文本格式
                ['link', 'image'], // 链接、图片、视频
            ],
            handlers: {
                // 重写图片上传事件
                image: function (value) {
                    if (value) {
                        //调用图片上传
                        proxy.$refs.uploadRef.click()
                    } else {
                        Quill.format("image", true);
                    }
                },
            },
            // ImageDrop: true,//支持图片拖拽
            // imageResize: { //支持图片大小尺寸修改
            //   displayStyles: {
            //     backgroundColor: 'black',
            //     border: 'none',
            //     color: 'white'
            //   },
            //   modules: ['Resize', 'DisplaySize','Toolbar']
            // }
        }
    },
    placeholder: '请输入公告内容...',
    readOnly: props.readOnly,
    clipboard: {
        matchers: [
            ['img', (node, delta) => {
                const src = node.getAttribute('src');
                const id = node.getAttribute('id');
                delta.insert({ image: { src, 'id': id } });
            }],
        ],
    },
})

// toolbar标题（此项是用来增加hover标题）
const titleConfig = ref([
    { Choice: '.ql-insertMetric', title: '跳转配置' },
    { Choice: '.ql-bold', title: '加粗' },
    { Choice: '.ql-italic', title: '斜体' },
    { Choice: '.ql-underline', title: '下划线' },
    { Choice: '.ql-header', title: '段落格式' },
    { Choice: '.ql-strike', title: '删除线' },
    { Choice: '.ql-blockquote', title: '块引用' },
    { Choice: '.ql-code', title: '插入代码' },
    { Choice: '.ql-code-block', title: '插入代码段' },
    { Choice: '.ql-font', title: '字体' },
    { Choice: '.ql-size', title: '字体大小' },
    { Choice: '.ql-list[value="ordered"]', title: '编号列表' },
    { Choice: '.ql-list[value="bullet"]', title: '项目列表' },
    { Choice: '.ql-direction', title: '文本方向' },
    { Choice: '.ql-header[value="1"]', title: 'h1' },
    { Choice: '.ql-header[value="2"]', title: 'h2' },
    { Choice: '.ql-align', title: '对齐方式' },
    { Choice: '.ql-color', title: '字体颜色' },
    { Choice: '.ql-background', title: '背景颜色' },
    { Choice: '.ql-image', title: '图像' },
    { Choice: '.ql-video', title: '视频' },
    { Choice: '.ql-link', title: '添加链接' },
    { Choice: '.ql-formula', title: '插入公式' },
    { Choice: '.ql-clean', title: '清除字体格式' },
    { Choice: '.ql-script[value="sub"]', title: '下标' },
    { Choice: '.ql-script[value="super"]', title: '上标' },
    { Choice: '.ql-indent[value="-1"]', title: '向左缩进' },
    { Choice: '.ql-indent[value="+1"]', title: '向右缩进' },
    { Choice: '.ql-header .ql-picker-label', title: '标题大小' },
    { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一' },
    { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二' },
    { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三' },
    { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四' },
    { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五' },
    { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六' },
    { Choice: '.ql-header .ql-picker-item:last-child', title: '标准' },
    { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号' },
    { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号' },
    { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号' },
    { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
    { Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
    { Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐' },
    { Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐' },
    { Choice: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐' }
])


// 上传前校检格式和大小
function handleBeforeUpload(file) {
    const type = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
    const isJPG = type.includes(file.type);
    //检验文件格式
    if (!isJPG) {
        ElMessage.error(`图片格式错误！只能上传jpeg/jpg/png格式`)
        return false
    }
    // 校检文件大小
    if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize
        if (!isLt) {
            ElMessage.error(`上传文件大小不能超过 ${props.fileSize} MB!`)
            return false
        }
    }
    return true
}

// 监听富文本内容变化，删除被服务器中被用户回车删除的图片
function onContentChange(content) {
    console.log(content)
    emit('updateContent', content)
    emit('handleRichTextContentChange', content)
}


// 上传成功处理
function handleUploadSuccess(res, file) {
    // 如果上传成功
    if (res.status == 200) {
        let rawMyQuillEditor = toRaw(myQuillEditor.value)
        // 获取富文本实例
        let quill = rawMyQuillEditor.getQuill();
        // 获取光标位置
        let length = quill.selection.savedRange.index;
        // 插入图片，res为服务器返回的图片链接地址
        const imageUrl = import.meta.env.VITE_BASE_FILE_PREFIX + res.body[0].lowPath;
        const imageId = res.body[0].id;
        quill.insertEmbed(length, 'image', {
            url: imageUrl,
            id: imageId,
        });

        quill.setSelection(length + 1);
        emit('getFileId', res.body[0].id)
    } else {
        ElMessage.error('图片插入失败')
    }
}
// 上传失败处理
function handleUploadError() {
    ElMessage.error('图片插入失败')
}

// 增加hover工具栏有中文提示
function initTitle() {
    document.getElementsByClassName('ql-editor')[0].dataset.placeholder = ''
    for (let item of titleConfig.value) {
        let tip = document.querySelector('.ql-toolbar ' + item.Choice)
        if (!tip) continue
        tip.setAttribute('title', item.title)
    }
}

onMounted(() => {
    initTitle()
    oldContent.value = props.content
})
</script>
  //通过css样式来汉化
<style>
.editor,
.ql-toolbar {
    white-space: pre-wrap !important;
    line-height: normal !important;
}

.editor-img-uploader {
    display: none;
}

.ql-editor {
    min-height: 200px;
    max-height: 300px;
    overflow: auto;
}


.ql-snow .ql-tooltip[data-mode='link']::before {
    content: '请输入链接地址:';
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
    content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
    content: '10px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
    content: '18px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
    content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
    content: '标题1';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
    content: '标题2';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
    content: '标题3';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
    content: '标题4';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
    content: '标题5';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
    content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
    content: '衬线字体';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
    content: '等宽字体';
}
</style>
  