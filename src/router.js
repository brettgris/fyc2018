import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/home/Home';
import Menu from '@/views/menu/Menu';
import Login from '@/views/login/Login';

import Logout from '@/components/logout/Logout';
// import Callback from '@/components/callback/Callback';

import Trailer from '@/views/trailer/Trailer';
import Synopsis from '@/views/synopsis/Synopsis';
import Acclaim from '@/views/acclaim/Acclaim';
import Categories from '@/views/categories/Categories';
import Episodes from '@/views/episodes/Episodes';
import Episode from '@/views/episode/Episode';
import Next from '@/views/next/Next';

import Auth from '@/auth';

Vue.use(Auth);
Vue.use(Router);

const router = new Router({
	mode: 'hash',
  	routes: [
		{
		   path: '/',
		   name: 'home',
		   component: Home
		},
		{
		   path: '/video/:page',
		   name: 'home-page',
		   component: Home
		},
		{
		   path: '/documentaries',
		   name: 'documentaries',
		   component: Home
		},
		
		{
		   path: '/menu',
		   name: 'menu',
		   component: Menu
		},
		{
			path:'/login',
			name: 'login',
			component: Login
		},
		{
			path:'/logout',
			name: 'logout',
			component: Logout
		},
		// {
		// 	path: '/callback',
		// 	name: 'callback',
		// 	component: Callback
		// },
		{
			path: '/show/:safename',
			name: 'synopsis',
			component: Synopsis
		},
		{
			path:'/show/:safename/login',
			name: 'showlogin',
			component: Login
		},
		{
			path: '/show/:safename/trailer',
			name: 'trailer',
			component: Trailer
		},
		{
			path: '/show/:safename/acclaim',
			name: 'acclaim',
			component: Acclaim
		},
		{
			path: '/show/:safename/categories',
			name: 'categories',
			component: Categories
		},
		{
			path: '/show/:safename/episodes/:page',
			name: 'episodes',
			component: Episodes
		},
		{
			path: '/show/:safename/episode/:episode',
			name: 'episode',
			component: Episode
		},
		{
			path: '/show/:safename/next',
			name: 'next',
			component: Next
		}
  	]
});

function resetShow(){

}

export default router;
