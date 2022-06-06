import { getShopDetail, addToShopCar } from '@/api/Detail'
import { truncate } from 'lodash';

export interface DetailImp {
  detailData: { [key: string]: any };
}

const state: DetailImp = {
    detailData: {}
}
const actions =  {
    async getShopDeatil(context: any, skuId: number){
        const shopDetail = await getShopDetail(skuId);
        context.commit('SHOPDETAIL', shopDetail.data);
    },
    async addToShopCar(context: any, shopDetail: {[key: string]: any}){
        const result: any = await addToShopCar(shopDetail.skuId, shopDetail.skuNumber);
        if(result.code === 200){
            return true
        }else{
            return Promise.reject(new Error('出现异常'))
        }
        
    }
}
const mutations = {
    SHOPDETAIL(state: DetailImp, playPload: any){
        state.detailData = playPload;
    }
}
const getters = {
    category1(state: DetailImp){
        return {
            category1Id:  state.detailData.categoryView.category1Id,
            category1Name: state.detailData.categoryView.category1Name
        }
    },
    category2(state: DetailImp){
        return {
            category1Id:  state.detailData.categoryView.category2Id,
            category1Name: state.detailData.categoryView.category2Name
        }
    },
    category3(state: DetailImp){
        return {
            category1Id:  state.detailData.categoryView.category3Id,
            category1Name: state.detailData.categoryView.category3Name
        }
    }
}

export default { state, actions, mutations, getters }