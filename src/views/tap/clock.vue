<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom:20px;">
      <el-input
        v-model="tapInfo.sn"
        placeholder="名称 SN"
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
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="handleClockAdd"
      >添加</el-button>
    </div>

    <el-table v-loading="clockListLoading" :data="clockList">
      <el-table-column label="重复" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type==1">执行一次</span>
          <span v-if="scope.row.type==2">每天</span>
          <span v-if="scope.row.type==3">工作日</span>
          <span v-if="scope.row.type==4">周末</span>
          <span v-if="scope.row.type==5">自定义</span>
        </template>
      </el-table-column>
      <el-table-column prop="open_time" label="开启时间" align="center" />
      <el-table-column prop="close_time" label="关闭时间" align="center" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.alive==1" type="success">激活</el-tag>
          <el-tag v-if="scope.row.alive==0" type="danger">未激活</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="handleClockEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click.stop="handleClockDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="定时任务编辑" :visible.sync="dialogEditVisible">
      <el-form :model="clockForm">
        <el-form-item label="重复" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选重复周期">
            <el-option label="执行一次" value="1" />
            <el-option label="每天" value="2" />
            <el-option label="工作日" value="3" />
            <el-option label="周末" value="4" />
            <el-option label="自定义" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="开启时间" :label-width="formLabelWidth">
          <el-time-picker v-model="clockForm.open_time" value-format="HH:mm" placeholder="任意时间点" />
        </el-form-item>
        <el-form-item label="关闭时间" :label-width="formLabelWidth">
          <el-time-picker v-model="clockForm.close_time" value-format="HH:mm" placeholder="任意时间点" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClockEditOk">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="定时任务添加" :visible.sync="dialogAddVisible">
      <el-form :model="clockForm">
        <el-form-item label="重复" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选重复周期">
            <el-option label="执行一次" value="1" />
            <el-option label="每天" value="2" />
            <el-option label="工作日" value="3" />
            <el-option label="周末" value="4" />
            <el-option label="自定义" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="开启时间" :label-width="formLabelWidth">
          <el-time-picker v-model="clockForm.open_time" value-format="HH:mm" placeholder="任意时间点" />
        </el-form-item>
        <el-form-item label="关闭时间" :label-width="formLabelWidth">
          <el-time-picker v-model="clockForm.close_time" value-format="HH:mm" placeholder="任意时间点" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClockAddOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  tapClockList,
  tapClockDelete,
  tapClockEdit,
  tapClockAdd
} from '@/api/tap'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'OperatorLog',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      formLabelWidth: '100px',
      sn: '',
      number: 0,
      tapInfo: null,
      clockListLoading: false,
      clockList: [],
      dialogEditVisible: false,
      value: '',
      clockForm: {
        sn: '',
        number: '',
        id: 0,
        type: '',
        open_time: '',
        close_time: ''
      },
      dialogAddVisible: false
    }
  },
  created() {
    this.tapInfo = this.$route.query.tap
    this.number = this.$route.query.number
    this.sn = this.tapInfo.sn
    this.fetchData()
  },
  methods: {
    fetchData() {
      var sn = this.tapInfo.sn
      if (sn) {
        this.clockListLoading = true
        tapClockList(this.tapInfo.sn, this.number).then(response => {
          this.clockListLoading = false
          this.clockList = response.data.items
        })
      }
    },
    handleFilter() {
      this.fetchData()
    },
    handleClockAdd() {
      this.value = ''
      this.clockForm.id = 0
      this.clockForm.type = 0
      this.clockForm.open_time = ''
      this.clockForm.close_time = ''
      this.dialogAddVisible = true
    },
    handleClockAddOk() {
      this.clockForm.sn = this.sn
      this.clockForm.number = this.number
      if (this.value.length < 1) {
        this.$message({
          message: '请选择重复周期',
          type: 'warning'
        })
        return
      }
      this.clockForm.type = parseInt(this.value)
      console.log(this.clockForm)
      if (
        this.clockForm.open_time.length > 1 ||
        this.clockForm.close_time.length > 1
      ) {
        tapClockAdd(this.clockForm).then(response => {
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.dialogAddVisible = false
          this.fetchData()
        })
      } else {
        this.$message({
          message: '请选择开启时间或关闭时间',
          type: 'warning'
        })
      }
    },
    handleClockEdit(clock) {
      this.clockForm.id = clock.id
      this.clockForm.type = clock.type
      if (clock.type === 1) {
        this.value = '执行一次'
      }
      if (clock.type === 2) {
        this.value = '每天'
      }
      if (clock.type === 3) {
        this.value = '工作日'
      }
      if (clock.type === 4) {
        this.value = '周末'
      }
      if (clock.type === 5) {
        this.value = '自定义'
      }
      this.clockForm.open_time = clock.open_time
      this.clockForm.close_time = clock.close_time
      this.dialogEditVisible = true
    },
    handleClockEditOk() {
      tapClockEdit(this.clockForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.dialogEditVisible = false
        this.fetchData()
      })
    },
    handleClockDelete(clock) {
      this.$confirm('是否删除此定时任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tapClockDelete(clock.id).then(response => {
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.clockList.splice(this.clockList.indexOf(clock), 1)
        })
      })
    }
  }
}
</script>
