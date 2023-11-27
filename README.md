# directive-auth

vue 自定义指令 v-auth 封装

## 使用方法

注册：
```JavaScript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import auth from 'auth-directive';

const app = createApp(App);
// 传入校验方法,接收参数与自定义指令一致
app.use(auth((_, binding) => {
  return true;
}));

```

组件内使用：
将权限信息传入 v-auth 指令，在校验函数的第二个参数接收 (binding.value)

```Vue.js
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
  <div v-if="state === 'mount'" >
    <p v-auth="auth">出现了！</p>
  </div>
</template>

<style>
.btns > * {
  margin: 0 1rem;
}
</style>
```

## 注意事项
- v-auth 不要与 v-if 在同一标签使用，尽量在 v-auth 的父元素中使用 v-if
- v-auth 与 v-for 同时使用时必须设置唯一key
