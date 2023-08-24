<template>
    <div class="flex-container">
        <span>
            <h3>所有项目</h3>
        </span>
        <div class="align-right">
            <!--            <span>-->
            <!--                -->
            <!--            </span>-->
            <!--            <el-divider class="custom-divider" direction="vertical" />-->
            <span>
                <el-button class="newProject" color="#9E9CF4" type="primary" size="large" style="font-size: 16px; color: white" @click="navigateToRoute">
                    新建项目
                </el-button>
            </span>
        </div>
    </div>
    <el-table :data="tableData" style="width: 100%" height="450" stripe="true" fit="true">
        <el-table-column label="项目名称">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.name }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="权限">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.role }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button class="access" size="small" @click="handleEdit(scope.$index, scope.row)"
                >进入项目</el-button
                >
                <el-button class="delete"
                           size="small"
                           type="danger"
                           @click="handleDelete(scope.$index, scope.row)"
                >删除项目</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    name: '2016-05-01',
                    role: 'Tom',
                },
                {
                    name: '2016-05-01',
                    role: 'Tom',
                },
                {
                    name: '2016-05-01',
                    role: 'Tom',
                },
            ]
        };
    },
    methods: {
        // navigateToRoute() {
        //     this.$router.push('/your-route-name');
        // }
        // handleEdit(index, row) {
        //     console.log(index, row);
        // },
        // handleDelete(index, row) {
        //     console.log(index, row);
        // }
    }
};
</script>

<style>
el-table {
    padding: 15px;
    margin: 15px;
    background-color: #9E9CF4 !important;
}

.flex-container {
    display: flex;
    align-items: center;
}

.align-right {
    margin-left: auto;
}

.newProject {
    padding: 5px;
}

</style>