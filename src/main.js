import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/routes'
import VueApexCharts from "vue3-apexcharts"; //para gráficos
createApp(App)
.use(router)
.use(VueApexCharts)
.mount('#app')
