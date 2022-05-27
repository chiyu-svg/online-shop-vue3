import { getThemHom, getHomeBanner, getHomeGoodShop, getHomeGuessLike } from '@/api/Home'
export interface homeImp {
    homeThem: Array<any>,
    homeBanner: Array<any>,
    goodShop: Array<any>,
    guessLike: Array<any>
}

const state: homeImp = {
    homeThem: [],
    homeBanner: [],
    goodShop: [],
    guessLike: []
}
const actions = {
    async getThemHome(context: any){
        const result = await getThemHom();
        context.commit('GETTHEMHOME', result);
    },
    async getHomeBanner(context: any){
        const result = await getHomeBanner();
        context.commit('EGTHOMEBANNER', result);
    },
    async getHomeGoodShop(context: any){
        const result = await getHomeGoodShop();
        context.commit('GETHOMEGOODSHOP', result);
    },
    async getHomeGuessLike(context: any){
        const result = await getHomeGuessLike();
        context.commit('GETHOMEGUESSLIKE', result);
    }
}
const mutations = {
    GETTHEMHOME(state: homeImp, playPlod: Array<any>){
        state.homeThem = playPlod;
    },
    EGTHOMEBANNER(state: homeImp, playPlod: Array<any>){
        state.homeBanner = playPlod;
    },
    GETHOMEGOODSHOP(state: homeImp, playPlod: Array<any>){
        state.goodShop = playPlod;
    },
    GETHOMEGUESSLIKE(state: homeImp, playPlod: Array<any>){
        state.guessLike = playPlod;
    }
}

export default {
    state,
    actions,
    mutations
}