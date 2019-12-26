<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->

    <el-table :data="postList" border style="width: 100%;margin-top:20px">
      <el-table-column fixed type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="420"></el-table-column>
      <el-table-column prop="create_date" label="日期" width="180">
        <template slot-scope="scope">{{scope.row.create_date | dataFormat}}</template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100">
        <template slot-scope="scope">{{scope.row.type===1?'文章':'视频'}}</template>
      </el-table-column>
      <el-table-column prop="categories" label="栏目" width="280">
        <template slot-scope="scope">{{scope.row.categories | myCate}}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="280"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button-group>
              <el-tooltip class="item" effect="dark" content="查看/编辑" placement="top-start">
            <el-button @click="handleClick(scope.row)" type="success" icon="el-icon-edit"></el-button>
                </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="收藏" placement="top-start">
            <el-button type="warning" icon="el-icon-star-off"></el-button>
             </el-tooltip>
             <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete"></el-button>
             </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { dataFormat, myCate } from "@/utils/myfilters.js";
import { getPostList } from "@/api/article.js";
export default {
  data() {
    return {
      pageIndex: 1, //默认显示第一页
      pageSize: 5, //每页显示多少条数据
      total: 0, //一共多少条数据
      postList: [] //创建新数组，保存文章列表
    };
  },
  //获取文章列表
  mounted() {
    this.init();
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }, // 切换显示记录数时触发
    handleSizeChange(val) {
      // val就是用户当前想显示的记录数
      // 我们就需要重置pageSize为val
      this.pageSize = val;
      // 重新获取数据
      this.init();
    },
    // 切换页码时触发
    handleCurrentChange(val) {
      // val就是用户当前需要获取的分页数据的页码
      // 我们就需要将全局的pageIndex重置为当前val值
      this.pageIndex = val;
      // 发起数据请求
      this.init();
    },

    async init() {
      let res = await getPostList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      // console.log(res);
      if (res.status === 200) {
        this.postList = res.data.data;
        // console.log(this.postList);

        // 获取总记录数，方便后期的分页属性的设置
        this.total = res.data.total;
      }
    }
  },
  filters: {
    dataFormat,
    myCate
  }
};
</script>

<style lang="less" scoped>
.el-button-group>.el-button {
  
    margin: 0 20px;
  
}
</style>