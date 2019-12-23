<template>
  <div class="CateList">
      栏目列表
  </div>
</template>

<script>
import {getCategory} from '@/api/article.js'
export default {
async mounted(){
   let res =await getCategory()
   console.log(res);
   
}
}
</script>

<style>

</style>