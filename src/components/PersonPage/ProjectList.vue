<template>
    <div class="flex-container-pl">
        <span>
            <h2>所有项目</h2>
        </span>
        <div class="align-right-pl">
            <!--            <span>-->
            <!--                -->
            <!--            </span>-->
            <!--            <el-divider class="custom-divider" direction="vertical" />-->
            <span>
                <el-button class="newProject-pl" color="#9E9CF4" type="primary" size="large" style="font-size: 16px; color: white" @click="navigateToRoute">
                    新建项目
                </el-button>
            </span>
        </div>
    </div>
    <div class="table-container-pl">
        <el-table class="table-pl" :data="tableData" style="width: 100%" stripe="true" fit="true">
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
                    <el-button class="access-pl" size="small" @click="handleEdit(scope.$index, scope.row)"
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
    </div>
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
.table-pl {
    padding: 15px;
    overflow: auto;
    height: 570px;
}

.table-container-pl {
    margin-top: -10px;
    margin-bottom: 30px;
}

.flex-container-pl {
    display: flex;
    align-items: center;
    padding: 15px;
}

.align-right-pl {
    margin-left: auto;
}

.newProject-pl {
    padding: 5px;
}

</style>