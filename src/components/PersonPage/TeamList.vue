<template>
    <div class="center-container">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span class="text">选择团队</span>
                    <el-button class="button" text>新建团队</el-button>
                </div>
            </template>
            <el-table :data="tableData" style="width: 100%" height="250" :show-header="false">
                <el-table-column label="Name" fit="true" align="center">
                    <template #default="scope">
                        <d-button class="custom-button"  v-ripple="{ duration: 300 }">
                            {{ scope.row.name }}
                        </d-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style>
.center-container {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    height: 100vh;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 18px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 380px;
    height: 450px;
}

.custom-button {
    cursor: pointer;
    user-select: none; /* 禁止选中文字 */
}

.custom-button:focus {
    outline: none; /* 去掉按钮的焦点样式 */
}

.custom-button:active {
    background-color: #f2f6fc; /* 点击时的背景色 */
}

.custom-button {
    color: #9E9CF4;
    width: 100%; /* 设置按钮宽度 */
    padding: -5px;
    margin: -5px;
    height: 40px; /* 调整为您希望的行高度值 */
    line-height: 40px; /* 使文本垂直居中 */
}
</style>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    name: 'Team 1',
                },
                {
                    name: 'Team 2',
                },
                {
                    name: 'Team 3',
                },
                {
                    name: 'Team 4',
                },
                {
                    name: 'Team 5',
                },
            ]
        };
    },
    methods: {
        handleButtonClick(row) {
            // 处理按钮点击事件，例如导航到详情页或执行其他操作
            console.log('Button clicked for:', row.name);
        }
    }
};
</script>
