<template>
  <div class="ShopAllComponent">
    <button
      class="shopAll"
      @mouseenter="showAllShop"
      @mouseleave="hiddenAllShop"
    >
      全部商品
    </button>
    <div
      class="homeThem"
      v-show="isPageHome?true:isShopAllShow"
      @mouseenter="showAllShop"
      @mouseleave="hiddenAllShop"
    >
      <h3>全部商品</h3>
      <div
        v-for="(item, index) of home.homeThem"
        :key="item.id"
        @click="toSearch"
      >
        <div @mouseleave="restoreCurrentIndex">
          <h2
            :class="{ cur: currentIndex === index }"
            @mouseenter="setCurrentIndex(index)"
            :data-dataName="item.name"
            :data-dataId="item.id"
          >
            {{ item.name }}
          </h2>
          <div
            v-show="index === currentIndex"
            v-for="childItem of item.childThem"
            :key="childItem.id"
          >
            <h4 :data-dataName="childItem.name" :data-dataId="childItem.id">
              {{ childItem.name }}
            </h4>
            <a
              v-for="somItem of childItem.sonThem"
              :key="somItem.id"
              :data-dataName="somItem.name"
              :data-dataId="somItem.id"
              >{{ somItem.name }} &nbsp; &nbsp;</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { throttle } from "lodash";
export default defineComponent({
  name: "ShopAllComponent",
  setup() {
    const {
      state: { home },
    } = useStore();
    const router = useRouter();
    const route = useRoute();
    const isShopAllShow = ref<boolean>(false);
    const currentIndex = ref<number>(-1);
    const isPageHome = ref<boolean>(false);
    onMounted(() => {
      if(route.path === '/'){
        isPageHome.value = true;
      }
    });
    const toSearch = (event: any) => {
      if (event.target.dataset.dataname) {
        if (event.target.dataset.dataid) {
          router.push({
            name: "Search",
            query: {
              shopName: event.target.dataset.dataname,
              shopId: event.target.dataset.dataid,
            },
            params: route.params ?? null
          });
        }
      }
    };
    const restoreCurrentIndex = () => {
      currentIndex.value = -1;
    };
    const setCurrentIndex = throttle((index: number) => {
      currentIndex.value = index;
    }, 50);
    const showAllShop = () => {
      isShopAllShow.value = true;
    };
    const hiddenAllShop = () => {
      isShopAllShow.value = false;
    };
    return {
      home,
      isShopAllShow,
      currentIndex,
      setCurrentIndex,
      isPageHome,
      toSearch,
      showAllShop,
      hiddenAllShop,
      restoreCurrentIndex,
     
    };
  },
});
</script>
<style lang="less" scoped>
.ShopAllComponent {
  .shopAll {
    background-color: skyblue;
    padding: 5px 20px;
    border: 1px solid skyblue;
    border-radius: 5px;
  }

  .homeThem {
    border: 1px solid rgb(200, 198, 198);
    padding: 10px 5px;
    height: 320px;
    width: fit-content;

    .cur {
      background-color: skyblue;
      width: fit-content;
      padding: 3px 5px;
    }
  }
}
</style>
