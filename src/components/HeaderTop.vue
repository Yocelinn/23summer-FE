<template>
    <div class="header-container">
        <div class="left-container">
            <img src="../assets/logo.jpg" alt="logo" class="logo">
        </div>
        <div class="right-container">
            <div class="item">
                <el-input
                    v-model="input2"
                    class="w-50 m-2"
                    placeholder="Please Input"
                    :suffix-icon="Search"
                    >
                    <el-icon><Search /></el-icon>
                    </el-input>
            </div>
            <div class="item bell">
                <el-icon size="20"><Bell /></el-icon>
            </div>
            <div class="item avatar">
                <el-popover
                    :width="300"
                    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; "
                    >
                    <template #reference>
                        <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" :size="40"/>
                    </template>
                    <template #default>
                        <div
                        class="demo-rich-conent"
                        style="display: flex; gap: 16px; flex-direction: column"
                        >
                            <el-avatar
                                :size="60"
                                src="../assets/home-left.png"
                                style="margin-bottom: 8px"
                            />
                            <div>
                                <p
                                class="demo-rich-content__name"
                                style="margin: 0; font-weight: 500"
                                >
                                Element Plus
                                </p>
                                <p
                                class="demo-rich-content__mention"
                                style="margin: 0; font-size: 14px; color: var(--el-color-info)"
                                >
                                @element-plus
                                </p>
                            </div>

                            <p class="demo-rich-content__desc" style="margin: 0">
                                所在企业：123456
                                <button style="float: right;">进入企业</button>
                            </p>
                        </div>
                    </template>
                </el-popover>
            </div>
            
        </div>
    </div>
</template>

<script>

import { Search } from '@element-plus/icons-vue'

export default {
    setup() {
        return {
            Search
        }
    },
    data() {
        return {
            input2: ''
        }
    }
}
</script>

<style scoped>
.logo {
    width: 40px
}
.header-container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    height: 40px;
}
.left-container {
    margin-left: 20px;
}
.right-container {
    display: flex;
    margin-right: 30px;
}
.item {
    margin-right: 10px;

}
.bell {
    line-height: 40px;
    align-items: center;
    justify-content: center;
}
.avatar {
    line-height: 40px;
    align-items: center;
    justify-content: center;
}
</style>