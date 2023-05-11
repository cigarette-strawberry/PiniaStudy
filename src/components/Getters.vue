<script setup>
import { useGettersStore } from '../stores/getters'
const getters = useGettersStore()

defineProps({
  msg: String
})
</script>
<template>
  <h1>{{ msg }}</h1>
  <h2>{{ getters.doubleCount }}</h2>
  <h2>{{ getters.doubleCountPlusOne }}</h2>
  <p>find() 方法返回数组中满足提供的测试函数的第一个元素的值:{{ getters.getUserById(2) }}</p>
  <p>filter() 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素:{{ getters.getActiveUserById(2) }}</p>
  <p>访问其他 Store 的getter:{{ getters.otherGetter }}</p>
</template>
