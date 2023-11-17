<script setup lang="ts">
import {
  // computed,
  ref
} from 'vue';
const auth = ref<'premission' | 'notPremission'>('premission')
const state = ref<'mount' | 'destory'>('mount')

/* const mockList = computed(() => {
  return new Array(500).fill(undefined).map((_, idx) => auth.value + idx)
}) */
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
  <div v-if="state === 'mount'" >
    <p v-auth="auth">出现了！</p>
  </div>
  <!-- <template v-for="i in mockList" :key="i">
    <p v-auth="auth" @click="cb">{{ i }}</p>
  </template> -->
</template>

<style>
.btns > * {
  margin: 0 1rem;
}
</style>