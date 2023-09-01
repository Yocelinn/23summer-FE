import { $dialog } from '@/components/Dialog'

export function useButtons(data, commands, previewRef, editorRef, clearBlockFocus, saveImg) {
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
            $dialog({
              title: '下载js文件',
              footer: true,
              default: false,
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
              },
              // onCancel: () => {
              //   var a = document.createElement('a');
              //   a.download = "export_prototype.json";
              //   a.style.display="none";
              //   var dat = JSON.stringify(data.value,null,4);
              //   var blob = new Blob([dat],{type:"Application/json"});
              //   a.href = URL.createObjectURL(blob);
              //   document.body.appendChild(a);
              //   a.click();
              //   document.body.removeChild(a);
              // }
            })
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
      icon: 'icon-tupian',
      handler: () => {
        saveImg()
      }
    },
  ]
  return buttons
}
