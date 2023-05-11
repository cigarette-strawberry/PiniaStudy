import { defineStore } from 'pinia'
/**
 * Store 是使用 defineStore() 定义的，并且它需要一个唯一名称，作为第一个参数传递
 * useStateStore 可以是 useUser、useCart 之类的任何东西
 * 第一个参数是应用程序中 store 的唯一 id
 * 这个 name，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools
 */
export const useStateStore = defineStore('state', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      count: 1,
      name: 'xiaowu',
      items: []
    }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  getters: {
    double: state => state.count * 2
  },
  actions: {
    test() {
      console.log('访问其他 store 操作')
    }
  }
})

// 函数式写法
/* export const useStateStore = defineStore('state', {
  state: () => ({ count: 0 })
}) */
