<template>
  <div id="app">
    <a-input :placeholder="inputValue" class="my_ipt"
    :value="inputValue"
    @change="handleInputValue" ></a-input>
    <a-button type="primary" @click="addList">添加任务</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox @change="checkboxState"> {{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a  @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer -->
    <div class="footer">
      <!-- 未完成的任务 -->
      <span>0条剩余</span>
      <!-- 操作按钮 -->
      <a-button-group>
        <a-button type="primary">全部</a-button>
        <a-button>未完成</a-button>
        <a-button>已完成</a-button>
      </a-button-group>
      <!--把已完成的任务清空 -->
      <a >清楚已完成</a>
    </div>
    </a-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      // list: []
    }
  },
  components: {
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue'])
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
    },
    // 修改任务状态
    checkboxState (e) {
      console.log(e.target.checked)
      // const param = {
      // }
    }
  }
}
</script>

<style scope>
#app {
 padding: 10px;
}

.my_ipt {
  width: 500px;
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
