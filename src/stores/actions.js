import { defineStore } from 'pinia'
import { useStateStore } from './state'

/**
 * Actions 相当于组件中的 methods。 它们可以使用 defineStore() 中的 actions 属性定义，并且它们非常适合定义业务逻辑
 * 与 getters 一样，操作可以通过 this 访问 whole store instance 并提供完整类型（和自动完成✨）支持。 与它们不同，actions 可以是异步的，您可以在其中await 任何 API 调用甚至其他操作！ 这是使用 Mande 的示例。 请注意，只要您获得“Promise”，您使用的库并不重要，您甚至可以使用浏览器的“fetch”函数
 * 你也可以完全自由地设置你想要的任何参数并返回任何东西。 调用 Action 时，一切都会自动推断！
 */
export const useActionsStore = defineStore('actions', {
  state: () => ({
    counter: 1
  }),
  actions: {
    increment() {
      this.counter++
      // return Promise.resolve('这是onAction返回的值')
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
    visitActions() {
      const otherStore = useStateStore()
      otherStore.test()
    }
  }
})
