import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';

import Categories from './data/Categories';
const Shows = _.flatMap(Categories, (c)=>c.shows);

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		categories: Categories,
		shows: Shows,
		show: null,
		episode: null,
		next: null,
		authenticated: false,
		videoID: null,
		page: 0,
		size:{
			width: 1024,
			height: 768,
			ratio: 1024/768
		}
	},
	mutations: {
		show(state,payload){
			if (payload){
				const show = _.find(state.shows,(s)=>s.safename===payload);
				if (show) show.episodes = _.filter(show.episodes, (e)=> moment(e.date) < moment() );

				state.show = show;
			} else {
				state.show = null;
			}
		},
		episode(state,payload){

			if (payload&&state.show&&state.show.episodes){
				state.episode = _.find(state.show.episodes,(s)=>s.number===payload);
				state.next = _.find(state.show.episodes, (s)=>s.number==(Number(payload)+1));
			} else {
				state.episode = null;
			}
		},
		authenticated(state,payload){
			state.authenticated = payload;
		},
		video(state,payload){
			state.videoID = payload;
		},
		page(state,payload){
			state.page = payload;
		},
		size(state,payload){
			state.size = payload;
		}
	},
	actions: {
		clearShow({commit}){
			commit("show");
			commit("episode");
			Cookies.remove("fycshow");
			Cookies.remove("fycepisode");
			// localStorage.removeItem('show');
			// localStorage.removeItem('episode');
		},
		setShow({commit},safename){
			Cookies.set("fycshow", safename);
			// localStorage.setItem('show', safename);
			commit("show",safename);
		},
		setEpisode({commit},number){
			Cookies.set("fycepisode", number);
			// localStorage.setItem('episode', number);
			commit("episode",number);
		},
		isAuthenticated({commit}, $auth){
			commit("authenticated", $auth.loggedIn() );
		},
		async getData({commit},params){
			commit('video', null);
			// console.log( params )
			axios.get(`http://brettgrisinger.com/fyc/index.php?token=${params.token}&show=${params.show}&episode=${params.episode}`)
			.then((res)=>{
				//console.log( "pass", res );
				if (res.data){
					if (res.data.status&&res.data.id){
						commit('video',res.data.id);
					} else {
						params.callback(false);
					}
				} else {
					params.callback(false);
				}
			}).catch((err)=>{
				//console.log( "err", err );
				params.callback(false);
			});
		},
		setPage({commit},number){
			commit("page",parseInt(number));
		},
		setSize({commit},size){
			commit("size",size);
		}
	}
})
