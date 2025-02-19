
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import uiComponents from './ui-components'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const app = createApp(App)
uiComponents.map(component => app.component(component.name, component))

app.use(router)
app.use(store)
app.mount('#app')
