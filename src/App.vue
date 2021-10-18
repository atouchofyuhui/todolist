<template>
  <div id="app">
    <a-input
      :placeholder="inputValue"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputValue"
      @keyup.enter="addList"
    ></a-input>
    <a-button type="primary" @click="addList">添加任务</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            (e) => {
              checkboxState(e, item.id);
            }
          "
        >
          {{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务 -->
        <span>{{ undoneList }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!--把已完成的任务清空 -->
        <a @click="clearDoneList">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      // list: []
    }
  },
  components: {},
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['undoneList', 'infoList'])
  },
  methods: {
    // 监听输入框中文本的变化
    handleInputValue (e) {
      console.log(e.target.value)
      this.$store.commit('setInputValue', e.target.value)
    },
    // 添加任务
    addList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('请输入内容')
      }
      this.$store.commit('addListItem')
    },
    // 删除任务
    removeItem (id) {
      // console.log(id)
      this.$store.commit('removeItem', id)
      this.$message.success('删除成功')
    },
    // 修改任务状态
    checkboxState (e, id) {
      console.log(e.target.checked, id)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    // 清除已完成的任务
    clearDoneList () {
      this.$store.commit('clearDone')
    },
    // 切换任务列表
    changeList (key) {
      // console.log(key)
      this.$store.commit('changeList', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 400px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
