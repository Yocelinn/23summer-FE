import { $dialog } from '@/components/Dialog'
import { Picture, Position, Back } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import router from '@/router';
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from 'vue'

export function useButtons(data, commands, previewRef, editorRef, clearBlockFocus, saveImg) {
  const store = useStore()
  const buttons = [
    {
      label: '回到项目',
      icon: Back,
      handler: () => {
        router.push('/prototype')
      }
    },
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
    // {
    //   label: () => {
    //     return previewRef.value ? '编辑' : '预览'
    //   },
    //   icon: () => {
    //     return previewRef.value ? 'icon-edit' : 'icon-browse'
    //   },
    //   handler: () => {
    //     previewRef.value = !previewRef.value
    //     clearBlockFocus()
    //   }
    // },
    {
      label: '保存',
      icon: 'icon-entypomenu',
      handler: () => {
        commands.store()
        const page_id = localStorage.getItem('curDesignPage')
        
        axios.post('/prototype/page/design', {
          "page_id": page_id,
          "component": JSON.stringify(data.value)
        }).then((response) => {
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch((error) => {
          ElMessage({ message: "保存失败，请重试",type: 'error' });
          console.log(error)
        })
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
        const link_token = ref('')
        axios.post('/prototype/link', {
          "page_id": localStorage.getItem('curDesignPage')
        }).then((response) => {
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
            console.log(typeof(response.data.page_token))
            link_token.value = response.data.page_token
            if(store.getters.getPreview){         
              console.log(link_token.value)
              localStorage.setItem('preview',true); 
              const shareUrl = location.href + '/prototype_preview/token=' + link_token.value;
             
              ElMessageBox({
                title: '分享链接(请手动复制)',
                message: shareUrl,
                showClose: false,
                confirmButtonText: '我知道了',
              })
            } else {
              localStorage.setItem('preview',false); 
              ElMessageBox({
                title: '分享链接',
                message: '预览已关闭',
                showClose: false,
                confirmButtonText: '我知道了',
              })
            }
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch(error => {
          ElMessage({ message: error, type: 'error' });
          console.log(error)
        })
        
      },
    },
    
  ]
  return buttons
}
