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
      <el-table-column prop="power" label="电量(V)" align="center" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <div class="chart-container">
      <chart height="100%" width="100%" :data.sync="list" />
    </div>
  </div>
</template>

<script>
import { tapPowerLogList } from '@/api/tap'
import Chart from '@/components/Charts/DevicePowerLogChart'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Devices',
  components: { Pagination, Chart },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: [],
      total: 1,
      listQuery: {
        sn: null,
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.fetchData()
    this.listQuery.sn = this.$route.query.sn
  },
  methods: {
    fetchData() {
      this.listLoading = true
      tapPowerLogList(this.listQuery).then(response => {
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

