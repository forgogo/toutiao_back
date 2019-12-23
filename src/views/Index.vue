<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div class="hmLogo">
            <span>黑马头条</span>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">用户列表</el-menu-item>
            </el-menu-item-group>
             
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>

            <el-menu-item-group>
              <!-- index="postList"  实现页面跳转 -->
              <el-menu-item index="postList">
                <span>文章列表</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="postarticle">
                <span>文章发布</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="catelist">栏目列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="icon-paragraph-justify toggle-btn"></span>
          <span class="system-title">黑马头条后台管理系统</span>
          <div class="welcome">
            <span>欢迎您：{{user.nickname}}</span> &nbsp;&nbsp;&nbsp;
            <!-- <span @click="logout">退出</span> -->
              <el-button type="danger" @click="logout">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUser } from "@/api/user.js";
export default {
  data() {
    return {
      user: {
        head_img: "",
        id: "",
        nickname: "",
        password: "",
        username: ""
      }
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("toutiao_back_token");
      this.$router.push({ path: "/login" });
    }
  },
  async mounted() {
    let userId = localStorage.getItem("toutiao_back_userId");
    // eslint-disable-next-line no-unused-vars
    let res = await getUser(userId);
    console.log(res);

    if (res.data.message === "获取成功") {
      this.user.id = res.data.data.id;
      this.user.head_img = res.data.data.head_img;
      this.user.password = res.data.data.password;
      this.user.username = res.data.data.username;
      this.user.nickname = res.data.data.nickname;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .hmLogo {
    display: flex;
    width: 200px;
    height: 60px;
    background-color: #545c64;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    color: #fff;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
.el-button--danger{
  padding: 8px 10px;
  margin-left: 10px;
}
</style>