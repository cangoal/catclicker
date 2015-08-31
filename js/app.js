var data={
	activeCat: 'cat1',
	cats:[
		{
			name: 'cat1',
			imgUrl: 'contents/cat1.jpg',
			count: 0
		},
		{
			name: 'cat2',
			imgUrl: 'contents/cat2.jpeg',
			count: 0
		},
		{
			name:'cat3',
			imgUrl: 'contents/cat3.jpeg',
			count: 0
		},
		{
			name:'cat4',
			imgUrl: 'contents/cat4.jpeg',
			count: 0
		},
		{
			name:'cat5',
			imgUrl: 'contents/cat5.jpg',
			count: 0
		},
	]
};


var octopus={
	getCatList: function(){
		return data.cats;
	},

	getActiveCat: function(){
		return data.cats.filter(function(cat){
			return cat.name == data.activeCat;
		})[0];
	},

	viewActiveCat: function(catName){
		data.activeCat = catName;
		view.renderCatDetail();
	},

	init: function(){
		view.init();
	}
};

var view={
	init: function(){
		this.$catList = $('#cat-list');
		this.catListTemplate = $('script[data-template="cat"]').html();
		this.$catDetail = $('#cat-detail');
		this.catDetailTemplate = $('script[data-template="cat-detail"]').html();

		this.render();
	},

	render: function(){
		this.renderCatList();
		this.renderCatDetail();
	},

	renderCatList: function(){
		var $catList = this.$catList,
			catListTemplate = this.catListTemplate;
		$catList.html('');
		octopus.getCatList().forEach(function(cat){
			var thisCat = catListTemplate.replace(/{{name}}/g, cat.name);
			$catList.append(thisCat);
		});

		// choose different cat to view
		this.$catList.on('click', '.cat-link', function(e){
			var catName = $(this).find('li').text();
			octopus.viewActiveCat(catName);
		});
	},

	renderCatDetail: function(){
		var $catDetail = this.$catDetail,
			catDetailTemplate = this.catDetailTemplate;
		$catDetail.html('');
		var activeCat = octopus.getActiveCat();
		var thisActiveCat = catDetailTemplate.replace(/{{name}}/g, activeCat.name);
			thisActiveCat = thisActiveCat.replace(/{{count}}/g, activeCat.count);
			thisActiveCat = thisActiveCat.replace(/{{imgUrl}}/g, activeCat.imgUrl);
		$catDetail.append(thisActiveCat);
	}
};

octopus.init();