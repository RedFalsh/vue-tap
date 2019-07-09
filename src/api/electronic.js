import request from '@/utils/request'

export function getElectronicList(page) {
  return request({
    url: '/electronic/search',
    method: 'get',
    params: page
  })
}

export function getElectronicInfo(sn) {
  return request({
    url: '/electronic/info',
    method: 'get',
    params: {sn}
  })
}

export function electronicEdit(form) {
  return request({
    url: '/electronic/edit',
    method: 'get',
    params: form
  })
}

export function electronicDelete(sn) {
  return request({
    url: '/electronic/delete',
    method: 'get',
    params: {sn}
  })
}

export function electronicAdd(form) {
  return request({
    url: '/electronic/add',
    method: 'get',
    params: form
  })
}

// 元器件出库记录
export function electronicOutStockLogList(page) {
  return request({
    url: '/electronic/outstock/log/list',
    method: 'get',
    params: page
  })
}

// 元器件入库记录
export function electronicInStockLogList(page) {
  return request({
    url: '/electronic/instock/log/list',
    method: 'get',
    params: page
  })
}

export function electronicInCartAdd(sn) {
  return request({
    url: '/electronic/in/cart/add',
    method: 'get',
    params: {sn}
  })
}
export function electronicInCartFind(page) {
  return request({
    url: '/electronic/in/cart/find',
    method: 'get',
    params: page
  })
}

export function electronicInCartDelete(electronics) {
  return request({
    url: '/electronic/in/cart/delete',
    method: 'get',
    params: {electronics}
  })
}

export function electronicInOrderCreate(electronics, note) {
  return request({
    url: '/electronic/in/order/create',
    method: 'get',
    params: {electronics, note}
  })
}

export function electronicInOrderList() {
  return request({
    url: '/electronic/in/order/list',
    method: 'get'
  })
}

export function electronicInOrderInfo(sn) {
  return request({
    url: '/electronic/in/order/info',
    method: 'get',
    params: {sn}
  })
}

export function electronicInStock(sn) {
  return request({
    url: '/electronic/in/order/instock',
    method: 'get',
    params: {sn}
  })
}

export function electronicOutCartAdd(sn) {
  return request({
    url: '/electronic/out/cart/add',
    method: 'get',
    params: {sn}
  })
}

export function electronicOutCartFind(page) {
  return request({
    url: '/electronic/out/cart/find',
    method: 'get',
    params: page
  })
}

export function electronicOutCartDelete(electronics) {
  return request({
    url: '/electronic/out/cart/delete',
    method: 'get',
    params: {electronics}
  })
}

export function electronicOutOrderCreate(electronics, note) {
  return request({
    url: '/electronic/out/order/create',
    method: 'get',
    params: {electronics, note}
  })
}

export function electronicOutOrderList(page) {
  return request({
    url: '/electronic/out/order/list',
    method: 'get',
    params: page
  })
}

export function electronicOutOrderInfo(sn) {
  return request({
    url: '/electronic/out/order/info',
    method: 'get',
    params: {sn}
  })
}

export function electronicOutStock(sn) {
  return request({
    url: '/electronic/out/order/outstock',
    method: 'get',
    params: {sn}
  })
}

export function electronicFavoriteAdd(name) {
  return request({
    url: '/electronic/favorite/add',
    method: 'get',
    params: {name}
  })
}

export function electronicFavoriteDelete(name) {
  return request({
    url: '/electronic/favorite/delete',
    method: 'get',
    params: {name}
  })
}

export function electronicFavoriteList() {
  return request({
    url: '/electronic/favorite/list',
    method: 'get'
  })
}

export function electronicFavoriteInfo(sn) {
  return request({
    url: '/electronic/favorite/info',
    method: 'get',
    params: {sn}
  })
}

export function electronicFavoriteItemAdd(name, sn) {
  return request({
    url: '/electronic/favorite/item/add',
    method: 'get',
    params: {name, sn}
  })
}

export function electronicFavoriteItemList(name) {
  return request({
    url: '/electronic/favorite/item/list',
    method: 'get',
    params: {name}
  })
}

export function electronicFavoriteItemDelete(name, sn) {
  return request({
    url: '/electronic/favorite/item/delete',
    method: 'get',
    params: {name, sn}
  })
}

export function electronicFavoriteItemUpdate(electronics) {
  return request({
    url: '/electronic/favorite/item/update',
    method: 'get',
    params: {electronics}
  })
}
