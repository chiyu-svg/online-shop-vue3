<template>
    <div class="DetailComponent">
        <ShopAll />
        <ul class="bread" v-show="categoryId" @click="toSearchByCategory">
            <li :data-category1Id="category1.category1Id">{{ category1.category1Name }}/</li>
            <li :data-category2Id="category2.category2Id">{{ category2.category2Name }}/</li>
            <li :data-category3Id="category3.category3Id">{{ category3.category3Name }}</li>
        </ul>
        <div class="shopDetail">
            <!-- <Zoom /> -->
            <Zoom  v-if="detailData.skuInfo" :skuImage="detailData.skuInfo.skuDefaultImg" :ImageList="detailData.skuInfo.skuImageList"/>
            <ShopDetail v-if="detailData.skuInfo" :skuInfo="detailData.skuInfo" :spuSaleAttrList="detailData.spuSaleAttrList"/>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { ShopAll } from '@/components'
import ShopDetail from './ShopDetail.vue'
import Zoom from './Zoom.vue'
export default defineComponent({
    name: 'DetailComponent',
    components: {
        ShopAll,
        ShopDetail,
        Zoom
    },
    setup() {
        const { params: { shopId } } = useRoute();
        const router = useRouter();
        // 直接结构出来是不可以的，因为修改的详细数据是直接重新赋值
        const { dispatch, state: { detail } } = useStore();
        const detailData = computed(() => detail.detailData);
        const categoryId = computed(() => detailData.value?.categoryView?.id);
        const category1 = computed(() => {
            return {
                category1Id: detailData.value?.categoryView?.category1Id,
                category1Name: detailData.value?.categoryView?.category1Name
            }
        });
        const category2 = computed(() => {
            return {
                category2Id: detailData.value?.categoryView?.category2Id,
                category2Name: detailData.value?.categoryView?.category2Name
            }
        });
        const category3 = computed(() => {
            return {
                category3Id: detailData.value?.categoryView?.category3Id,
                category3Name: detailData.value?.categoryView?.category3Name
            }
        });
        const toSearchByCategory = (event: any) => {
            router.push({
                name: 'Search',
                query: {
                    category1id: event.target.dataset.category1id,
                    category2id: event.target.dataset.category2id,
                    category3id: event.target.dataset.category3id
                }
            })
        }
        onMounted(() => {
            dispatch('getShopDeatil', shopId)
        })
        return {
            shopId,
            detailData,
            categoryId,
            category1,
            category2,
            category3,
            toSearchByCategory
        }
    }
});
</script>
<style lang="less" scoped>
.DetailComponent {
    .bread {
        list-style: none;
        overflow: hidden;

        li {
            float: left;
            margin-left: 5px;
            font-size: 13px;
            background-color: rgb(248, 241, 241);
            padding: 3px 6px;
            border-radius: 3px;
            cursor: pointer;
        }
    }
    .shopDetail {
        display: flex;
    }
}
</style>