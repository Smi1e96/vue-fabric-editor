"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearLocal = clearLocal;
exports.getLocal = getLocal;
exports.removeLocal = removeLocal;
exports.setLocal = setLocal;
/**
 * get localStorage 获取本地存储
 * @param { String } key
 */
function getLocal(key) {
  if (!key) throw new Error('key is empty');
  var value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

/**
 * set localStorage 设置本地存储
 * @param { String } key
 * @param value
 */
function setLocal(key, value) {
  if (!key) throw new Error('key is empty');
  if (!value) return;
  return localStorage.setItem(key, JSON.stringify(value));
}

/**
 * remove localStorage 移除某个本地存储
 * @param { String } key
 */
function removeLocal(key) {
  if (!key) throw new Error('key is empty');
  return localStorage.removeItem(key);
}

/**
 * clear localStorage 清除本地存储
 */
function clearLocal() {
  return localStorage.clear();
}