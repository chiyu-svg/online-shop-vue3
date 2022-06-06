<template>
    <div class="successToCar">
        <h3 class="addTitle">添加成功</h3>
        <div class="shopContainer">
            <div class="contentImg">
                <img :src="shopInfor.skuDefaultImg" />
            </div>
            <div>
                <p>商品名称：{{ shopInfor.skuName }}</p>
                <p>商品价格: <span style="color: red;">￥{{ shopInfor.price }}</span></p>
                <p>购买个数: <span style="color: red;">x{{ query.ByNum }}</span> 个</p>
                <button @click="goBack">返回详情页</button> <button @click="toShopCar">查看购物车</button>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    name: 'CarSuccess',
    setup() {
        const { query } = useRoute();
        const router = useRouter();
        const shopInfor = JSON.parse(sessionStorage.getItem('skuInfo') ?? '');
        const toShopCar = () => {
            router.push('/ShopCar')
        }
        const goBack = () => {
            router.go(-1);
        }
        return {
            query,
            shopInfor,
            toShopCar,
            goBack
        }
    }
});
</script>
<style lang="less" scoped>
.successToCar {
    width: 100%;

    .addTitle {
        color: green;
    }

    .shopContainer {
        width: 60%;
        justify-content: space-between;
        display: flex;

        .contentImg {
            width: 40%;

            img {
                width: 100%;
            }
        }
    }
}
</style>