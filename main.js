var photos = [ 'dolphins.jpg', 'kelp.jpg', 'reef.jpg'];

function View (tagName, obj) {
	this.element = document.createElement(tagName);
	this.data = obj || null;
}

View.prototype.render = function () {};
View.prototype.bindEvents = function () {};
View.prototype.destroy = function () {
	this.element.parentElement.removeChild(this.element);
};

function GalleryView () {
	View.apply(this, arguments);
}

GalleryView.prototype = Object.create(View.prototype);

GalleryView.prototype.render = function () {
	var _this = this;
	// create an img tag to show the full image


	var fullScale = document.createElement('img');
	fullScale.classList.add('full-scale');
	this.element.appendChild(fullScale);
	fullScale.src = this.data[0];

	var wrapper = document.createElement('div');
	wrapper.classList.add('wrapper');
	this.element.appendChild(wrapper);	
	// create a Thumbnail (img) for each URL in this.data
	// 		* render it
	// 		* append its element to the galleryView
	this.data.forEach(function (imgURL) {
		var thumbnail = new ThumbnailView ('img', imgURL);
		thumbnail.render();
		_this.element.appendChild(thumbnail.element);
		wrapper.appendChild(thumbnail.element);
	});

	this.bindEvents();
};

function ThumbnailView () {
	View.apply(this, arguments);
}

GalleryView.prototype.bindEvents = function () {
	var _this = this;
	if (this.element.firstChild.classList.contains('full-scale')) {
	this.element.firstChild.addEventListener('click', function () {
		//var fullScale = document.querySelector('.full-scale');
		_this.element.firstChild.classList.toggle('fullscreen');
	})
	}
}

ThumbnailView.prototype = Object.create(View.prototype);

ThumbnailView.prototype.render = function () {
	// set our element's src attribute to this.data
	this.element.setAttribute('src', this.data);
	this.element.classList.add('thumbnail');
	this.bindEvents();
};

ThumbnailView.prototype.bindEvents = function () {
	var _this = this;
	// add an event listener to this.element (img)
	// when clicked, the event handler will find the .full-scale
	// element and set its src attribute to this.data
	this.element.addEventListener('click', function () {
		var fullScale = document.querySelector('.full-scale');
		fullScale.setAttribute('src', _this.data);	
	})

	// this.element.addEventListener('click', function () {
	// 	var fullScreen = document.querySelector('.full-screen');
	// 	fullScreen.setAttribute('src', _this.data);
	// })
};

var gv = new GalleryView('div', photos);

gv.render();

document.body.appendChild(gv.element);