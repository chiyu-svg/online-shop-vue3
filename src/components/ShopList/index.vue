<template>
    <span class="title"><b>{{ title }}</b></span>&nbsp;&nbsp; <slot :titleLogMessage="titleLogMessage"></slot>
    <div class="goodShop">
        <div class="shopDetail" v-for="item of dataList" :key="item.id">
            <img :src="item.path" :alt="item.description">
            <h3>{{ item.description }}</h3>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'ShopListCompoent',
    props: {
        dataList: {
            type: Object as PropType<any[]>,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        titleLogMessage: {
            type: String,
            Required: true
        }
    }
});
</script>
<style lang="less" scoped>
.title {
    font-size: larger;
}

.goodShop {
    margin-top: 20px;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .shopDetail {
        text-align: center;
        margin: 20px;
    }
}
</style>