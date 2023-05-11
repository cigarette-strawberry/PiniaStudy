<script setup>
import { useActionsStore } from '../stores/actions'

const actions = useActionsStore()

// Actions 像 methods 一样被调用：
actions.increment()
actions.randomizeCounter()

/**
 * 访问其他 store 操作
 * 要使用另一个 store ，您可以直接在操作内部使用它
 */
actions.visitActions()

/**
 * 订阅 Actions
 * 可以使用 store.$onAction() 订阅 action 及其结果。 传递给它的回调在 action 之前执行。 after 处理 Promise 并允许您在 action 完成后执行函数。 以类似的方式，onError 允许您在处理中抛出错误。
 */
// const unsubscribe =
actions.$onAction(
  ({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    console.log(name, store, args, after, onError)
    // 记录开始的时间变量
    const startTime = Date.now()
    // 这将在 `store` 上的操作执行之前触发
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 如果 action 成功并且完全运行后，after 将触发。
    // 它将等待任何返回的 promise
    after(result => {
      console.log(`Finished "${name}" after ${Date.now() - startTime}ms.\nResult: ${result}.`)
    })

    // 如果 action 抛出或返回 Promise.reject ，onError 将触发
    onError(error => {
      console.warn(`Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`)
    })
  }
)
// 手动移除订阅
// unsubscribe()

actions.increment() // 这行代码执行完毕 才会执行上面的 $onAction

/**
 * 此订阅将在组件卸载后保留
 * 默认情况下，action subscriptions 绑定到添加它们的组件（如果 store 位于组件的 setup() 内）。 意思是，当组件被卸载时，它们将被自动删除。 如果要在卸载组件后保留它们，请将 true 作为第二个参数传递给当前组件的 detach action subscription
 */
actions.$onAction(callback, true)
function callback() {
  console.log('此订阅将在组件卸载后保留')
}

defineProps({
  msg: String
})
</script>
<template>
  <h1>{{ msg }}</h1>
</template>
