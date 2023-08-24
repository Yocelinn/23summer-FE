<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="180px">
          <CommonAside></CommonAside>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="8"><div class="grid-content ep-bg-purple" />
              <el-card class="project">
                <div class="projectshow">
                  <img src="../assets/project.png" alt="">
                  <div class="projectinfo">
                    <p class="projectname">项目名称</p>
                    <p class="projectteam">项目所属团体名称</p>
                  </div>
                </div>
                <div class="projectmessage"></div>
              </el-card>
            </el-col>
            <el-col :span="16"><div class="grid-content ep-bg-purple-light" /></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
  data() {
    return {}
  },
  components: {
    CommonAside
  },
}
</script>

<style>
.projectshow {
  display: flex;
  align-items: center;
}

.projectshow img {
  margin-right: 40px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.projectshow .projectname {
  font-size: 32px;
  margin-bottom: 10px;
}

.projectshow .projectteam {
  color: #999999;
}
</style>

