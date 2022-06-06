<template>
    <div class="zoomComponent">
        <div class="shopContainer">
            <div class="event" @mousemove="moveZoom($event)" @mouseenter="isShowZoom=true" @mouseleave="isShowZoom=false"></div>
            <img class="shopImg" :src="showImgSrc" />
            <div v-if="isShowZoom" class="zoom" ref="zoomRef"></div>
            <!-- 注意这个用法 -->
            <div v-if="isShowZoom" class="showZoom">
                <div class="subZoom"> <img ref="zoomImg" class="showZommImg" :src="showImgSrc" /></div>
            </div>
        </div>
        <swiper :slidesPerView="3" :spaceBetween="30" :freeMode="true" :pagination="{
            clickable: true,
        }" :modules="modules" class="mySwiper">
            <swiper-slide v-for="item of ImageList" :key="item.id"><img @click="changeImagSrc(item.imgUrl)"
                    :src="item.imgUrl" /></swiper-slide>
        </swiper>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
export default defineComponent({
    name: 'ZoomComponent',
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        skuImage: {
            type: String,
            require: true
        },
        ImageList: {
            type: Object as PropType<any[]>
        }

    },
    setup(props) {
        const srcImg = ref('');
        const zoomRef = ref();
        const zoomImg = ref();
        const isShowZoom = ref<boolean>(false);
        const showImgSrc = computed(() => {
            if (srcImg.value) {
                return srcImg.value;
            } else {
                return props.skuImage
            }
        })
        const changeImagSrc = (src: string) => {
            srcImg.value = src;
        }
        const moveZoom = (event: any) => {
            // 取到对象本身的宽度
            let left = event.offsetX - zoomRef.value.offsetWidth / 2;
            let top = event.offsetY - zoomRef.value.offsetHeight / 2;
            if (left <= 0) {
                left = 0;
            }
            if (left >= zoomRef.value.offsetWidth) {
                left = zoomRef.value.offsetWidth;
            }
            if (top <= 0) {
                top = 0;
            }
            if (top >= zoomRef.value.offsetHeight) {
                top = zoomRef.value.offsetHeight;
            }

            zoomRef.value.style.left = left + 'px';
            zoomRef.value.style.top = top + 'px';
            zoomImg.value.style.left = -(2*left) + 'px';
            zoomImg.value.style.top = -(2*top) + 'px';
        }
        return {
            modules: [FreeMode, Pagination],
            showImgSrc,
            zoomRef,
            isShowZoom,
            zoomImg,
            changeImagSrc,
            moveZoom
        };
    },
});
</script>
<style lang="less" scoped>
.zoomComponent {
    margin-right: 50px;
    .shopContainer {
        width: 400px;
        height: 600px;
        position: relative;

        .event {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 10;
            background-color: none;
        }

        .zoom {
            position: absolute;
            width: 200px;
            height: 300px;
            background-color: rgba(4, 126, 4, 0.3);
            z-index: 1;
        }

        .showZoom {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 400px;
            overflow: hidden;

            .subZoom {
                position: relative;
                width: 100%;
                height: 100%;

                .showZommImg {
                    position: absolute;
                    width: 200%;
                    height: 200%;
                }
            }

        }

        .shopImg {
            width: 100%;
            height: 100%;
            z-index: 1;
        }
    }

    .mySwiper {
        height: 170px;
        width: 400px;

        img {
            height: 40px;
            width: 50px;
        }
    }
}
</style>