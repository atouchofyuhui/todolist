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
    nextId: 5
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
      this.state.list.push(obj)
      state.nextId++
      // 清空输入框
      this.state.inputValue = ''
    },
    // 删除任务
    removeItem (state, id) {
      // 找到要删除的项
      const r = this.state.list.findIndex(i => i.id === id)
      if (r !== -1) {
        // 删除找到的那个项
        this.state.list.splice(r, 1)
      }
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
  }
})
