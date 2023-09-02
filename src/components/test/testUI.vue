<template>
    <div>
        <el-table :data="tableData" >
            <el-table-column>
                <template #header>
                    项目名称
                </template>
                <el-radio-group>
                    <template #default="scope">
                        <el-radio size="large" >
                            <div style="display: flex; align-items: center">
                                <span>test</span>
                            </div>
                        </el-radio>
                    </template>
                </el-radio-group>
            </el-table-column>
            <el-table-column label="列2" prop="column2"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                { projectName: '数据1', column2: '数据A' },
                { projectName: '数据2', column2: '数据B' },
                { projectName: '数据3', column2: '数据C' },
            ],
            selectedRow: null, // 用于存储选中的行数据
        };
    },
    // methods: {
    //     handleSelectionChange(selection) {
    //         // 只保留最后选中的行数据
    //         if (selection.length > 0) {
    //             this.selectedRow = selection[selection.length - 1];
    //         } else {
    //             this.selectedRow = null; // 如果取消选中，将选中行数据置为空
    //         }
    //     },
    // },
};
</script>
