import Vue from 'vue'

import app from './components/app.vue'

let v = new Vue(
    {
        components: {app},
        template: '<app/>'
    }).$mount('#app')
