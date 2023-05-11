import { defineStore } from 'pinia'

export const usePluginsStore = defineStore('plugins', {
  state: () => {
    return {
      name: 'xiaowu '
    }
  },
  actions: {
    searchContacts() {
      // ...
    }
  },

  // 稍后将由插件读取
  debounce: {
    // 将动作 searchContacts 防抖 300ms
    searchContacts: 300
  }
})
