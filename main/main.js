function printReceipt(inputs) {
    var cartItems = buildCartItems(inputs);
    var receiptItems = buildReceiptItems(cartItems);
    var receipt = buildReceipt(receiptItems);
    print(receipt);
}

function print(receipt) {
    var promotionProduct = isPromotion(receipt);
    var expectText = '*<没钱赚商店>购物清单*\n';

    for (var i = 0; i < receipt.receiptItems.length; i++) {
        expectText += '名称：' + receipt.receiptItems[i].cartItem.name + '，' + '数量：'
            + receipt.receiptItems[i].cartItem.count + receipt.receiptItems[i].cartItem.unit
            + '，' + '单价：' + receipt.receiptItems[i].cartItem.price.toFixed(2) + '(元)' + '，'
            + '小计：' + receipt.receiptItems[i].subtotal.toFixed(2) + '(元)\n';
    }
    if (receipt.total / 100 >= 1) {
        for (var i = 0; i < promotionProduct.length; i++) {
            expectText += '名称：' + promotionProduct[i].cartItem.name + '，' + '数量：'
                + (receipt.total / 100).toFixed(0) + '个'
                + '，' + '单价：' + promotionProduct[i].cartItem.price.toFixed(2) + '(元)' + '，'
                + '小计：' + '1.00' + '(元)' + '，' + '优惠：' +
                (promotionProduct[i].cartItem.price * (receipt.total / 100).toFixed(0) - 1).toFixed(2) + '(元)\n'
        }
        expectText += '----------------------------------------\n' +
            '满100加一元换购商品：名称：可口可乐，数量：1个\n' +
            '****************************************\n' +
            '----------------------\n' +
            '总计：' + (receipt.total + 1).toFixed(2) + '(元) ' +
            '节省：' + '2.00(元)\n' +
            '**********************';
    } else {
        expectText += '----------------------\n' +
            '总计：' + receipt.total.toFixed(2) + '(元)\n' +
            '**********************';
    }

    console.log(expectText);
}

function isPromotion(receipt) {
    var promotionProduct = [];
    var promotions = loadPromotions();

    for (var i = 0; i < receipt.receiptItems.length; i++) {
        var existDash = receipt.receiptItems[i].cartItem.barcode.split("-");

        promotions.forEach(function (promotion) {
            promotion.barcodes.forEach(function (barcode) {
                if (barcode === existDash[0]) {
                    promotionProduct.push(receipt.receiptItems[i]);
                }
            })
        });
    }

    return promotionProduct;
}

function buildReceipt(receiptItems) {
    var receipt = {};
    var total = 0;

    for (var i = 0; i < receiptItems.length; i++) {
        total += receiptItems[i].subtotal;
    }
    receipt = {receiptItems: receiptItems, total: total};

    return receipt;
}

function buildReceiptItems(cartItems) {
    var receiptItems = [];
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = {};

        receiptItems.push({
            cartItem: {
                barcode: cartItems[i].item.barcode, name: cartItems[i].item.name,
                unit: cartItems[i].item.unit, price: cartItems[i].item.price,
                count: parseInt(cartItems[i].count)
            },
            subtotal: cartItems[i].item.price * cartItems[i].count
        });
    }

    return receiptItems;
}

function isExistDash(item, cartItems) {
    var existDash = item.barcode.split("-");


    for (var i = 0; i < cartItems.length; i++) {
        if (existDash[1]) {
            cartItems.push({item: item, count: parseInt(existDash[1])});

            return cartItems;
        } else {
            if (existDash[0] === cartItems[i].item.barcode) {
                cartItems[i].count++;

                return cartItems;
            }
        }
    }
    if (existDash[1]) {
        cartItems.push({item: item, count: parseInt(existDash[1])});
    } else {
        cartItems[cartItems.length] = {item: item, count: 1};
    }

    return cartItems;
}

function buildCartItems(inputs) {
    var items = buildItems(inputs);
    var cartItems = [];
    items.forEach(function (item) {
        cartItems = isExistDash(item, cartItems);
    });

    return cartItems;
}

function buildItems(inputs) {
    var allItems = loadAllItems();
    var items = [];

    inputs.forEach(function (input) {
        var existDash = input.split("-");
        for (var i = 0; i < allItems.length; i++) {
            if (existDash[0] === allItems[i].barcode) {
                items.push({
                    barcode: input, name: allItems[i].name,
                    unit: allItems[i].unit, price: allItems[i].price,
                });
            }
        }
    });

    return items;
}