<template>
  <div class="app-container">
    <el-tabs @tab-click="tabClick">
      <el-tab-pane v-for="item in positions" :key="item" :label="item">
        <el-row v-for="tap in list" :key="tap" :gutter="24">
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>1号阀门</span>
                <el-breadcrumb separator="/" style="float: right; padding: 3px 0">
                  <el-breadcrumb-item>
                    <el-button type="text" @click.stop="toOperatorLog(tap)">操作记录</el-button>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    <el-button type="text" @click.stop="toClock(tap, 1)">定时任务</el-button>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    <el-button type="text" @click.stop="tapInfo(tap)">信息设置</el-button>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="tap">
                <div class="left">
                  <span>{{ tap.alias1 }}</span>
                  <span v-if="tap.online==0" style="color:red;">设备离线</span>
                  <span v-else-if="tap.online==1" style="color:green;">设备在线</span>
                  <span v-else style="color:green;">设备异常</span>
                  <span style="color:green;">{{ tap.sn }}</span>
                  <svg-icon icon-class="tap" style="font-size:40px;" />
                </div>
                <div class="right">
                  <span v-if="tap.status1==0" style="color:red;">已关闭</span>
                  <span v-else-if="tap.status1==1" style="color:green;">已开启</span>
                  <span v-else-if="tap.status1==2" style="color:blue;">半开</span>
                  <span v-else-if="tap.status1==3" style="color:green;">开启中...</span>
                  <span v-else-if="tap.status1==4" style="color:red;">关闭中...</span>
                  <span v-else style="color:red;">状态异常</span>
                  <span style="color:green;">电量：{{ tap.power }} V</span>
                  <el-row>
                    <el-button type="success" @click.stop="openTap(1, tap)">打开</el-button>
                    <el-button type="danger" @click.stop="closeTap(1, tap)">关闭</el-button>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>2号阀门</span>
                <el-breadcrumb separator="/" style="float: right; padding: 3px 0">
                  <el-breadcrumb-item>
                    <el-button type="text" @click.stop="toOperatorLog(tap)">操作记录</el-button>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    <el-button type="text" @click.stop="toClock(tap, 2)">定时任务</el-button>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    <el-button type="text" @click.stop="tapInfo(tap)">信息设置</el-button>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="tap">
                <div class="left">
                  <span>{{ tap.alias2 }}</span>
                  <span v-if="tap.online==0" style="color:red;">设备离线</span>
                  <span v-else-if="tap.online==1" style="color:green;">设备在线</span>
                  <span v-else style="color:green;">设备异常</span>
                  <svg-icon icon-class="tap" style="font-size:40px;" />
                </div>
                <div class="right">
                  <span v-if="tap.status2==0" style="color:red;">已关闭</span>
                  <span v-else-if="tap.status2==1" style="color:green;">已开启</span>
                  <span v-else-if="tap.status2==2" style="color:blue;">半开</span>
                  <span v-else-if="tap.status2==3" style="color:green;">开启中...</span>
                  <span v-else-if="tap.status2==4" style="color:red;">关闭中...</span>
                  <span v-else style="color:red;">状态异常</span>
                  <span style="color:green;">电量：{{ tap.power }} V</span>
                  <el-row>
                    <el-button type="success" @click.stop="openTap(2, tap)">打开</el-button>
                    <el-button type="danger" @click.stop="closeTap(2, tap)">关闭</el-button>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="fetchData"
        />
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="信息设置" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="设备编号:" :label-width="formLabelWidth">
          <span>{{ form.sn }}</span>
        </el-form-item>
        <el-form-item label="位置管理:" :label-width="formLabelWidth">
          <el-input v-model="form.position" autocomplete="off" />
        </el-form-item>
        <el-form-item label="1号阀名称:" :label-width="formLabelWidth">
          <el-input v-model="form.alias1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="2号阀名称:" :label-width="formLabelWidth">
          <el-input v-model="form.alias2" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSaveInfo">更新并保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tapList, tapPositionList, tapEdit } from '@/api/tap'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Find',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      value: true,
      tableKey: 0,
      list: null,
      listLoading: true,
      total: 10,
      listQuery: {
        name: null,
        position: null,
        page: 1,
        limit: 20
      },
      positions: [],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: {
        sn: null,
        position: null,
        power: null,
        alias1: null,
        status1: null,
        alias2: null,
        status2: null
      }
    }
  },
  created() {
    this.getPositionList()
    this.fetchData()
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
      this.listLoading = true
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
      tapList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.items
        this.total = response.data.total
        this.doSubscribe()
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    getPositionList() {
      tapPositionList().then(response => {
        this.positions = response.data.items
        console.log(this.positions)
      })
    },
    tabClick(tab) {
      this.listQuery.position = tab.label
      this.handleFilter()
    },
    tapInfo(tap) {
      this.form.alias1 = tap.alias1
      this.form.alias2 = tap.alias2
      this.form.position = tap.position
      this.form.sn = tap.sn
      this.dialogFormVisible = true
    },
    updateSaveInfo() {
      console.log(this.form)
      tapEdit(this.form).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    },
    toOperatorLog(tap) {
      this.$router.push({
        path: 'tapOperateLog',
        query: tap
      })
    },
    toClock(tap, number) {
      this.$router.push({
        path: 'tapClock',
        query: { tap, number }
      })
    },

    // mqtt相关操作
    doSubscribe() {
      var devices = this.list
      for (var i = 0; i < devices.length; i++) {
        var topic = 'tap/' + devices[i].sn + '/pub/#'
        console.log('订阅消息')
        console.log(topic)
        this.$mqtt.subscribe(topic)
      }
    },
    subscribe(val) {
      this.$mqtt.subscribe(val)
    },
    publish(topic, message) {
      this.$mqtt.publish(topic, message)
    },
    openTap(number, tap) {
      if (!tap.online) {
        this.$message.error('当前设备[' + tap.sn + ']不在线,无法操作')
      }
      var topic = 'tap/' + tap.sn + '/sub'
      if (number === 1) {
        topic += '/sw1'
      }
      if (number === 2) {
        topic += '/sw2'
      }
      this.$mqtt.publish(topic, 'ON')
    },
    closeTap(number, tap) {
      if (!tap.online) {
        this.$message.error('当前设备[' + tap.sn + ']不在线,无法操作')
      }
      var topic = 'tap/' + tap.sn + '/sub'
      if (number === 1) {
        topic += '/sw1'
      }
      if (number === 2) {
        topic += '/sw2'
      }
      this.$mqtt.publish(topic, 'OFF')
    }
  },
  mqtt: {
    'tap/#'(data, topic) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
      var devices = this.list
      var patt = /^tap\/([a-zA-Z0-9]{8,10})\/pub\/(\S+)/
      var res = patt.exec(topic)
      if (res) {
        var sn = res[1]
        var type = res[2]
        for (var i = 0; i < devices.length; i++) {
          if (devices[i].sn === sn) {
            if (type === 'online') {
              devices[i].online = parseInt(data)
              break
            }
            if (type === 'sta1') {
              devices[i].status1 = parseInt(data)
              break
            }
            if (type === 'sta2') {
              devices[i].status2 = parseInt(data)
              break
            }
            if (type === 'pow') {
              devices[i].power = parseFloat(data).toFixed(3)
              break
            }
            if (type === 'info') {
              var info = JSON.parse(data)
              devices[i].status1 = parseInt(info['sta1'])
              devices[i].status2 = parseInt(info['sta2'])
              devices[i].power = parseFloat(info['pow']).toFixed(2)
              devices[i].online = 1
              break
            }
          }
        }
      }
    }
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin-top: 50px;
}
.tap {
  height: 100px;
  width: 100%;
  margin-right: 10px;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.left {
  height: 100%;
  width: 45%;
  margin-left: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
}

.right {
  height: 100%;
  width: 45%;
  margin-right: 5px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;
}
</style>
