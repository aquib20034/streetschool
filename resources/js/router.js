import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

const routes = [
    {
        path: '/dashboard',
        name : 'dashboard',
        component : Dashboard
    },
    {
        path: '/members',
        name : 'members',
        component : () => import('./views/Members.vue')
    },
    {
        path: '/designations',
        name : 'designations',
        component : () => import('./views/Designations.vue')
    },
    {
        path: '/projects',
        name : 'projects',
        component : () => import('./views/Projects.vue')
    },
    {
        path: '/faqs',
        name : 'faqs',
        component : () => import('./views/Faqs.vue')
    },
    {
        path: '/users',
        name : 'users',
        component : () => import('./views/Users.vue')
    },
    {
        path: '/records',
        name : 'records',
        component : () => import('./views/Records.vue')
    },
    {
        path: '/sponsors',
        name : 'sponsors',
        component : () => import('./views/Sponsors.vue')
    },
    {
        path: '/works',
        name : 'works',
        component : () => import('./views/Works.vue')
    },
    {
        path: '/activities',
        name : 'activities',
        component : () => import('./views/Activities.vue')
    },
    {
        path: '/countries',
        name : 'countries',
        component : () => import('./views/Countries.vue')
    },
    
    {
        path: '/contacts',
        name : 'contacts',
        component : () => import('./views/Contacts.vue')
    },
    {
        path: '/contact_types',
        name : 'contact_types',
        component : () => import('./views/Contact_types.vue')
    },
    {
        path: '/contents',
        name : 'contents',
        component : () => import('./views/Contents.vue')
    },
    {
        path: '/img_categories',
        name : 'img_categories',
        component : () => import('./views/Img_categories.vue')
    },
    {
        path: '/galleries',
        name : 'galleries',
        component : () => import('./views/Galleries.vue')
    }
]

const router = new Router({
    mode: 'history',
    routes :routes,
    // linkActiveClass:"active"
});

export default router;