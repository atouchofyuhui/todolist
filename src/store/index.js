import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 输入框中的内容
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    // 为state中的inputValue 赋值
    setInputValue (state, val) {
      state.inputValue = val
    },
    // 添加任务
    addListItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      // 加入数组
      state.list.push(obj)
      state.nextId++
      // 清空输入框
      state.inputValue = ''
    },
    // 删除任务
    removeItem (state, id) {
      // 找到要删除的项
      const r = state.list.findIndex(i => i.id === id)
      if (r !== -1) {
        // 删除找到的那个项
        state.list.splice(r, 1)
      }
    },
    // 变更状态
    changeStatus (state, param) {
      const r = state.list.findIndex(i => i.id === param.id)
      if (r !== -1) {
        state.list[r].done = param.status
      }
    },
    // 清除已完成的任务
    clearDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 切换任务列表
    changeList (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('./list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      }).catch((err) => { console.log(err) })
    }
  },
  modules: {
  },
  getters: {
    // 统计剩余未完成的任务
    undoneList (state) {
      return state.list.filter(x => x.done === false).length
    },
    // 切换任务列表
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
    }
  }
})
