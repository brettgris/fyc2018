import Counterpart from './shows/Counterpart';
import Power from './shows/Power';
import Outlander from './shows/Outlander';

import Vida from './shows/Vida';
import Sweetbitter from './shows/Sweetbitter';
import SurvivorsRemorse from './shows/SurvivorsRemorse';
import AshVsEvilDead from './shows/AshVsEvilDead';

import HowardsEnd from './shows/HowardsEnd';
import GirlfriendExperience from './shows/GirlfriendExperience';

import TicklingGiants from './docs/TicklingGiants';
import Wasted from './docs/Wasted';
import WhatHauntsUs from './docs/WhatHauntsUs';

export default [
	{
		"display":"Drama",
		"safename": "drama",
		"shows":[
			Counterpart, Power, Outlander
		]
	},{
		"display":"Comedy",
		"safename": "comedy",
		"shows":[
			Vida, Sweetbitter,SurvivorsRemorse,AshVsEvilDead
		]
	},{
		"display":"Limited Series",
		"safename": "limitedseries",
		"shows":[
			GirlfriendExperience, HowardsEnd
		]
	},{
		"display":"Documentary",
		"safename": "documentary",
		"shows":[
			TicklingGiants, Wasted, WhatHauntsUs
		]
	}
]
