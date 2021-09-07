<template>
  <van-collapse
    v-model="activeName"
  >
    <van-collapse-item
      :title="item.name"
      :name="index"
      v-for="(item, index) in menuData"
      :key="index"
    >
      <van-button
        type="primary"
        size="large"
        v-for="(item2, index2) in item.childrens"
        :key="index2"
        @click="goToPage(item2.path, item2.name)"
      >
        {{item2.name}}
      </van-button>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'menu',
  components: {
  },
  setup() {
    const router = useRouter();
    const activeName = ref(['1']);
    const menuData = [{
     name: '预审码',
     childrens: [{
       name: '无房预审码',
       path: '/NoHouse',
     }, {
       name: '普通预审码',
       path: '/Normal',
     }]
    }, {
      name: '身份证',
      childrens: [{
        name: '支付宝电子身份证(样式1)',
        path: '/AlipayIdCard',
      }, {
        name: '支付宝电子身份证(样式2)',
        path: '/AlipayIdCard',
      }]
    }];
    const goToPage = (path, name) => {
      router.push({
        path,
        query: {
          name,
        },
      });
    };
    return {
      activeName,
      menuData,
      goToPage,
    }
  },
}
</script>

<style lang="less" scoped>
:deep(.van-button){
  margin-bottom: 10px;
}
</style>
