import { computed, defineComponent, inject, ref } from 'vue'
import '@/assets/css/editor.scss'
import EditorBlock from './editor-block'
// import EditorIcon from './editor-icon-item'
import deepcopy from 'deepcopy'
import { useMenuDragger } from './useMenuDragger'
import { useFocus } from './useFocus'
// 引入保存图片的函数
import { savePicture } from './editor-picture'
import { useBlockDargger } from './useBlockDargger'
import { useCommand } from './useCommand.js'
import { useButtons } from './useButtons'
import { onContextMenuBlock } from './useContextMenuBlock'
import EditorRight from './editor-right'


export default defineComponent({
  props: {
    modelValue: {
      type: Object
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    // 对数据进行处理
    const data = computed({
      get() {
        return props.modelValue
      },
      set(newValue) {
        ctx.emit('update:modelValue', deepcopy(newValue))
      }
    })
    const containerStyles = computed(() => ({
      width: data.value.container.width + 'px',
      height: data.value.container.height + 'px',
      backgroundColor: data.value.container.backgroundColor,
      backgroundImage: 'url(' + data.value.container.backgroundImage + ')',
      backgroundSize: data.value.container.backgroundSize,
      backgroundRepeat: data.value.container.backgroundRepeat
    }))
    // 接收config配置
    const config = inject('config')
    // 接收图标列表
    const iconConfig = inject('icon')
    const formDate = inject('formDate')
    const containerRef = ref(null)
    const selectedBoxRef = ref(null)
    const canvasRef = ref(null)
    // 新增预览，通过新页面来预览
    // 预览的状态控制，内容不能在操作，可以点击，输入内容，可以看效果
    const previewRef = ref(false)
    const editorRef = ref(true)
    // 左侧菜单默认index
    const activeName = ref('components')
    const leftSelect = (key, keypath) => {
      activeName.value = key
    }
    // 右侧菜单默认index
    const rightActiveIndex = ref('1')
    const handelSelect = (key, keypath) => {
      rightActiveIndex.value = key
    }
    // 1.实现菜单的拖拽功能
    const { dragstart, dragend } = useMenuDragger(data, containerRef)
    // 2.实现获取焦点的功能,或直接拖拽
    const { blockMousedown, containerMousedown, focusData, lastSelectBlock, clearBlockFocus } = useFocus(data, containerRef, selectedBoxRef, canvasRef, previewRef, e => {
      mousedown(e)
    })
    // 3.实现拖拽多个元素的功能
    const { mousedown, markLine } = useBlockDargger(focusData, lastSelectBlock, data)
    // 4.实现保存为图片的功能
    const { saveImg } = savePicture(containerRef)
    // 命令库
    const { commands } = useCommand(data, focusData)
    // 按钮库
    const buttons = useButtons(data, commands, previewRef, editorRef, clearBlockFocus, saveImg)
    return () => (
          <>
          <div class={ 'editor-container-canvas__content closeEditor'} style={containerStyles.value}>
            {/* 渲染对应的元素 */}
            {data.value.blocks.map((block, index) => (
              <EditorBlock class={'editor-block-preview'} block={block} formData={formDate}></EditorBlock>
            ))}
          </div>
          <span>
            {/* <ElButton color="#ca96ff" onClick={() => (editorRef.value = true)}>
              继续编辑
            </ElButton> */}
          </span>
        </>
    )
    }
  
})
