export interface LoginImp {
    count: number
}

const state: LoginImp = {
    count: 0
}
const actions = {
    
}
const mutations = {
    
}
const getters = {
    getCount(state: LoginImp){
        return state.count+10
    }
}

export default { state, actions, mutations, getters }
