import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import home, { homeImp } from './Home'
import search, { SearchImp } from './Search'
import login, { LoginImp } from './Login'
import detail, { DetailImp } from './Detail'


interface stateImp {
    home: homeImp,
    search: SearchImp,
    login: LoginImp,
    detail: DetailImp
}

export const key: InjectionKey<Store<stateImp>> = Symbol()

const store = createStore<stateImp>({
    modules: {
        home,
        search,
        login,
        detail
    }
})

// 注意这里只是使用相当于 inject
export const useStore = () => baseUseStore(key);

export default store;