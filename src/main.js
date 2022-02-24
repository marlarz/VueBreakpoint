import { createApp } from 'vue';
import App from './App.vue';
import vueBreakpoint from './plugins/vue-breakpoint';

const app = createApp(App);

app.use(vueBreakpoint, {
  lg: 1300
});

app.mount('#app');
