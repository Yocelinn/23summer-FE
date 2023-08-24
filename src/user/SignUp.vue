<script setup>
import { get, post, isError } from '@/utils/request.js'
import { ElNotification, ElMessage } from 'element-plus'
</script>

<template>
    <div class="container main-container">
      <el-row>
        <el-col :span="10" :offset="7">
          <el-card>
            <template #header>
              <div class="header">
                <div class="header-welcome">
                  欢迎来到绿色心情！
                </div>
                <div class="header-title">
                  <h1>注册新用户</h1>
                </div>
              </div>
            </template>
            <el-form :model="signupForm" :rules="rules" ref="signupForm"
              label-width="80px" status-icon>
              <el-form-item label="用户名" prop="nickname" required>
                <el-input v-model="signupForm.nickname" type="text"
                  placeholder="2 至 32 个字符" />
              </el-form-item>
              <el-form-item label="密码" prop="password" required>
                <el-input v-model="signupForm.password" type="password"
                  placeholder="8 至 18 位，至少包含数字和字母" />
              </el-form-item>
              <el-form-item label="确认密码" prop="confirm_password" required>
                <el-input v-model="signupForm.confirm_password" type="password"
                  placeholder="再次填写密码" />
              </el-form-item>
              <el-form-item label="邮箱" prop="email" required>
                <el-input v-model="signupForm.email" type="email"
                  placeholder="注册后不可修改" />
              </el-form-item>
              <el-form-item label="姓名" prop="name" required>
                <el-input v-model="signupForm.name" type="text"
                  placeholder="实名认证后不可修改" />
              </el-form-item>
            </el-form>
            <div class="submit">
              <el-button class="submit-button" type="primary" @click="submitForm"
                :loading="loading">注册</el-button>
              <el-button @click="resetForm" class="submit-button">重置</el-button>
            </div>
            <div class="footer">
              已有用户？
              <router-link to="/login">
                <el-link :underline="false">立即登录</el-link>
              </router-link>
            </div>
            <div class="clear"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </template>

<script>
export default {
  name: 'SignUp',

  data() {
    return {
      signupForm: {
        nickname: '',
        password: '',
        confirm_password: '',
        email: '',
        name: '',
      },
      rules: {
        nickname: [{
          validator: this.validatenickname,
          trigger: ['blur', 'change'],
        }],
        password: [{
          validator: this.validatePassword,
          trigger: ['blur', 'change'],
        }],
        confirm_password: [{
          validator: this.validateConfirmPassword,
          trigger: ['blur', 'change'],
        }],
        email: [{
          validator: this.validateEmail,
          trigger: ['blur', 'change'],
        }],
        name: [{
          validator: this.validateName,
          trigger: ['blur', 'change'],
        }],
      },
      errors: {},
      loading: false,
      sending: false,
      lastSendTime: undefined,
      currentTime: undefined,
      eventId: 0,
    };
  },

  methods: {
    validatenickname(rule, value, callback) {
      if (value === '') {
        callback('请输入用户名');
      }
      if (value.length < 2 || value.length > 32) {
        callback('用户名需为 2 至 32 个字符');
      }
      if (this.errors['nickname']) {
        callback(this.errors['nickname']);
        this.errors['nickname'] = undefined;
      }
      callback();
    },

    validatePassword(rule, value, callback) {
      if (value === '') {
        callback('请输入密码');
      }
      if (value.length < 8 || value.length > 18
        || value.search('[0-9]') < 0 || value.search('[A-Za-z]') < 0) {
        callback('密码需为 8 至 18 位，至少包含数字和字母');
      }
      if (value.search('[^A-Za-z0-9\\!\\@\\#\\$\\%\\&\\?]') >= 0) {
        callback('密码只能包含数字、字母以及 !@#$%&? 中的特殊字符');
      }
      if (this.errors['password']) {
        callback(this.errors['password']);
        this.errors['password'] = undefined;
      }
      callback();
    },

    validateConfirmPassword(rule, value, callback) {
      if (value === '') {
        callback('请确认密码');
      }
      if (value != this.signupForm.password) {
        callback('两次输入密码不一致');
      }
      callback();
    },

    validateEmail(rule, value, callback) {
      if (value === '') {
        callback('请输入邮箱');
      }
      const at = value.search('@');
      const dot = value.slice(at + 1).search('.');
      let valid = (at != -1) && (dot != -1);
      valid = valid && value.slice(at + 1).search('@') == -1;
      valid = valid && value.search('[^A-Za-z0-9\\-\\_\\@\\.]') == -1;
      if (!valid) {
        callback('不是有效的邮箱');
      }
      if (this.errors['email']) {
        callback(this.errors['email']);
        this.errors['email'] = undefined;
      }
      callback();
    },

    validateName(rule, value, callback) {
      if (value === '') {
        callback('请输入姓名');
      }
      if (value.length < 2 || value.length > 32) {
        callback('不是有效的姓名');
      }
      if (this.errors['name']) {
        callback(this.errors['name']);
        this.errors['name'] = undefined;
      }
      callback();
    },

    submitForm() {
      this.loading = true;
      this.errors = {};
      this.$refs['signupForm'].validate(
        async (isValid) => {
          if (isValid) {
            const r = await post('/register/', this.signupForm);
            this.loading = false;
            if (isError(r)) {
              if (r.data) {
                this.errors = r.data;
              }
              this.$refs['signupForm'].validate((isValid) => {});
            } else {
              ElNotification({
                title: '注册成功',
                message: '欢迎加入！',
                type: 'success',
              });
              this.$router.push('/login');
            }
          } else {
            this.loading = false;
          }
        }
      );
    },

    resetForm() {
      this.$refs['signupForm'].resetFields();
    },
  },
};
</script>

<style scoped>
.container {
  width: 1536px;
  margin: auto;
  padding: 0 20px;
}

.main-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.header {
  text-align: center;
}
.header-welcome {
  color: var(--el-color-info);
}
.header-title > h1 {
  font-size: 20px;
  line-height: 20px;
}

.send-button {
  width: 100%;
}

.submit {
  text-align: center;
}
.submit-button {
  width: 80px;
}

.footer {
  color: var(--el-color-info);
  margin-top: 20px;
  float: right;
}

.clear {
  clear: both;
}
</style>

