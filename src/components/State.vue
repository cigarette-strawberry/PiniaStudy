<script setup>
import { useStateStore } from '../stores/state'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const state = useStateStore()

/**
 * 请注意，store 是一个用reactive 包裹的对象，这意味着不需要在getter 之后写.value，但是，就像setup 中的props 一样，我们不能对其进行解构
 * ❌ 这不起作用，因为它会破坏响应式
 * 这和从 props 解构是一样的
 */
const { count } = state // ❌ count会一直是0

// 为了从 Store 中提取属性同时保持其响应式，您需要使用storeToRefs()。 它将为任何响应式属性创建 refs。 当您仅使用 store 中的状态但不调用任何操作时，这很有用
const { name } = storeToRefs(state)

/**
 * $reset()重置状态
 * 调用 store 上的 $reset() 方法将状态 重置 到其初始值
 */
// state.$reset()

/**
 * mapWritableState() 可修改状态
 * 如果您希望能够写入这些状态属性（例如，如果您有一个表单），您可以使用 mapWritableState() 代替。 请注意，您不能传递类似于 mapState() 的函数
 * 对于像数组这样的集合，您不需要 mapWritableState()，除非您用 cartItems = [] 替换整个数组，mapState() 仍然允许您调用集合上的方法。
 */

/**
 * $patch() 改变状态
 * 允许您使用部分“state”对象同时应用多个更改
 * 但是，使用这种语法应用某些突变非常困难或代价高昂：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合。 正因为如此，$patch 方法也接受一个函数来批量修改集合内部分对象的情况
 * 这里的主要区别是$patch() 允许您将批量更改的日志写入开发工具中的一个条目中。 注意两者，state 和 $patch() 的直接更改都出现在 devtools 中
 */
state.count++ // 第一种
state.$patch({ count: state.count + 1 }) // 第二种
state.$patch(state => {
  state.items.push({ name: 'xiaoyu' })
})

/**
 * $state 替换
 * 可以通过将其 $state 属性设置为新对象来替换 Store 的整个状态
 * 您还可以通过更改 pinia 实例的 state 来替换应用程序的整个状态
 */
state.$state = { flag: true }

/**
 * $subscribe() 订阅状态   state 里面的内容发生变化时 会触发
 * 可以通过 store 的 $subscribe() 方法查看状态及其变化，类似于 Vuex 的 subscribe 方法。 与常规的 watch() 相比，使用 $subscribe() 的优点是 subscriptions 只会在 patches 之后触发一次（例如，当使用上面的函数版本时）。
 */
state.$subscribe((mutation, state) => {
  console.log(mutation, state)
  // 每当它发生变化时，将整个状态持久化到本地存储
  localStorage.setItem('state', JSON.stringify(state))
})
// 默认情况下，state subscriptions 绑定到添加它们的组件（如果 store 位于组件的 setup() 中）。 意思是，当组件被卸载时，它们将被自动删除。 如果要在卸载组件后保留它们，请将 { detached: true } 作为第二个参数传递给 detach 当前组件的 state subscription
// 此订阅将在组件卸载后保留
state.$subscribe(callback, { detached: true })
function callback() {
  console.log(111)
}

watch(
  state,
  state => {
    // 每当它发生变化时，将整个状态持久化到本地存储
    localStorage.setItem('stateState', JSON.stringify(state))
  },
  { deep: true }
)

defineProps({
  msg: String
})
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>{{ name }}</h2>
  <h3>{{ count }}</h3>
  <h4>{{ state.count }}</h4>
</template>

<style scoped></style>
