
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar';
Vue.component('pagination', require('laravel-vue-pagination'));
import Swal from 'sweetalert2';
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use( CKEditor );
let Fire = new Vue();
window.Fire =Fire;
// import Swal from 'sweetalert2/dist/sweetalert2.js';

// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   onOpen: (toast) => {
//     toast.addEventListener('mouseenter', Swal.stopTimer)
//     toast.addEventListener('mouseleave', Swal.resumeTimer)
//   }
// })

//   window.Toast = Swal; 
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
window.axios = require('axios');
window.form = Form;

Vue.filter('upAllText',function(text){
    return text.toUpperCase();
    });

  Vue.filter('upText',function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
    });

  Vue.filter('myDate', function(created){
    return moment(created).format('MMMM Do YYYY');
  });
  Vue.filter('mydate', function(created){
	return created.moment().format('MMMM Do YYYY,  h:mm:sa a');
});


Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
  })



new Vue({
    el: '#app',
    router,
    // vuetify,
    render: h=>h(App)
});
