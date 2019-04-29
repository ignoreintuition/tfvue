/* jshint esversion:6 */
import Vue from 'vue'
import App from './App.vue'
import * as tf from '@tensorflow/tfjs'

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$tf', { value: tf });

new Vue({
  render: h => h(App),
}).$mount('#app')
