describe('pos 满100加一元换购', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000000-12',
            'ITEM000001-15',
            'ITEM000003-10'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printReceipt(inputs);

        var expectText =
            '*<没钱赚商店>购物清单*\n' +
            '名称：可口可乐，数量：12瓶，单价：3.00(元)，小计：36.00(元)\n' +
            '名称：羽毛球，数量：15个，单价：1.00(元)，小计：15.00(元)\n' +
            '名称：苹果，数量：10斤，单价：5.50(元)，小计：55.00(元)\n' +
            '名称：可口可乐，数量：1个，单价：3.00(元)，小计：1.00(元)，优惠：2.00(元)\n' +
            '----------------------------------------\n' +
            '满100加一元换购商品：名称：可口可乐，数量：1个\n' +
            '****************************************\n' +
            '----------------------\n' +
            '总计：107.00(元) 节省：2.00(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});

describe('unit test 满100加一元换购', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000000-12',
            'ITEM000001-15',
            'ITEM000003-10'
        ];
    });
    describe('buildCartItems', function () {
        it('should print correct cartItems', function () {
            var cartItems = buildCartItems(inputs);
            var expectCartItems = [
                {
                    item: {barcode: 'ITEM000000-12', name: '可口可乐', unit: '瓶', price: 3.00},
                    count: 12
                },
                {
                    item: {barcode: 'ITEM000001-15', name: '羽毛球', unit: '个', price: 1.00},
                    count: 15
                },
                {
                    item: {barcode: 'ITEM000003-10', name: '苹果', unit: '斤', price: 5.50},
                    count: 10
                }
            ];
            expect(cartItems).toEqual(expectCartItems);
        });
    });
    describe('buildReceiptItems', function () {
        it('should print correct cartItems', function () {
            var receiptItems = buildReceiptItems(buildCartItems(inputs));
            var expectReceiptItems = [
                {
                    cartItem: {barcode: 'ITEM000000-12', name: '可口可乐', unit: '瓶', price: 3.00, count: 12},
                    subtotal: 36.00
                },
                {
                    cartItem: {barcode: 'ITEM000001-15', name: '羽毛球', unit: '个', price: 1.00, count: 15},
                    subtotal: 15.00
                },
                {
                    cartItem: {barcode: 'ITEM000003-10', name: '苹果', unit: '斤', price: 5.50, count: 10},
                    subtotal: 55.00
                }
            ];
            expect(receiptItems).toEqual(expectReceiptItems);
        });
    });
    describe('buildReceipt', function () {
        it('should print correct receipt', function () {
            var receipt = buildReceipt(buildReceiptItems(buildCartItems(inputs)));
            var expectReceipt = {
                receiptItems: [
                    {
                        cartItem: {barcode: 'ITEM000000-12', name: '可口可乐', unit: '瓶', price: 3.00, count: 12},
                        subtotal: 36.00
                    },
                    {
                        cartItem: {barcode: 'ITEM000001-15', name: '羽毛球', unit: '个', price: 1.00, count: 15},
                        subtotal: 15.00
                    },
                    {
                        cartItem: {barcode: 'ITEM000003-10', name: '苹果', unit: '斤', price: 5.50, count: 10},
                        subtotal: 55.00
                    }
                ],
                total: 106.00
            };
            expect(receipt).toEqual(expectReceipt);
        })
    });
});

describe('pos 少于100', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000000-3',
            'ITEM000001-5',
            'ITEM000003',
            'ITEM000003',
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printReceipt(inputs);

        var expectText =
            '*<没钱赚商店>购物清单*\n' +
            '名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：9.00(元)\n' +
            '名称：羽毛球，数量：5个，单价：1.00(元)，小计：5.00(元)\n' +
            '名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '----------------------\n' +
            '总计：25.00(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});