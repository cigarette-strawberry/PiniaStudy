/**
 * 最简单的例子是通过返回一个对象为所有Store添加一个静态属性
 */
export function myPiniaPlugin(context) {
  context.pinia // 使用 `createPinia()` 创建的 pinia
  context.app // 使用 `createApp()` 创建的当前应用程序（仅限 Vue 3）
  context.store // 插件正在扩充的 store
  context.options // 定义存储的选项对象传递给`defineStore()`
  console.log(context)
  // ...
  return { secret: 'the cake is a lie' }
}
