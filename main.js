var photos = [ 'dolphins.jpg', 'kelp.jpg', 'reef.jpg'];

function View (tagName, obj) {
	this.element = $(document.createElement(tagName));
	this.data = obj || null;
}

View.prototype.render = function () {};
View.prototype.bindEvents = function () {};
View.prototype.destroy = function () {
	this.element.remove();
};

function GalleryView () {
	View.apply(this, arguments);
}

GalleryView.prototype = Object.create(View.prototype);

GalleryView.prototype.render = function () {
	var _this = this;
	// create an img tag to show the full image


	var fullScale = $(document.createElement('img'));
	fullScale.addClass('full-scale');
	this.element.append(fullScale);
	fullScale.attr('src', this.data[0]);

	var wrapper = $(document.createElement('div'));
	wrapper.addClass('wrapper');
	this.element.append(wrapper);	
	// create a Thumbnail (img) for each URL in this.data
	// 		* render it
	// 		* append its element to the galleryView
	this.data.forEach(function (imgURL) {
		var thumbnail = new ThumbnailView ('img', imgURL);
		thumbnail.render();
		_this.element.append(thumbnail.element);
		wrapper.append(thumbnail.element);
	});

	this.bindEvents();
};

function ThumbnailView () {
	View.apply(this, arguments);
}

GalleryView.prototype.bindEvents = function () {
	var fullScale = this.element.find('.full-scale');
	$(fullScale).on('click', function () {	
		fullScale.toggleClass('fullscreen');
	});
}

ThumbnailView.prototype = Object.create(View.prototype);

ThumbnailView.prototype.render = function () {
	// set our element's src attribute to this.data
	this.element
		.attr('src', this.data)
		.addClass('thumbnail');
	this.bindEvents();
};

ThumbnailView.prototype.bindEvents = function () {
	var _this = this;
	// add an event listener to this.element (img)
	// when clicked, the event handler will find the .full-scale
	// element and set its src attribute to this.data
	$(this.element).on('click', function () {
		var fullScale = $('.full-scale');
		fullScale.attr('src', _this.data);	
	})

	// this.element.addEventListener('click', function () {
	// 	var fullScreen = document.querySelector('.full-screen');
	// 	fullScreen.setAttribute('src', _this.data);
	// })
};

var gv = new GalleryView('div', photos);

gv.render();

$(document.body).append(gv.element);