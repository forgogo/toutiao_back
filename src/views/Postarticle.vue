<template>
  <div class="post">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-form
        :model="articleForm"
        :rules="rules"
        ref="articleForm"
        label-width="100px"
        class="demo-articleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="region">
          <template>
            <el-radio v-model="articleForm.type" :label="1">文章</el-radio>
            <el-radio v-model="articleForm.type" :label="2">视频</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="内容" prop="name">
          <!-- 富文本框 -->
          <VueEditor :config="config" ref="postContent" v-if="articleForm.type===1" />
          <!-- 视频上传 -->
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            action="http://127.0.0.1:3000/upload"
            :headers="setToken()"
            :on-success="handlerSuccess"
            :before-upload="beforeUpload"
            v-if="articleForm.type===2"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="栏目" required>
          <template>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="cate in cateList" :label="cate.id" :key="cate.id">{{cate.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="封面" prop="name">
          <el-upload
            :limit="3"
            action="http://127.0.0.1:3000/upload"
            list-type="picture-card"
            :headers="setToken()"
            :on-success="coverSuccess"
            :on-remove="coverRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('articleForm')">立即创建</el-button>
          <el-button @click="resetForm('articleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
//富文本框引入
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
//栏目列表API
import { getCategory, publishPost } from "@/api/article.js";

//复选框数据
export default {
  components: {
    VueEditor
  },
  //获取栏目列表
  async mounted() {
    let res = await getCategory();
    if (res.status === 200) {
      this.cateList = res.data.data.splice(2);
      // console.log(this.cateList);
    }
  },

  data() {
    return {
      // 复选框 属性
      checkAll: false,
      checkedCities: [],
      cateList: "",
      isIndeterminate: true,
      //图片墙 封面块
      dialogImageUrl: "",
      dialogVisible: false,
      // 富文本框
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          headers: this.setToken(),
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: this.setToken(),
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
          }
        }
      },
      // 复选框属性

      articleForm: {
        title: "", //标题
        type: 1, //类型
        content: "", //文章类容
        cover: [], //封面
        categories: [] //栏目
      },
      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    //提交按钮功能
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.articleForm.type == 1) {
            this.articleForm.content = this.$refs.postContent.editor.root.innerHTML;
          }
          // 获取栏目数据
          this.articleForm.categories.length = 0;
          this.checkedCities.forEach(value => {
            this.articleForm.categories.push({
              id: value
            });
          });

          console.log(this.articleForm);
          let res = await publishPost(this.articleForm);

          console.log(res);
          if (res.data.message === "文章发布成功") {
            this.$message.success("文章发布成功");
            this.$router.push({ name: "PostList" });
          }
        } else {
          this.$alert("不写点什么吗", "温馨提示", {
            confirmButtonText: "确定"
          });
          return false;
        }
      });
    },
    // 重置/清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 复选框
    // 全选
    handleCheckAllChange(val) {
      // val值为true,说明为全选状态，为false为全不选状态
      this.checkedCities = val
        ? this.cateList.map(value => {
            return value.id;
          })
        : [];
      // 当前的状态不再是不确定的状态：全选，全不选
      this.isIndeterminate = false;
      
      
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cateList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cateList.length;
        console.log(this.checkedCities);
    },
    //图片墙
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 设置请求头的token
    setToken() {
      let token = localStorage.getItem("toutiao_back_token");
      return {
        Authorization: token
      };
    },
    //上传文件之前的钩子
    beforeUpload(file) {
      // console.log(file);
      if (file.type.indexOf("video/") !== 0) {
        this.$message.warning("请选择视频文件");
        return false;
      }
    },

    //视频上传成功之后的钩子函数
    handlerSuccess(response, file, fileList) {
      if (response.message === "文件上传成功") {
        console.log(response, file, fileList);

        this.articleForm.content =
          localStorage.getItem("toutiao_back") + response.data.url;
      }
    },
    // 上传封面成功后的函数
    coverSuccess(response) {
      // console.log(response);
      // 如果文件上传成功，将本次上传成功的id号存储到postForm的cover属性中
      if (response.message === "文件上传成功") {
        // 生成后台接口所需要的数据格式
        // console.log(response.data.id);
        this.articleForm.cover.push({ id: response.data.id });
      }
    },
    // 移除封面图片钩子函数
    // eslint-disable-next-line no-unused-vars
    coverRemove(file, fileList) {
      let id = file.response.data.id;
      for (let i = 0; i < this.postForm.cover.length; i++) {
        if (this.postForm.cover[i].id === id) {
          // 找到了，就是你
          this.postForm.cover.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
/deep/#editor {
  height: 500px;
}
</style>