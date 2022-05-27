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
    context.commit("GETSEARCHDATA", result);
  },
};
const mutations = {
  GETSEARCHDATA(state: SearchImp, playPload: any) {
    state.SerchData = playPload;
  },
};
const getters = {
  attrsList(state: SearchImp) {
    return state.SerchData.attrsList ?? [];
  },
};

export default {state, actions, mutations, getters  };
