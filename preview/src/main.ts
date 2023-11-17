import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import auth from '../../core/directive.auth.ts';

// 权限检查方法
const checkAuth: Parameters<typeof auth>[0] = (_, b) => {
  return b.value == 'premission';
};

const app = createApp(App);
app.use(auth(checkAuth));

app.mount('#app');
