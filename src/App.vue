<template>
  <router-link to="/">Home</router-link>
  <router-link to="/Login">Login</router-link>
  <router-link to="/Register">Register</router-link>
  <router-link to="/Search">Search</router-link>
  <hr />
  <Header></Header>
  <router-view></router-view>
  <Footer v-if="meta.showFooter"></Footer>
</template>
<script lang="ts">
import { defineComponent, toRefs, onMounted, provide, onBeforeMount } from "vue";
import { Header, Footer } from "./components";
import { useRoute } from "vue-router";
import { useStore } from './store'
export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();
    const { dispatch } = useStore();
    onBeforeMount(() => {
      provide("appState", {});
    })
    onMounted(() => {
      dispatch("getThemHome");
    });
    return {
      ...toRefs(route),
    };
  },
});
</script>

<style lang="less" scoped>
</style>
