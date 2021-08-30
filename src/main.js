import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faPenSquare, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimesCircle,faPenSquare,faSortDown,faSortUp)

createApp(App).use(router).use(store).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
