import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import LogoutPage from '../login/LogoutPage'
import UserProfilePage from '../user/ProfilePage'
import DomainsManagePage from '../domains/DomainsManagePage'
import DomainsCreatePage from '../domains/DomainsCreatePage'
import RecordsManagePage from '../records/RecordsManagePage'
import RecordsCreatePage from '../records/RecordsCreatePage'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/logout', component: LogoutPage },
    { path: '/profile', component: UserProfilePage},
    { path: '/domains', component: DomainsManagePage},
    { path: '/domains/create', component: DomainsCreatePage},
    { path: '/records', component: RecordsManagePage},
    { path: '/records/create', component: RecordsCreatePage},

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = window.$cookies.isKey('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})