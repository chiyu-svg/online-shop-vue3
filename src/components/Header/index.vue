<template>
  <div class="HeaderComponent">
    <img src="./images/OIP-C.jpg" alt="头像" class="header" />
    <label for="search">Search</label>
    <input
      type="text"
      id="search"
      v-model.trim="searchKey"
      @keyup.enter="startSearch"
      ref="refInput"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, inject} from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const searchKey = ref<string>("");
    const refInput = ref<any>();
    const appState: any = inject('appState');
    const startSearch = (): void => {
      // if(searchKey.value){
      router.push({
        name: "Search",
        params: {
          shopKey: searchKey.value,
        },
        query: route.query ?? null
      });
      // }
    };
    const clearInput = () => {
      searchKey.value = '';
    }
    onMounted(() => {
      refInput.value?.focus();
      appState.clearInput = clearInput;
    })
    return {
      searchKey,
      startSearch,
      refInput
    };
  },
});
</script>
<style lang="less" scoped>
.HeaderComponent {
  .header {
    width: 40px;
    height: 40px;
    border: 2px solid black;
    box-shadow: 0px 0px 10px rgb(94, 93, 93);
    border-radius: 50%;
  }
}
</style>
