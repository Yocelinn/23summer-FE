import { $dialog } from '@/components/Dialog'
import { Picture, Position } from '@element-plus/icons-vue';
import {mapState, useStore, mapActions } from 'vuex';

export function useButtons(data, commands, previewRef, editorRef, clearBlockFocus, saveImg) {
  const store = useStore()
  const buttons = [
    {
      label: '撤销',
      icon: 'icon-back',
      handler: () => {
        commands.undo()
      }
    },
    {
      label: '前进',
      icon: 'icon-forward',
      handler: () => {
        commands.redo()
      }
    },
    {
      "label": '导出',
      icon: 'icon-export',
      handler: () => {
        $dialog({
          title: '导出json数据',
          content: JSON.stringify(data.value),
          "footer": true,
          onConfirm: () => {
            var a = document.createElement('a');
            a.download = "export_prototype.js";
            a.style.display = "none";
            // console.log(data.value)
            var jsCode = `var exportedData = ${JSON.stringify(data.value, null, 2)};`;
            var blob = new Blob([jsCode], { type: "application/javascript" });
            a.href = URL.createObjectURL(blob);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        })
      }
    },
    {
      label: '导入',
      icon: 'icon-import',
      handler: () => {
        $dialog({
          title: '导入json数据',
          content: '',
          footer: true,
          onConfirm: text => {
            commands.updataContainer(JSON.parse(text))
          }
        })
      }
    },
    {
      label: '置顶',
      icon: 'icon-place-top',
      handler: () => {
        commands.placeTop()
      }
    },
    {
      label: '置底',
      icon: 'icon-place-bottom',
      handler: () => {
        commands.placeBottom()
      }
    },
    {
      label: '删除',
      icon: 'icon-delete',
      handler: () => {
        commands.delete()
      }
    },
    {
      label: () => {
        return previewRef.value ? '编辑' : '预览'
      },
      icon: () => {
        return previewRef.value ? 'icon-edit' : 'icon-browse'
      },
      handler: () => {
        previewRef.value = !previewRef.value
        clearBlockFocus()
      }
    },
    {
      label: '保存',
      icon: 'icon-entypomenu',
      handler: () => {
        commands.store()
      }
    },
    {
      label: '关闭',
      icon: 'icon-close',
      handler: () => {
        editorRef.value = false
        clearBlockFocus()
      }
    },
    {
      label: '图片',
      icon: Picture,
      handler: () => {
        saveImg()
      }
    },
    {
      label: () => {
        return store.state.preview  ? '关闭预览' : '预览'
      },
      icon: Position,
      handler: () => {      
        store.commit('setPreview')
        
        // location.reload()
        // 当开启预览时，getItem获取到为'true'
        if(store.getters.getPreview){         
          localStorage.setItem('preview',true); 
          localStorage.setItem('data', JSON.stringify(data.value));
          // // 当前 URL
          // const currentURL = window.location.href;
          // // 要添加的字符串
          // const queryString = 'preview=true';
          // // 构建新的 URL
          // const newURL = currentURL + '?' + queryString;
          // 打开新窗口
          window.open('/prototype_preview=true');
        } else {
          localStorage.setItem('preview',false); 
        }
      },
    },
    
  ]
  return buttons
}
