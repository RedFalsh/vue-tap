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
      <el-input
        v-model="listQuery.mobile"
        placeholder="电话号码"
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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="SN">
              <span>{{ scope.row.sn }}</span>
            </el-form-item>
            <el-form-item label="在线状态">
              <span v-if="scope.row.online==0" style="color:red;">离线</span>
              <span v-else-if="scope.row.online==1" style="color:green;">在线</span>
            </el-form-item>
            <el-form-item label="电量">
              <span>{{ scope.row.power }}</span>
            </el-form-item>
            <el-form-item label="位置">
              <span>{{ scope.row.position }}</span>
            </el-form-item>
            <el-form-item label="1号阀名称">
              <span>{{ scope.row.alias1 }}</span>
            </el-form-item>
            <el-form-item label="1号阀状态">
              <span>{{ scope.row.alias1 }}</span>
            </el-form-item>
            <el-form-item label="2号阀名称">
              <span>{{ scope.row.alias2 }}</span>
            </el-form-item>
            <el-form-item label="2号阀状态">
              <span>{{ scope.row.alias2 }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="sn" label="编号" align="center" />
      <el-table-column label="在线状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.online==0" style="color:red;">离线</span>
          <span v-else-if="scope.row.online==1" style="color:green;">在线</span>
        </template>
      </el-table-column>
      <el-table-column prop="power" label="电量" align="center" />
      <el-table-column prop="position" label="位置" align="center" />
      <el-table-column prop="alias1" label="1号阀名称" align="center" />
      <el-table-column label="1号阀状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status1==0" style="color:red;">已关闭</span>
          <span v-else-if="scope.row.status1==1" style="color:green;">已开启</span>
          <span v-else-if="scope.row.status1==2" style="color:blue;">半开</span>
          <span v-else-if="scope.row.status1==3" style="color:green;">开启中...</span>
          <span v-else-if="scope.row.status1==4" style="color:red;">关闭中...</span>
          <span v-else style="color:red;">状态异常</span>
        </template>
      </el-table-column>
      <el-table-column prop="alias2" label="2号阀名称" align="center" />
      <el-table-column label="2号阀状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status2==0" style="color:red;">已关闭</span>
          <span v-else-if="scope.row.status2==1" style="color:green;">已开启</span>
          <span v-else-if="scope.row.status2==2" style="color:blue;">半开</span>
          <span v-else-if="scope.row.status2==3" style="color:green;">开启中...</span>
          <span v-else-if="scope.row.status2==4" style="color:red;">关闭中...</span>
          <span v-else style="color:red;">状态异常</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="handleClickTapInfo(scope.row.sn)"
          >
            详情
          </el-button>
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

    <el-dialog title="详情" :visible.sync="dialogTapInfoVisible">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form :model="tapInfo">
            <el-form-item label="设备编号:" :label-width="formLabelWidth">
              <span>{{ tapInfo.sn }}</span>
            </el-form-item>
            <el-form-item label="在线状态:" :label-width="formLabelWidth">
              <span v-if="tapInfo.online==0" style="color:red;">离线</span>
              <span v-else-if="tapInfo.online==1" style="color:green;">在线</span>
            </el-form-item>
            <el-form-item label="电量:" :label-width="formLabelWidth">
              <span>{{ tapInfo.power }} V</span>
            </el-form-item>
            <el-form-item label="1号阀名称:" :label-width="formLabelWidth">
              <span>{{ tapInfo.alias1 }}</span>
            </el-form-item>
            <el-form-item label="1号阀状态:" :label-width="formLabelWidth">
              <span v-if="tapInfo.status1==0" style="color:red;">已关闭</span>
              <span v-else-if="tapInfo.status1==1" style="color:green;">已开启</span>
              <span v-else-if="tapInfo.status1==2" style="color:blue;">半开</span>
              <span v-else-if="tapInfo.status1==3" style="color:green;">开启中...</span>
              <span v-else-if="tapInfo.status1==4" style="color:red;">关闭中...</span>
              <span v-else style="color:red;">状态异常</span>
            </el-form-item>
            <el-form-item label="2号阀名称:" :label-width="formLabelWidth">
              <span>{{ tapInfo.alias2 }}</span>
            </el-form-item>
            <el-form-item label="2号阀状态:" :label-width="formLabelWidth">
              <span>{{ tapInfo.status2 }}</span>
              <span v-if="tapInfo.status2==0" style="color:red;">已关闭</span>
              <span v-else-if="tapInfo.status2==1" style="color:green;">已开启</span>
              <span v-else-if="tapInfo.status2==2" style="color:blue;">半开</span>
              <span v-else-if="tapInfo.status2==3" style="color:green;">开启中...</span>
              <span v-else-if="tapInfo.status2==4" style="color:red;">关闭中...</span>
              <span v-else style="color:red;">状态异常</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <el-form :model="userInfo">
            <el-form-item label="所属用户名称:" :label-width="formLabelWidth">
              <span>{{ userInfo.nickname }}</span>
            </el-form-item>
            <el-form-item label="所属用户电话:" :label-width="formLabelWidth">
              <span>{{ userInfo.mobile }}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTapInfoVisible = false">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { tapList, tapInfo } from '@/api/tap'
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
        mobile: null,
        position: null,
        page: 1,
        limit: 10
      },
      formLabelWidth: '120px',
      dialogTapInfoVisible: false,
      tapInfo: {
        sn: null,
        alive: null,
        mobile: null,
        alias1: null,
        status1: null,
        alias2: null,
        status2: null
      },
      userInfo: {
        nickname: '',
        mobile: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      tapList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.items
      })
    },
    handleFilter() {
      this.fetchData()
    },
    handleClickTapInfo(sn) {
      tapInfo(sn).then(response => {
        this.tapInfo = response.data.tap_info
        this.userInfo = response.data.user_info
        this.dialogTapInfoVisible = true
      })
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
