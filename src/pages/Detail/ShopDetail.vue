<template>
    <div class="shopAttrDetail">
        <p class="skuName"><b>{{ skuInfo.skuName }}</b></p>
        <p class="skuDesc">{{ skuInfo.skuDesc }}</p>
        <div class="price">
            <p><span class="priceTitle"><b>价 格：</b></span><span class="priceSymbol">￥</span><span class="priceNum">{{
                    skuInfo.price
            }}</span> <span class="priceInfor" style="color: red; font-size: 14px;">降价通知</span>
            </p>
        </div>
        <ul style="list-style: none; padding: 0px;">
            <li v-for="item of skuInfo.skuAttrValueList" :key="item.id"><span style="font-size: 14px;"><b>{{
                    item.attrName
            }}</b></span>: <span style="font-size: 14px; color: grey;">{{ item.valueName
}}</span></li>
        </ul>
        <ul style="list-style: none; padding: 0px;">
            <li v-for="item of spuSaleAttrList" :key="item.id">
                <span style="font-size: 14px;"><b>{{ item.saleAttrName }}</b></span>:
                <span v-for="subAttr of item.spuSaleAttrValueList" :key="subAttr.id"
                    style="font-size: 12px; display: inline-block; margin-right: 10px; padding: 3px 8px; cursor: pointer; background-color: antiquewhite; border-radius: 2px; box-shadow: 1px 1px 1px black;">{{
                            subAttr.saleAttrValueName
                    }}</span>
            </li>
        </ul>
        <div>
            <input type="text" style="width: 30px;" v-model="shopNum" @blur="upDateNum"><button
                @click="shopNum++">+</button><button @click="shopNum--">-</button> <button
                style="background-color: red; color: white; border: 0px; padding: 10px 10px; border-radius: 4px;"
                @click="addToCaSuccees()">加入购物车</button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
    name: 'ShopDetail',
    props: ['skuInfo', 'spuSaleAttrList'],
    setup(props) {
        const router = useRouter();
        const shopNum = ref<number>(1);
        const { skuInfo } = toRefs(props);
        const { dispatch } = useStore();
        const upDateNum = () => {
            const factShopNum = shopNum.value * 1;
            if (isNaN(factShopNum)) {
                shopNum.value = 1;
            }
            shopNum.value = Math.floor(factShopNum);
        }
        const addToCaSuccees = async () => {
            // 如果 Promise 返回一个 reject, 在 try...catch 是可以捕获异常的
            try {
                await dispatch('addToShopCar', { skuId: skuInfo.value.spuId, skuNumber: shopNum.value });
                sessionStorage.setItem('skuInfo', JSON.stringify(skuInfo.value));
                router.push({
                    name: 'CarSuccess',
                    query: {
                        ByNum: shopNum.value
                    }
                })
            } catch (error: any) {
                console.log(error.message)
            }
        }
        watch(shopNum, (newValue) => {
            if (newValue <= 0) {
                shopNum.value = 1;
            }
        })
        return {
            shopNum,
            upDateNum,
            addToCaSuccees
        }
    }
});
</script>
<style lang="less" scoped>
.shopAttrDetail {
    width: 60%;

    .skuName {
        font-size: 13px;
    }

    .skuDesc {
        color: red;
        font-size: 14px;
    }

    .price {
        padding: 20px 5px;
        background-color: rgba(234, 144, 144, 0.4);

        .priceTitle {
            font-size: 14px;
        }

        .priceSymbol {
            color: red;
            font-size: 14px;
        }

        .priceNum {
            color: red;
            font-size: 18px;
        }

        .priceInfor {
            color: red;
            font-size: 14px;
        }
    }
}
</style>