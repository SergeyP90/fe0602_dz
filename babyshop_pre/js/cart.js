$('document').ready(function() {

	var cartItemsString = localStorage.getItem("cartItems");
    var cartItems = JSON.parse(cartItemsString) || [];

    for (var i=0; i < cartItems.length; i++) {
        outputCart(cartItems[i]);
    }

//удаление товаров из корзины
	$(".main-cart").click(function (event) {
        var $target = $(event.target);
        if ($target.is(".delete > button")) {
            var $tr = $target.closest("tr");
            deleteFromCart($tr);
        }
    });

//вывод содержимого корзины
    function outputCart(item) {
    	$(".main-cart").removeClass("empty");

        $(".summary-table > tbody").append(
            '<tr>' +
            '<td class="delete"><button type="button">X</button></td>' +
            '<td class="articul_cart">' + item.articul + '</td>' +
            '<td class="image-goods_cart"><img alt="' + item.img + '" src="' + item.img + '"</td>' +
            '<td class="name-goods_cart">' + item.name + '</td>' +
            '<td class="price-goods_cart">' + '<span class="price-value_cart">' + item.price + '</span><span class="currency_cart"> грн.</span>' + '</td>' +
            '</tr>'
        );

        updateSum();
        updateLocalStorage();
    }

//удаление из товаров из корзины
    function deleteFromCart($tr) {
        $tr.remove();
        updateSum();
        updateLocalStorage();

        if ($(".summary-table > tbody > tr").length === 0) {
            $(".main-cart").addClass("empty");
        }
    }

//подсчёт суммы корзины
    function updateSum() {
        var sum = 0;

        $(".summary-table > tbody > tr").each(function (i, tr) {
            var price = $(tr).find(".price-value_cart").text();
            sum += +price;
        });

        $(".summary-table .sum").text(sum + " грн.");
    }

//обновление localStorage
    function updateLocalStorage() {
        var cartItems = [];

        $(".summary-table > tbody > tr").each(function (i, tr) {
			var item = {
				articul: $(this).find('.articul_cart').text(),
	    	    img: $(this).find('.image-goods_cart > img').attr("src"),
	        	name: $(this).find('.name-goods_cart').text(),
	        	price: $(this).find('.price-goods_cart .price-value_cart').text()
            };

            cartItems.push(item);
        });

        var cartItemsString = JSON.stringify(cartItems);
        localStorage.setItem("cartItems", cartItemsString);
    }

});


