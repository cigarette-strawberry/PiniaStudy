<script setup>
import { usePluginsStore } from '../stores/plugins'

const plugins = usePluginsStore()

defineProps({
  msg: String
})
</script>
<template>
  <h1>{{ msg }}</h1>
  <h2>{{ plugins.name }}</h2>
</template>
