// 列表区可以显示所有的图标
import { ElIcon } from 'element-plus'
// import { ElRadio, ElSlider, ElProgress, ElInputNumber, ElCheckboxGroup, ElRadioGroup, ElCheckbox, ElLink, ElImage, ElMenu, ElMenuItem } from 'element-plus'
// import Range from '@/components/Range.jsx'
import 'animate.css'
// key对应的元素的映射关系
function createEditorConfig() {
  // 元素表
  const iconList = []
  // 映射关系表
  const iconMap = {}
  return {
    iconList,
    iconMap,
    register: component => {
      iconList.push(component)
      iconMap[component.key] = component
    }
  }
}
export let registerIcon = createEditorConfig()
// const createInputProp = label => ({ type: 'input', label })
// const createColorProp = label => ({ type: 'color', label })
// const createSelectProp = (label, options) => ({ type: 'select', label, options })
// const createTableProp = (label, table) => ({ type: 'table', label, table })
// const createPercentageProp = (label, value) => ({ type: 'input', label, value })

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Plus/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Plus/></ElIcon>),
    key: 'icon-plus',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Minus/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Minus/></ElIcon>),
    key: 'icon-minus',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Search/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Search/></ElIcon>),
    key: 'icon-search',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Clock/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Clock/></ElIcon>),
    key: 'icon-clock',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><ChatDotRound/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><ChatDotRound/></ElIcon>),
    key: 'icon-chat',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Star/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Star/></ElIcon>),
    key: 'icon-star',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><View/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><View/></ElIcon>),
    key: 'icon-view',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Hide/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Hide/></ElIcon>),
    key: 'icon-hide',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Service/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Service/></ElIcon>),
    key: 'icon-service',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Bell/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Bell/></ElIcon>),
    key: 'icon-bell',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><User/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><User/></ElIcon>),
    key: 'icon-user',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><CircleCheck/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><CircleCheck/></ElIcon>),
    key: 'icon-check',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Warning/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Warning/></ElIcon>),
    key: 'icon-warning',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Filter/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Filter/></ElIcon>),
    key: 'icon-filter',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Refresh/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Refresh/></ElIcon>),
    key: 'icon-refresh',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Lock/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Lock/></ElIcon>),
    key: 'icon-lock',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Message/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Message/></ElIcon>),
    key: 'icon-message',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><EditPen/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><EditPen/></ElIcon>),
    key: 'icon-editPen',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><PieChart/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><PieChart/></ElIcon>),
    key: 'icon-pieChart',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><SwitchButton/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><SwitchButton/></ElIcon>),
    key: 'icon-switch',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><List/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><List/></ElIcon>),
    key: 'icon-list',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Avatar/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Avatar/></ElIcon>),
    key: 'icon-avatar',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Share/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Share/></ElIcon>),
    key: 'icon-share',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><HomeFilled/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><HomeFilled/></ElIcon>),
    key: 'icon-home',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Promotion/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Promotion/></ElIcon>),
    key: 'icon-promotion',
    animate: {},
    events: [],
    props: {}
})


registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Back/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Back/></ElIcon>),
    key: 'icon-back',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Right/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Right/></ElIcon>),
    key: 'icon-right',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Download/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Download/></ElIcon>),
    key: 'icon-download',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Upload/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Upload/></ElIcon>),
    key: 'icon-upload',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Sort/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Sort/></ElIcon>),
    key: 'icon-sort',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Delete/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Delete/></ElIcon>),
    key: 'icon-delete',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Setting/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Setting/></ElIcon>),
    key: 'icon-setting',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><FolderOpened/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><FolderOpened/></ElIcon>),
    key: 'icon-folderOpened',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><DocumentCopy/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><DocumentCopy/></ElIcon>),
    key: 'icon-documentCopy',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Mic/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Mic/></ElIcon>),
    key: 'icon-mic',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Camera/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Camera/></ElIcon>),
    key: 'icon-camera',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Monitor/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Monitor/></ElIcon>),
    key: 'icon-monitor',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Picture/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Picture/></ElIcon>),
    key: 'icon-picture',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Iphone/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Iphone/></ElIcon>),
    key: 'icon-iphone',
    animate: {},
    events: [],
    props: {}
})


registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><VideoPlay/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><VideoPlay/></ElIcon>),
    key: 'icon-videoPlay',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Location/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Location/></ElIcon>),
    key: 'icon-location',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Bicycle/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Bicycle/></ElIcon>),
    key: 'icon-bicycle',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><OfficeBuilding/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><OfficeBuilding/></ElIcon>),
    key: 'icon-building',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><CoffeeCup/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><CoffeeCup/></ElIcon>),
    key: 'icon-coffee',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Food/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Food/></ElIcon>),
    key: 'icon-food',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Sugar/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Sugar/></ElIcon>),
    key: 'icon-sugar',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><IceCreamRound/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><IceCreamRound/></ElIcon>),
    key: 'icon-iceCream',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Dish/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Dish/></ElIcon>),
    key: 'icon-dish',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Key/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Key/></ElIcon>),
    key: 'icon-key',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><ShoppingCart/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><ShoppingCart/></ElIcon>),
    key: 'icon-shoppingCart',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Sunny/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Sunny/></ElIcon>),
    key: 'icon-sunny',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Moon/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Moon/></ElIcon>),
    key: 'icon-moon',
    animate: {},
    events: [],
    props: {}
})

registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><MostlyCloudy/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><MostlyCloudy/></ElIcon>),
    key: 'icon-cloudy',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Pouring/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Pouring/></ElIcon>),
    key: 'icon-pouring',
    animate: {},
    events: [],
    props: {}
})
registerIcon.register({
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size='30'><Lightning/></ElIcon>,
    render:({size}) => (<ElIcon style={{ width: size.width + 'px', height: size.height + 'px' }} size="50"><Lightning/></ElIcon>),
    key: 'icon-lightning',
    animate: {},
    events: [],
    props: {}
})