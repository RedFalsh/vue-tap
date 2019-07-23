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
      <el-table-column label="上线/下线" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.online==0" style="color:red;">下线</span>
          <span v-else-if="scope.row.online==1" style="color:green;">上线</span>
        </template>
      </el-table-column>
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
import { tapOnlineLogList } from '@/api/tap'
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
        page: 1,
        limit: 10
      },
      online_list: []
    }
  },
  created() {
    this.fetchData()
    this.listQuery.sn = this.$route.query.sn
  },
  methods: {
    fetchData() {
      this.listLoading = true
      tapOnlineLogList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.items
        this.online_list = response.data.items
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

