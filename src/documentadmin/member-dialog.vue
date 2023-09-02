<template>
  <el-dialog class="testClass" style="z-index: 1;" title="请选择你想@的团队成员" v-model="visibility" :append-to-body="true" width="85%" :center="true">
    <el-table :data="dataList" stripe border row-key="index" style="width: 100%" size="mini" @row-click="rowClick">
      <el-table-column type="index" width="35" />
      <el-table-column prop="nickname" label="成员昵称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="成员名" width="180">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      project_id:window.sessionStorage.getItem('curProjectId'),
      team_id:window.sessionStorage.getItem('curTeamId'),
      visibility: false,
      dataList: []
    }
  },
  methods: {
    showDialog(data) {
        this.visibility = true
        axios.post('/team/seemember',
          {
            "team_id":Number(this.team_id),
          })
          .then((response)=>{
        console.log(response.data);
        console.log(this.team_id);
        this.dataList=response.data.res;
        console.log(this.dataList);
      }).catch(error=>{
        console.log(error)
      }),
      console.log('数据', this.dataList)
    },
    close() {
      this.visibility = false
    },
    rowClick(row, column, e) {
        this.$emit('rowClick', row)
        this.close()
    }
  }
}
</script>

<style>
.testClass{
  width: 25%;
  top: 20vh;
}
</style>
