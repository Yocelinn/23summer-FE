<template>
  <div class="container main-container">
    <el-row class="card-wrapper">
      <el-col :span="10" :offset="7">
        <el-card class="card" body-style="padding: 0">
          <template #header>
            <div class="header">
              <div class="header-welcome">
                欢迎回来！
              </div>
              <div class="header-title">
                <h1>登录</h1>
              </div>
            </div>
          </template>
          <div class="body-wrapper">
            <el-form :model="loginEmailForm" :rules="rulesEmail"
                     ref="loginEmailForm" label-width="70px" status-icon>
              <el-form-item label="邮箱" prop="email" required>
                <el-input v-model="loginEmailForm.email" type="email"
                          autocomplete="off" placeholder="请输入邮箱" />
              </el-form-item>
              <el-form-item label="密码" prop="password" required>
                <el-input v-model="loginEmailForm.password" type="password"
                          placeholder="请输入密码" />
              </el-form-item>
            </el-form>
            <div class="submit">
              <el-button class="submit-button" type="primary"
                         @click="submitEmailForm" :loading="loading">登录</el-button>
            </div>
            <div class="footer">
              没有用户？
              <router-link to="/signup">
                <el-link :underline="false">立即注册</el-link>
              </router-link>
            </div>
            <div class="clear"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isError } from '@/utils/request.js'
import { ElNotification } from 'element-plus'
import axios from "axios";

export default {
  name: 'LogIn',

  data() {
    return {
      loginEmailForm: {
        email: '',
        password: '',
      },
      rules: {
        phone: [{
          validator: this.validatePhone,
          trigger: ['blur', 'change'],
        }],
        password: [{
          validator: this.validatePassword,
          trigger: ['blur', 'change'],
        }],
      },
      rulesEmail: {
        email: [{
          validator: this.validateEmail,
          trigger: ['blur', 'change'],
        }],
        password: [{
          validator: this.validatePasswordEmail,
          trigger: ['blur', 'change'],
        }],
      },
      errors: {},
      errorsEmail: {},
      loading: false,
      select: true,
    };
  },

  methods: {
    validatePhone(rule, value, callback) {
      if (value === '') {
        callback('请输入手机号');
      }
      if (value.length != 11 || value.search('[^0-9]') >= 0) {
        callback('不是有效的手机号');
      }
      if (this.errors['phone']) {
        callback(this.errors['phone']);
        this.errors['phone'] = undefined;
      }
      callback();
    },

    validatePassword(rule, value, callback) {
      if (value === '') {
        callback('请输入密码');
      }
      if (value.length < 8 || value.length > 18
              || value.search('[0-9]') < 0 || value.search('[A-Za-z]') < 0) {
        callback('不是有效的密码');
      }
      if (value.search('[^A-Za-z0-9\\!\\@\\#\\$\\%\\&\\?]') >= 0) {
        callback('不是有效的密码');
      }
      if (this.errors['password']) {
        callback(this.errors['password']);
        this.errors['password'] = undefined;
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
      if (this.errorsEmail['email']) {
        callback(this.errorsEmail['email']);
        this.errorsEmail['email'] = undefined;
      }
      callback();
    },

    validatePasswordEmail(rule, value, callback) {
      if (value === '') {
        callback('请输入密码');
      }
      if (value.length < 8 || value.length > 18
              || value.search('[0-9]') < 0 || value.search('[A-Za-z]') < 0) {
        callback('不是有效的密码');
      }
      if (value.search('[^A-Za-z0-9\\!\\@\\#\\$\\%\\&\\?]') >= 0) {
        callback('不是有效的密码');
      }
      if (this.errorsEmail['password']) {
        callback(this.errorsEmail['password']);
        this.errorsEmail['password'] = undefined;
      }
      callback();
    },

    submitEmailForm() {
      this.loading = true;
      this.errorsEmail = {};
      this.$refs['loginEmailForm'].validate(
        async (isValid) => {
          if (isValid) {
            const r = await axios.post('/user/login', this.loginEmailForm);
            this.loading = false;
            if (isError(r)) {
              if (r.data) {
                this.errors = r.data;
              }
              this.$refs['loginEmailForm'].validate(() => {});
            } else if(!isError(r)){
              if(r.data.code==200)
              {
              ElNotification({
                title: '登录成功',
                message: '欢迎回到!',
                type: 'success',
              });
              this.$store.commit('login', r.data);
              console.log(this.$store.state.user.token);
              window.sessionStorage.setItem('token',this.$store.state.user.token);
              this.$router.push('/person');
              }
              else if(r.data.code==10101)
              {
                ElNotification({
                title: '登录失败',
                message: '用户不存在或密码错误！!',
                type: 'unexist',
              });
              }
              else{
                ElNotification({
                title: '登录失败',
                message: '其他错误',
                type: 'other',
              });
            }
          } else {
            this.loading = false;
          }
        }
        });
    },
  },
};
</script>

<style scoped>
.container {
  width: 1024px;
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

.card-wrapper {
  margin-top: 40px;
  margin-bottom: 60px;
}
.card {
  max-width: 1024px;
}

.body-wrapper {
  padding: 20px;
  padding-top: 32px;
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