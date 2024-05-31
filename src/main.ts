import naive from "naive-ui";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
//@ts-ignore
import piniaPersist from "pinia-plugin-persist";

const app = createApp(App);
const store = createPinia();

store.use(piniaPersist);

app.use(naive);
app.use(store);
app.use(router);

app.mount("#app");