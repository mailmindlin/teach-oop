window['nameGenerator'] = {
	words: {
		//creds to https://gist.github.com/jjdelc/1868136
<<<<<<< HEAD
		adj:["red","orange","yellow","green","blue","purple","pink","turquoise","almond","antique-brass","apricot","aquamarine","asparagus","atomic-tangerine","banana-mania","beaver","bittersweet","black","blizzard-blue","blue","blue-bell","blue-gray","blue-green","blue-violet","blush","brick-red","brown","burnt-orange","burnt-sienna","cadet-blue","canary","caribbean-green","carnation-pink","cerise","cerulean","chestnut","copper","cornflower","cotton-candy","dandelion","denim","desert-sand","eggplant","electric-lime","fern","forest-green","fuchsia","fuzzy-wuzzy","gold","goldenrod","granny-smith-apple","gray","green","green-blue","green-yellow","hot-magenta","inchworm","indigo","jazzberry-jam","jungle-green","laser-lemon","lavender","lemon-yellow","macaroni-and-cheese","magenta","magic-mint","mahogany","maize","manatee","mango-tango","maroon","mauvelous","melon","midnight-blue","mountain-meadow","mulberry","navy-blue","neon-carrot","olive-green","orange","orange-red","orange-yellow","orchid","outer-space","outrageous-orange","pacific-blue","peach","periwinkle","piggy-pink","pine-green","pink-flamingo","pink-sherbet","plum","purple-heart","purple-mountain's-majesty","purple-pizzazz","radical-red","raw-sienna","raw-umber","razzle-dazzle-rose","razzmatazz","red","red-orange","red-violet","robin's-egg-blue","royal-purple","salmon","scarlet","screamin'-green","sea-green","sepia","shadow","shamrock","shocking-pink","silver","sky-blue","spring-green","sunglow","sunset-orange","tan","teal-blue","thistle","tickle-me-pink","timberwolf","tropical-rain-forest","tumbleweed","turquoise-blue","unmellow-yellow","violet-(purple)","violet-blue","violet-red","vivid-tangerine","vivid-violet","white","wild-blue-yonder","wild-strawberry","wild-watermelon","wisteria","yellow","yellow-green","yellow-orange","annoying","upsidedown","awesome","foo","bar","baz","frolicking","speedy","boring"],
		noun:["lion","unicorn","zebra","horse","cat","car","house","foo","bar","baz","antelope","chimaera","hydra","racecar","program","object","function"],
		verb:["get","set","make","eat","generate","finalize","delete","awesomitize"]
	},
	capitalize:function(str){
		return str.substring(0,1).toUpperCase()+str.substring(1,string.length);
=======
		adj:["red","orange","yellow","green","blue","purple","pink","turquoise","almond","antique-brass","apricot","aquamarine","asparagus","atomic-tangerine","banana-mania","beaver","bittersweet","black","blizzard-blue","blue","blue-bell","blue-gray","blue-green","blue-violet","blush","brick-red","brown","burnt-orange","burnt-sienna","cadet-blue","canary","caribbean-green","carnation-pink","cerise","cerulean","chestnut","copper","cornflower","cotton-candy","dandelion","denim","desert-sand","eggplant","electric-lime","fern","forest-green","fuchsia","fuzzy-wuzzy","gold","goldenrod","granny-smith-apple","gray","green","green-blue","green-yellow","hot-magenta","inchworm","indigo","jazzberry-jam","jungle-green","laser-lemon","lavender","lemon-yellow","macaroni-and-cheese","magenta","magic-mint","mahogany","maize","manatee","mango-tango","maroon","mauvelous","melon","midnight-blue","mountain-meadow","mulberry","navy-blue","neon-carrot","olive-green","orange","orange-red","orange-yellow","orchid","outer-space","outrageous-orange","pacific-blue","peach","periwinkle","piggy-pink","pine-green","pink-flamingo","pink-sherbet","plum","purple-heart","purple-mountain's-majesty","purple-pizzazz","radical-red","raw-sienna","raw-umber","razzle-dazzle-rose","razzmatazz","red","red-orange","red-violet","robin's-egg-blue","royal-purple","salmon","scarlet","screamin'-green","sea-green","sepia","shadow","shamrock","shocking-pink","silver","sky-blue","spring-green","sunglow","sunset-orange","tan","teal-blue","thistle","tickle-me-pink","timberwolf","tropical-rain-forest","tumbleweed","turquoise-blue","unmellow-yellow","violet-(purple)","violet-blue","violet-red","vivid-tangerine","vivid-violet","white","wild-blue-yonder","wild-strawberry","wild-watermelon","wisteria","yellow","yellow-green","yellow-orange","annoying","upsidedown","awesome","foo","bar","baz","frolicking","speedy","boring","iron","super","amazing","weird","fast","slow"],
		noun:["lion","unicorn","zebra","horse","cat","car","house","foo","bar","baz","antelope","chimaera","hydra","racecar","program","object","function","princess","prince","queen","turtle","king","teen","teddybear","wormhole","physicist","dragon","boson","jabberwocky","fridge","spoon","phone","whale","chocolate","hamster","chicken","fork","panda","tomato","bananas","eater","giraffe","man"],
		verb:["get","set","make","eat","generate","finalize","delete","awesomitize"]
	},
	capitalize:function(str){
		return str.substring(0,1).toUpperCase()+str.substring(1,str.length);
>>>>>>> FETCH_HEAD
	},
	rndFrom:function(arr) {
		return arr[Math.round(Math.random()*(arr.length-1))];
	},
	"stackName":function() {
<<<<<<< HEAD
		return ((Math.random()<.125)?rndFrom(words.verv)+capitalize(rndFrom(words.adj)):rndFrom(words.adj))+((Math.random()<.5)?capitalize(rndFrom(words.adj)):"")+capitalize(rndFrom(words.noun));
	},
	"objName":function() {
		var out="",c=!1;
		if(Math.random()<0.0001){out+="my";c=!0;}else if(Math.random()<0.07){out+=rndFrom(words.verb);c=!0}
		if(Math.random()<0.67){out+=c?capitalize(rndFrom(words.adj)):rndFrom(words.adj);c=!0;}
		out+=c?capitalize(rndFrom(words.noun)):rndFrom(words.noun);
=======
		return ((Math.random()<.125)?this.rndFrom(this.words.verb)+this.capitalize(this.rndFrom(this.words.adj)):this.rndFrom(this.words.adj))+((Math.random()<.5)?this.capitalize(this.rndFrom(this.words.adj)):"")+this.capitalize(this.rndFrom(this.words.noun));
	},
	"objName":function() {
		var out="",c=!1;
		if(Math.random()<0.0001){out+="my";c=!0;}else if(Math.random()<0.07){out+=this.rndFrom(this.words.verb);c=!0}
		if(Math.random()<0.67){out+=c?this.capitalize(this.rndFrom(this.words.adj)):this.rndFrom(this.words.adj);c=!0;}
		out+=c?this.capitalize(this.rndFrom(this.words.noun)):this.rndFrom(this.words.noun);
>>>>>>> FETCH_HEAD
		return out;
	}
};