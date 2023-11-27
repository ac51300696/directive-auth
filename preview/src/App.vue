<script setup lang="ts">
import { ref } from 'vue';
const auth = ref<'premission' | 'notPremission'>('premission')
const state = ref<'mount' | 'destory'>('mount')

</script>

<template>
  <div class="btns">
    <button @click="auth = 'premission'">开启权限</button>
    <button @click="auth = 'notPremission'">关闭权限</button>
    <button @click="state = 'mount'">模拟元素挂载</button>
    <button @click="state = 'destory'">模拟元素销毁</button>
  </div>
  
  <p>元素状态: {{state}}</p>
  <p>当前权限: {{ auth }}</p>
  <div v-if="state === 'mount'" v-auth="auth">
    <p >出现了！</p>
  </div>
</template>

<style>
.btns > * {
  margin: 0 1rem;
}
</style>
