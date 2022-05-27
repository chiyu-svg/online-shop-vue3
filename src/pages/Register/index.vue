<template>
  <h2>Register</h2>
  <h3>{{ count }}</h3>
  <button @click="addCount">增加 count - 节流</button>
  <button @click="addCounts">增加 count - 防抖</button>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "RegisterComponent",
  setup() {
    const count = ref<number>(0);
    // 节流
    const addCount = (timeDate: number) => {
      let timeId = 0;
      return () => {
        if(timeId) return;
        timeId = setTimeout(() => {
          count.value++;
          timeId = 0;
        } , timeDate);
      }
    }
    // 防抖
    const addCounts = (timeData: number) => {
      let timeId = 0;
      return () => {
        if(timeId) {
          clearTimeout(timeId);
        }
        timeId = setTimeout(() => {
          count.value++;
          timeId = 0;
        }, timeData)
      }
    }
    return {
      count,
      addCount: addCount(500),
      addCounts: addCounts(500)
    };
  },
});
</script>
<style lang="less" scoped></style>
