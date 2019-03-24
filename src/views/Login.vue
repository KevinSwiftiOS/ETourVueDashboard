<template>
  <div class="login-box">
    <el-card class="login-card" shadow="hover">
      <div class="system-title">登录</div>
      <el-form class="login-form" :model="ruleForm" label-position="top" status-icon :rules="rules2" ref="ruleForm" label-width="100px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div class="login-form-button">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </div>
    </el-card>
    <div class="welcome-txt">欢迎使用千岛湖智慧旅游系统</div>
  </div>
</template>
<script>
import http from "../request/index.js";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules2: {
        username: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      }
    };
  },
  methods: {
    doLogin: async function() {
      const res = await http.login(this.ruleForm);
      if (res.code === 0) {
        localStorage.setItem("token", res.data.token);
        this.$parent.getuser();
        this.$router.push({ name: "home" });
      } else {
        // 登陆失败
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doLogin();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
.login-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
  .welcome-txt {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 25px;
    text-align: center;
    background: #fff;
    font-size: 14px;
    line-height: 25px;
  }
}
.login-card {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 500px;
  max-width: 94%;
  margin: 0 auto;
  .system-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
    padding-bottom: 20px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      bottom: 0;
      background: #d0d0d0;
    }
  }
  .login-form {
    margin-bottom: 30px;
  }
  .login-form-button {
    text-align: center;
    button {
      width: 45%;
    }
  }
}
</style>
