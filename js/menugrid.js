$(document).ready(function () {

	// Test item
	var item = {
		Glyphicon: 'pencil',
		Title: 'Écoles',
		URL: {
			Url: 'http://google.com',
			Description: 'Lien vers les formations'
		},
		NotificationListReference: 'Formations',
	};

	var menu = new MenuGrid('#menu');
	menu.addItem(item);
	menu.addItem(item);
	menu.addItem(item);
	menu.addItem(item);
	menu.addItem(item);
	menu.render();
	menu.enableNotifications();

});






var MenuGridItem = function (item) {
	this.icon = item['Glyphicon'];
	this.title = item['Title'];
	this.url = item['URL']['Url'];
	this.url_description = item['URL']['Description'];
	this.reference = item['NotificationListReference']
}

MenuGridItem.prototype.render = function () {
	var item = document.createElement('li');
	item.setAttribute('data-reference', this.reference);
	var link = document.createElement('a');
	link.setAttribute('href', this.url);
	link.setAttribute('title', this.url_description);
	link.setAttribute('target', '_top');
	var icon = document.createElement('i');
	icon.setAttribute('class', 'glyphicon glyphicon-'+this.icon);
	var badge = document.createElement('span');
	badge.setAttribute('class', 'badge animated');
	var h4 = document.createElement('h4');
	h4.appendChild(document.createTextNode(this.title));
	link.appendChild(icon);
	link.appendChild(badge);
	link.appendChild(h4);
	item.appendChild(link);
	return item;
}



var MenuGrid = function (selector) {
	this.selector = selector;
	this.itemBackgroundColor = '#0072C6';
	this.itemIconColor = '#FFF';
	this.itemTextColor = '#000';
	this.itemBadgeBackgroundColor = '#FF3C00';
	this.itemBadgeTextColor = '#FFF';
	this.itemIconHoverColor = '#0DFF5E';
	this.menuWidth = '680px';
	this.notificationAnimation = 'bounceIn';
	this.itemShape = 'square';
	this.items = [];
}


MenuGrid.prototype.addItem = function (item) {
	this.items.push(new MenuGridItem(item));
}

MenuGrid.prototype.render = function () {
	var self = this;
	var list = document.createElement('ul');
	$.each(this.items, function (key, item) {
		list.appendChild(item.render());
	});
	$(this.selector).addClass(this.itemShape);
	$(this.selector).css('width', this.menuWidth);
	$(this.selector).append(list);
	$(this.selector).find('a').css('color', this.itemTextColor);
	$(this.selector).find('a > i').css({
		'background-color': this.itemBackgroundColor,
		'color': this.itemIconColor
	});
	$(this.selector).find('a > span.badge').css({
		'background-color': this.itemBadgeBackgroundColor,
		'color': this.itemBadgeTextColor
	});
	$(this.selector).find('li').hover(
		function () {
			$(this).find('i').css('color', self.itemIconHoverColor);
		},
		function () {
			$(this).find('i').css('color', self.itemIconColor);
		}
	);
}

MenuGrid.prototype.enableNotifications = function () {
	self = this;
	$(this.selector).find('li').each(function (key, item) {
		// The notification will be the result from the ajax request from
		// from the reference list.
		var notification = 4;
		$(this).find('span.badge').html(notification).addClass(self.notificationAnimation);
	});
}






