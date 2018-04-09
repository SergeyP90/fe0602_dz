$('document').ready(function() {
	loadGoods();
});


//загружаем товары на страницу
function loadGoods() {
	var out = '';
	for (var key in goods) {
		out += '<figure>';
		out += '<p class="articul">' + goods[key].articul + '</p>';
		out += '<div class="image-goods"><img src=".' + goods[key].image + '"></div>';
		out += '<figcaption>';
		out += '<h3 class="name-goods">' + goods[key].name + '</h3>';
		out += '<div class="price-goods">' + '<span class="price-value">' + goods[key].cost + '</span><span class="currency">грн.</span></div>';
		out += '<p class="availability">' + goods[key].availability + '</p>';
		out += '<p class="description-goods">' + goods[key].description + '</p>';
		out += '<button type="button" class="addtoCart">Добавить в корзину</button>';
		out += '</figcaption>';
		out += '</figure>';
	}

	$('#list-goods').append(out);
	addToLocalStorage();
}

//добавление товаров в LocalStorage
function addToLocalStorage() {

	var cartItemsString = localStorage.getItem("cartItems");
    var cartItems = JSON.parse(cartItemsString) || [];

	$('.addtoCart').click(function(event) {
		var $figure = $(event.target).closest('figure');
		var item = {
			articul: $figure.find('.articul').text(),
	        img: $figure.find('img').attr("src"),
	        name: $figure.find('.name-goods').text(),
	        price: $figure.find('.price-goods .price-value').text()
		}

		cartItems.push(item);
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		console.log(cartItems);
	});
	
}


