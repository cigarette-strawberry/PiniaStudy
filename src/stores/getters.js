import { defineStore } from 'pinia'
import { useStateStore } from './state'

/**
 * Getter 完全等同于 Store 状态的 计算值。 它们可以用 defineStore() 中的 getters 属性定义。 他们接收“状态”作为第一个参数以鼓励箭头函数的使用
 * 大多数时候，getter 只会依赖状态，但是，他们可能需要使用其他 getter。 正因为如此，我们可以在定义常规函数时通过 this 访问到 整个 store 的实例， 但是需要定义返回类型（在 TypeScript 中）。 这是由于 TypeScript 中的一个已知限制，并且不会影响使用箭头函数定义的 getter，也不会影响不使用 this 的 getter
 */
export const useGettersStore = defineStore('getters', {
  state: () => ({
    counter: 1,
    users: [
      {
        id: 2,
        name: 'xiaowu ',
        active: true
      }
    ]
  }),
  getters: {
    // 类型是自动推断的，因为我们没有使用 `this`
    // doubleCount: state => state.counter * 2,

    // 自动将返回类型推断为数字
    doubleCount(state) {
      return state.counter * 2
    },

    /**
     * 访问其他 getter
     * 与计算属性一样，您可以组合多个 getter。 通过 this 访问任何其他 getter。 即使您不使用 TypeScript，您也可以使用 JSDoc 提示您的 IDE 类型
     */
    doubleCountPlusOne() {
      // 自动完成 ✨
      return this.doubleCount + 1
    },

    /**
     * 将参数传递给 getter
     * Getters 只是幕后的 computed 属性，因此无法向它们传递任何参数。 但是，您可以从 getter 返回一个函数以接受任何参数
     * 请注意，在执行此操作时，getter 不再缓存，它们只是您调用的函数。 但是，您可以在 getter 本身内部缓存一些结果，这并不常见，但应该证明性能更高
     */
    getUserById: state => {
      return userId =>
        state.users.find(user => {
          return user.id === userId
        })
    },
    getActiveUserById(state) {
      const activeUsers = state.users.filter(user => user.active)
      return userId => activeUsers.find(user => user.id === userId)
    },

    /**
     * 访问其他 Store 的getter
     * 要使用其他存储 getter，您可以直接在 better 内部使用它
     */
    otherGetter(state) {
      const otherStore = useStateStore()
      return state.counter + otherStore.double
    }
  }
})
