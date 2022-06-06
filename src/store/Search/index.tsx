import { getSearchData } from "@/api/Search";

export interface SearchImp {
  SerchData: { [key: string]: any };
}

const state: SearchImp = {
  SerchData: {},
};
const actions = {
  async getSearchData(context: any, params: { [key: string]: any } = {}) {
    const result = await getSearchData(params);
    context.commit("GETSEARCHDATA", result.data);
  },
};
const mutations = {
  GETSEARCHDATA(state: SearchImp, playPload: any) {
    state.SerchData = playPload ?? {};
  },
};
const getters = {
  attrsList(state: SearchImp) {
    return state.SerchData.attrsList ?? [];
  },
  trademarkList(state: SearchImp) {
    return state.SerchData.trademarkList ?? [];
  },
  goodsList(state: SearchImp) {
    return state.SerchData.goodsList ?? [];
  }
};

export default {state, actions, mutations, getters  };
