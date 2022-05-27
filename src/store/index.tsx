import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import home, { homeImp } from './Home'
import search, { SearchImp } from './Search'
import login, { LoginImp } from './Login'

interface stateImp {
    home: homeImp,
    search: SearchImp,
    login: LoginImp
}

export const key: InjectionKey<Store<stateImp>> = Symbol()

const store = createStore<stateImp>({
    modules: {
        home,
        search,
        login
    }
})

// 注意这里只是使用相当于 inject
export const useStore = () => baseUseStore(key);

export default store;