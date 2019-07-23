import request from '@/utils/request'

export function tapList(page) {
  return request({
    url: '/tap/list',
    method: 'get',
    params: page
  })
}

export function tapInfo(sn) {
  return request({
    url: '/tap/info',
    method: 'get',
    params: { sn }
  })
}

export function tapPositionList() {
  return request({
    url: '/tap/position/list',
    method: 'get'
  })
}

export function tapEdit(form) {
  return request({
    url: '/tap/edit',
    method: 'get',
    params: form
  })
}

export function tapOnlineLogList(page) {
  return request({
    url: '/tap/online/log/list',
    method: 'get',
    params: page
  })
}

export function tapPowerLogList(page) {
  return request({
    url: '/tap/power/log/list',
    method: 'get',
    params: page
  })
}

export function tapOperateLogList(page) {
  return request({
    url: '/tap/operate/log/list',
    method: 'get',
    params: page
  })
}

export function tapClockList(sn, number) {
  return request({
    url: '/tap/clock/list',
    method: 'get',
    params: { sn, number }
  })
}

export function tapClockAdd(form) {
  return request({
    url: '/tap/clock/add',
    method: 'get',
    params: form
  })
}

export function tapClockEdit(form) {
  return request({
    url: '/tap/clock/edit',
    method: 'get',
    params: form
  })
}

export function tapClockDelete(id) {
  return request({
    url: '/tap/clock/delete',
    method: 'get',
    params: { id }
  })
}
