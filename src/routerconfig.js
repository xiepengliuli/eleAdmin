import Main from './commponents/main.vue'
import Login from './commponents/login.vue'
import AddTab from './commponents/addTab.vue'
import Testa from './commponents/testa.vue'

export default[
 { path: '/',component: Login },
 { path: '/addTab',component: AddTab },
 { path: '/testa',component: Testa },
 { path: '/main',component: Main }
]	