<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom:20px;">
      <el-input
        v-model="listQuery.sn"
        placeholder="名称 SN"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.datetimeStart"
        class="filter-item"
        type="datetime"
        placeholder="选择开始日期时间"
      />
      <span class="demonstration">-</span>
      <el-date-picker
        v-model="listQuery.datetimeEnd"
        class="filter-item"
        type="datetime"
        placeholder="选择截止日期时间"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
    </div>

    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.time"
      >{{ activity.msg }}</el-timeline-item>
    </el-timeline>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { tapOperateLogList } from '@/api/tap'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'OperatorLog',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        sn: null,
        page: 1,
        limit: 20,
        datetimeStart: null,
        datetimeEnd: null
      },
      activities: []
    }
  },
  created() {
    this.fetchData()
    this.listQuery.sn = this.$route.query.sn
  },
  methods: {
    dateFormat(time) {
      var date = new Date(time)
      var year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours =
        date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // 拼接
      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      )
    },
    fetchData() {
      if (this.listQuery.datetimeStart) {
        this.listQuery.datetimeStart = this.dateFormat(
          this.listQuery.datetimeStart
        )
      }
      if (this.listQuery.datetimeEnd) {
        this.listQuery.datetimeEnd = this.dateFormat(
          this.listQuery.datetimeEnd
        )
      }
      tapOperateLogList(this.listQuery).then(response => {
        this.total = response.data.total
        var items = response.data.items
        var temp = []
        for (var i = 0; i < items.length; i++) {
          var color = ''
          if (items[i].msg === '开启') {
            color = '#0bbd87'
          }
          var info = {
            msg: items[i].msg,
            time: items[i].time,
            color: color
          }
          temp.push(info)
        }
        this.activities = temp
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    }
  }
}
</script>
