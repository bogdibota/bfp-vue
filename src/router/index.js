import Vue from 'vue';
import Router from 'vue-router';
import MyProfile from '@/components/my-profile';
import Home from '@/components/Home';
import Redirecter from '@/components/Redirecter';
import MyGroups from '@/components/my-groups';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/my-profile',
      name: 'my-profile',
      component: MyProfile,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/redirecter',
      name: 'Redirecter',
      component: Redirecter,
    },
    {
    },
  ],
  mode: 'history',
});
