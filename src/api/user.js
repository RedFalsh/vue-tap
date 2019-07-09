import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'get',
    params: { data }
  })
}

export function register(form) {
  return request({
    url: '/user/register',
    method: 'post',
    params: form
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function userList(page) {
  return request({
    url: '/user/list',
    method: 'get',
    params: page
  })
}

export function userRoleModify(login_name, roles) {
  return request({
    url: '/user/role/modify',
    method: 'get',
    params: { login_name, roles }
  })
}
