<template>
    <h2>Login 组件</h2>
    <p>{{ getCount }}</p>
</template>
<script lang="ts">
import { defineComponent, watch, toRefs} from "vue";
import { useStore } from '@/store'
export default defineComponent({
  name: "LoginComponent",
  setup(){
    const { getters } = useStore();
    console.log(getters.getCount);
    watch(() => getters.getCount, (newValue) => {
      console.log('newValue',newValue);
    })
    return {
      ...toRefs(getters)
    }
  }
});
</script>
<style lang="less" scoped></style>
