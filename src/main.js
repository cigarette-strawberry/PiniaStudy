import { createApp, ref, toRef, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { myPiniaPlugin } from './stores/myPiniaPlugin'
import './style.css'
import App from './App.vue'

// createApp(App).use(createPinia().use(myPiniaPlugin)).mount('#app')

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// pinia.use(myPiniaPlugin)

// 您可以通过简单地在插件中返回它们的对象来为每个 store 添加属性
// pinia.use(() => ({ hello: 'world' }))

/**
 * 您也可以直接在 store 上设置属性，但如果可能，请使用返回版本，以便 devtools 可以自动跟踪它们
 * 插件的任何属性 returned 都会被devtools自动跟踪，所以为了让hello在devtools中可见，如果你想调试它，请确保将它添加到store._customProperties仅在开发模式 开发工具
 */
/* pinia.use(({ store }) => {
  store.hello = 'world'
  // 确保您的打包器可以处理这个问题。 webpack 和 vite 应该默认这样做
  if (process.env.NODE_ENV === 'development') {
    // 添加您在 store 中设置的任何 keys
    store._customProperties.add('hello')
  }
}) */

/**
 * 请注意，每个 store 都使用 reactive 包装，自动展开任何 Ref (ref(), computed() ， ...）
 * 这就是为什么您可以在没有 .value 的情况下访问所有计算属性以及它们是响应式的原因
 */
/* const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // 每个 store 都有自己的 `hello` 属性
  store.hello = ref('secret')
  // 它会自动展开
  store.hello // 'secret'
  //   console.log(store.hello)

  // 所有 store 都共享 value `shared` 属性
  store.shared = sharedRef
  store.shared // 'shared'
  //   console.log(store.shared)
}) */

/**
 * 添加新状态
 * 如果您想将新的状态属性添加到 store 或打算在 hydration 中使用的属性，您必须在两个地方添加它
 * • 在 store 上，因此您可以使用 store.myState 访问它
 * • 在 store.$state 上，因此它可以在 devtools 中使用，并且在 SSR 期间被序列化
 * 请注意，这允许您共享 ref 或 computed 属性
 * 请注意，插件中发生的状态更改或添加（包括调用store.$patch()）发生在存储处于活动状态之前，因此不会触发任何订阅
 */
/* const globalSecret = ref('secret')
pinia.use(({ store }) => {
  // `secret` 在所有 store 之间共享
  store.$state.secret = globalSecret
  store.secret = globalSecret
  // 它会自动展开
  store.secret // 'secret'
  //   console.log(store.secret)

  const hasError = ref(false)
  store.$state.hasError = hasError
  // 这个必须始终设置
  store.hasError = toRef(store.$state, 'hasError')
  //   console.log(store.hasError)

  // 在这种情况下，最好不要返回 `hasError`，因为它
  // 将显示在 devtools 的 `state` 部分
  // 无论如何，如果我们返回它，devtools 将显示它两次。
}) */

/**
 * 添加新的外部属性
 * 当添加外部属性、来自其他库的类实例或仅仅是非响应式的东西时，您应该在将对象传递给 pinia 之前使用 markRaw() 包装对象。 这是一个将路由添加到每个 store 的示例
 */
/* pinia.use(({ store }) => {
  store.router = markRaw({
    path: '/',
    redirect: '/404',
    meta: {
      hidden: true
    }
  })
  //   console.log(store.router)
}) */

/**
 * 在插件中调用 $subscribe
 * 您也可以在插件中使用 store.$subscribe 和 store.$onAction
 */
/* pinia.use(({ store }) => {
  store.$subscribe(() => {
    // 在存储变化的时候执行
    console.log('state 里面的内容发生变化时 会触发')
  })
  store.$onAction(() => {
    // 在 action 的时候执行
  })
}) */

/**
 * 添加新选项
 * 可以在定义 store 时创建新选项，以便以后从插件中使用它们。
 */
pinia.use(({ options, store }) => {
  console.log(options, store)
  if (options.debounce) {
    // console.log(Object.keys(options.debounce)) // ['searchContacts']
    // 我们正在用新的action覆盖这些action
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = 666
      console.log(debouncedActions, action)
      return debouncedActions
    }, {})
  }
})

app.mount('#app')
