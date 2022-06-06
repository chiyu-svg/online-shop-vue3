<template>
    <div>
        <button @click="$emit('changeIndex', pageNo-1)" :disabled="pageNo === 1">上一页</button>
        <button v-show="1 < startAndEnd.start" @click="$emit('changeIndex', 1)" :class="{active: pageNo===1}">1</button>
        <button v-show="startAndEnd.start > 2">...</button>
        <button  v-for="(item, index) of startAndEnd.end" :key="index" v-show="item>=startAndEnd.start" @click="$emit('changeIndex', item)" :class="{active: pageNo === item}">{{ item }}</button>
        <button v-show="totalPage > startAndEnd.end + 1">...</button>
        <button v-show="totalPage > startAndEnd.end" @click="$emit('changeIndex', totalPage)" :class="{active: pageNo === totalPage}">{{ totalPage }}</button>
        <button @click="$emit('changeIndex', pageNo+1)" :disabled="pageNo === totalPage">下一页</button>
        <button>全部 {{ total }} 条</button>
        <input type="text" placeholder="跳转" style="width: 30px; margin-left: 10px;" v-model.number="pageIndex" @keyup.enter="jumpPage" > 页
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs, ref } from 'vue';
export default defineComponent({
    name: 'PageDevice',
    props: {
        pageNo: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
         total: {
            type: Number,
            required: true
        },
        continues: {
            type: Number,
            required: true
        }
    },
    setup(props, context){
        // 直接结构会丧失响应
        const { pageNo, continues, total, pageSize } = toRefs(props);
        const { emit } = context;
        const pageIndex = ref<number>();
        const totalPage = computed(() => {
            const totalPage = Math.floor(total.value/pageSize.value);
            if(total.value % pageSize.value){
                return totalPage + 1;
            }else {
                return totalPage;
            }
        })
        const startAndEnd = computed(() => {
            const pageCount =  Math.floor(continues.value/2);
            const totalPageCount = totalPage.value;
            let start = pageNo.value - pageCount;
            let end = pageNo.value + pageCount;
            if(start < 1){
                end = end + (1 - start);
                start = 1;
            }
            if(end > totalPageCount ){
                end = totalPageCount;
            }
            return {start, end }
        })
        const jumpPage = () => {
            if(pageIndex.value && (pageIndex.value > totalPage.value || pageIndex.value < 1)){
                return;
            }
            emit('changeIndex', pageIndex.value);
        }
        return {
            startAndEnd,
            totalPage,
            pageIndex,
            jumpPage
        }
    }
});
</script>
<style lang="less" scoped>
    button {
         margin-left: 5px;
         border: none;
         border-radius: 3px;
         background-color: rgb(227, 218, 218);
         padding: 3px 10px;
    }
    .active {
        background-color: orange;
    }
</style>