<template>
  <div class="SearchComponent">
    <h2>Search</h2>
    <ShopAll />
    <div class="breakTitle">
      <ul class="label">
        <li class="title">全部结果</li>
        <li v-if="searchParams.categoryName">{{ searchParams.categoryName }} <span class="span"
            @click="removeQuery">x</span></li>
        <li v-if="searchParams.keyword">{{ searchParams.keyword }} <span class="span" @click="removeParams">x</span>
        </li>
        <li v-for="(item, index) of searchParams.props" :key="index"> {{ item.split(':')[1] }} <span class="span" @click="removeProps(index)">x</span>
        </li>
      </ul>
    </div>
    <div class="tradeMark">
      <h4 style="color: skyblue">品牌</h4>
      <ul class="markContainer" @click="sendTramark">
        <li class="markList" v-for="item of getters.trademarkList" :key="item.tmId" :data-value="item.tmName">
          {{ item.tmName }}</li>
      </ul>
    </div>
    <br>
    <div class="attrsList">
      <h4 style="color: orange">设备属性</h4>
      <div class="attrsContainer" v-for="item of getters.attrsList" :key="item.attrId">
        <br>
        <span><b>{{ item.attrName }}:</b></span>&nbsp;&nbsp;&nbsp;&nbsp;<span
          @click="sendProps([item.attrId, subItem, item.attrName])" v-for="(subItem, index) of item.attrValueList"
          :key="index" style="color: grey; cursor: pointer;">{{ subItem
          }}&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="order">
      <ul>
        <li style="cursor: pointer;" :class="{active: isActive}" @click="changeOrder('1')">综合<span v-show="isActive" class="iconfont" :class="{'icon-long-arrow-up': isArrowUp, 'icon-long-arrow-down': !isArrowUp}"></span></li>
        <li style="cursor: pointer;" :class="{active: !isActive}" @click="changeOrder('2')">价格<span v-show="!isActive" class="iconfont" :class="{'icon-long-arrow-up': isArrowUp, 'icon-long-arrow-down': !isArrowUp}"></span></li>
      </ul>
    </div>
    <br>
    <div class="goodList">
      <div class="good" v-for="item of getters.goodsList" :key="item.id">
        <img :src="item.defaultImg" alt="picture" style="cursor: pointer;" @click="getShopDetails(item.id)"/>
        <p>{{ item.title }}</p>
        <h4>￥ {{ item.price }}</h4>
      </div>
    </div>
    <br>
    <PageDevice @changeIndex="changeIndex" v-if="searchData.pageNo && searchData.pageSize && searchData.total" :pageNo="searchData.pageNo" :pageSize="searchData.pageSize" :total="searchData.total" :continues="5"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, reactive, inject, computed, toRefs } from "vue";
import { useStore } from '@/store'
import { ShopAll, PageDevice  } from "@/components";
// 钩子函数获取 route 和 router
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: "SearchComponent",
  components: {
    ShopAll,
    PageDevice
  },
  setup() {
    const { dispatch, state: { search }, getters } = useStore();
    const searchData = computed(() => search.SerchData);
    const route = useRoute();
    const router = useRouter();
    const appState: any = inject('appState');
    const searchParams = reactive<any>({
      category1Id: '',
      category2Id: '',
      category3Id: '',
      categoryName: '',
      keyword: '',
      order: '1:asc',
      pageNo: 1,
      pageSize: 10,
      props: [],
      tradmark: ''
    });
    const getDate = (params = {}) => {
      dispatch('getSearchData', params);
    }
    const removeQuery = () => {
      router.replace({
        name: 'Search',
        params: route.params
      })
    }
    const removeParams = () => {
      appState.clearInput();
      router.replace({
        name: 'Search',
        query: route.query
      })
    }
    const sendTramark = (event: any) => {
      searchParams.tradmark = event.target.dataset.value;
    }
    const sendProps = (propsValue: [string, string, string]) => {
      const newProps = propsValue.join(':');
      if (searchParams.props.includes(newProps)) {
        return;
      }
      searchParams.props.push(newProps);
    }
    const removeProps = (index: number) => {
      searchParams.props.splice(index, 1);
    }
    const changeOrder = (flag: string) => {
      const sourceFlag = searchParams.order.split(':')[0];
      const sourceOrder = searchParams.order.split(':')[1];
      if(sourceFlag === flag){
        searchParams.order = `${flag}:${sourceOrder === 'asc'?'desc':'asc'}`;
      }else{
         searchParams.order = `${flag}:${sourceOrder}`;
      }
    
    }
    const changeIndex = (index: number) => {
      searchParams.pageNo = index;
    }
    const getShopDetails = (shopId: number) => {
      router.push({
        name: "Detail",
        params: {
          shopId
        }
      })
    }
    const isActive = computed<boolean>(() => searchParams.order.includes("1"));
    const isArrowUp = computed<boolean>(() => searchParams.order.includes("asc"));
    watch([() => route.query, () => route.params], (newValue) => {
      const [query, params] = newValue;
      searchParams.category1Id = query.shopId;
      searchParams.category2Id = query.category2Id;
      searchParams.category3Id = query.category3Id;
      searchParams.categoryName = query.shopName;
      searchParams.keyword = params.shopKey;
    }, { immediate: true })
    watch(searchParams, (newValue) => {
      if (route.path.includes('/Search')) {
        getDate(newValue);
      }
    }, { immediate: true })
    return {
      searchParams,
      searchData,
      isActive,
      isArrowUp,
      getters,
      removeQuery,
      removeParams,
      sendTramark,
      sendProps,
      removeProps,
      changeOrder,
      changeIndex,
      getShopDetails
    }
  }
});
</script>
<style lang="less" scoped>
.SearchComponent {
  .breakTitle {
    margin-top: 10px;

    .label {
      list-style: none;
      overflow: hidden;
      margin: 0px;
      padding: 0px;

      li {
        float: left;
        display: block;
        margin-left: 10px;
        color: rgb(67, 67, 67);
        font-size: 12px;
        background-color: rgb(236, 230, 230);
        padding: 3px 5px;

        .span:hover {
          cursor: pointer;
        }
      }

      .title {
        color: black;
        font-weight: 700;
        font-size: 14px;
        background-color: white;
      }
    }

  }

  .tradeMark {
    .markContainer {
      overflow: hidden;
      list-style: none;

      .markList {
        float: left;
        margin-left: 10px;
        color: orange;
        cursor: pointer;
      }
    }
  }

  .goodList {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    margin-bottom: 20px;

    .good {
      text-align: center;
      width: 260px;
      height: 400px;
      padding: 0px 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
  .order {
    ul {
      list-style: none;
      padding: 0px;
      overflow: hidden;
      margin-left: 30px;
      li {
        float: left;
        padding: 3px 15px;
      }
      .active {
        background-color: rgb(243, 197, 112);
      }
    }
    
  }
}
</style>
