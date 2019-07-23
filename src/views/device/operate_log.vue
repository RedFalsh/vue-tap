<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom:20px;">
      <el-input
        v-model="listQuery.sn"
        placeholder="SN"
        style="width: 400px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="timeRange"
        class="filter-item"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>

    </div>
    <el-table v-loading="listLoading" :data="list">
      <el-table-column prop="time" label="时间" align="center" />
      <el-table-column prop="alias" label="阀门名称" align="center" />
      <el-table-column prop="msg" label="操作" align="center" />
    </el-table>
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
  name: 'Devices',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: [],
      total: 1,
      listQuery: {
        sn: null,
        datetimeStart: '',
        datetimeEnd: '',
        page: 1,
        limit: 10
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      timeRange: null
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
      if (this.timeRange) {
        this.listQuery.datetimeStart = this.dateFormat(this.timeRange[0])
        this.listQuery.datetimeEnd = this.dateFormat(this.timeRange[1])
      } else {
        this.listQuery.datetimeStart = '2000-01-01 00:00:00'
        this.listQuery.datetimeEnd = '3000-01-01 00:00:00'
      }
      this.listLoading = true
      tapOperateLogList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.items
      })
    },
    handleFilter() {
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

