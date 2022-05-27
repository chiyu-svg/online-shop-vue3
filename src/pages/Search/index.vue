<template>
  <div class="SearchComponent">
    <h2>Search</h2>
    <ShopAll />
    <div class="tradeMark">
      <h4 style="color: skyblue">品牌</h4>
      <ul class="markContainer">
        <li class="markList" v-for="item of search.SerchData.trademarkList" :key="item.tmId">{{ item.tmName }}</li>
      </ul>
    </div>
    <br>
    <div class="attrsList">
      <h4 style="color: orange">设备属性</h4>
      <div class="attrsContainer" v-for="item of search.SerchData.attrsList" :key="item.attrId">
        <br>
        <span><b>{{ item.attrName }}:</b></span>&nbsp;&nbsp;&nbsp;&nbsp;<span
          v-for="(subItem, index) of item.attrValueList" :key="index" style="color: grey">{{ subItem
          }}&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
    <br>
    <div class="goodList">
      <div class="good" v-for="item of search.SerchData.goodsList" :key="item.id">
        <img :src="item.defaultImg" alt="picture" />
        <p>{{ item.title }}</p>
        <h4>￥ {{ item.price }}</h4>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from '@/store'
import { ShopAll } from "@/components";
// 钩子函数获取 route 和 router
import { useRoute } from 'vue-router'
export default defineComponent({
  name: "SearchComponent",
  components: {
    ShopAll,
  },
  setup() {
    const { dispatch, state: { search } } = useStore();
    const searchParams = {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      categoryName: '',
      keyword: '',
      order: '',
      pageNo: 1,
      pageSize: 3,
      props: [],
      tradmark: ''
    }
    onMounted(() => {
      dispatch('getSearchData', searchParams);
    });
    // const getData = (params: any) => {

    // }
    return {
      search
    }
  }
});
</script>
<style lang="less" scoped>
.SearchComponent {
  .tradeMark {
    .markContainer {
      overflow: hidden;
      list-style: none;

      .markList {
        float: left;
        margin-left: 10px;
        color: orange;
      }
    }
  }

  .goodList {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .good {
      text-align: center;
      width: 260px;
      height: 400px;
      padding: 0px 20px;

      img {
        width: 300px;
        height: 300px;
      }
    }
  }

  .attrsList {
    .attrsContainer {
      margin-left: 40px;
    }
  }
}
</style>
