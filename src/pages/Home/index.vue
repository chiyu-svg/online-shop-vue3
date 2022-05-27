<template>
  <div class="homeComponent">
    <div class="header">
      <ShopAll />
      <swiper :slides-per-view="1" :loop="true" :navigation="true" :pagination="{
        clickable: true,
      }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="item of home.homeBanner" :key="item.id">
          <img :src="item.path" />
        </swiper-slide>
      </swiper>
    </div>
    <br>
    <ShopList title="有好活" titleLogMessage="全民口碑" :dataList="home.goodShop">
      <template #default="propsItem">
        <span class="titleLog">{{ propsItem.titleLogMessage }}</span>
      </template>
    </ShopList>
    <br>
    <ShopList title="猜你喜欢" titleLogMessage="个性推荐" :dataList="home.guessLike">
      <template #default="propsItem">
        <span class="titleLogGuess">{{ propsItem.titleLogMessage }}</span>
      </template>
    </ShopList>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { ShopAll, ShopList } from "@/components";
import { useStore } from "@/store";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
export default defineComponent({
  name: "HomeComponent",
  components: {
    ShopAll,
    Swiper,
    SwiperSlide,
    ShopList
  },
  setup() {
    const {
      dispatch,
      // home 是 proxy 对象
      state: {
        home
      },
    } = useStore();
    const currentTest = reactive<any>([]);
    onMounted(() => {
      dispatch("getHomeBanner");
      dispatch("getHomeGoodShop");
      dispatch("getHomeGuessLike");
    });
    return {
      modules: [Navigation, Pagination],
      currentTest,
      home
    };
  },
});
</script>
<style lang="less" scoped>
.homeComponent {
  .header {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;

    .mySwiper {
      height: 372.5px;
      width: 700px;
      margin-left: 10px !important;

      img {
        height: 372.5px;
        width: 700px;
      }
    }
  }

  .titleLog {
    display: inline-block;
    border: 1px solid skyblue;
    background: skyblue;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: smaller;
    color: white;
  }

  .titleLogGuess {
    display: inline-block;
    border: 1px solid rgb(238, 187, 67);
    background: rgb(238, 187, 67);
    border-radius: 5px;
    padding: 5px 10px;
    font-size: smaller;
    color: white;
  }

}
</style>
