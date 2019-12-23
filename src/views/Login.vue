<template>
  <div class="login">
    <div class="container">
      <img src="../assets/logo.png" alt class="avatar" />
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" size="medium">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" size="medium">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user.js";
export default {
  data() {
    return {
      loginForm: {
        username: "10086",
        password: "111111"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "用户长度在 3 到 8 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: "用户密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    userLogin() {
      //点击登录的时候 进行二次验证，验证通过再发请求登录
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let res = await login(this.loginForm);
          console.log(res);
          if (res.data.message === "用户不存在") {
            this.$message({message: "用户不存在",type: "success" });
          } else if (res.data.message === "登录成功") {
            // console.log(res.data.data.token);
            localStorage.setItem("toutiao_back_token", res.data.data.token);
            localStorage.setItem("toutiao_back_userId", res.data.data.user.id);
            // window.location.href = "/";
            this.$router.push({ path: "/index" });
          }
        } else {
          this.$message.error("错误的用户名或密码");
          return false
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
  img {
    margin-bottom: 20px;
  }
}
</style>