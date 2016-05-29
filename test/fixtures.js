function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            subCategory: '碳酸饮料',
            category: '食品',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '羽毛球',
            unit: '个',
            subCategory: '球类',
            category: '运动器材',
            price: 1.00
        },
        {
            barcode: 'ITEM000002',
            name: '雪碧',
            unit: '瓶',
            subCategory: '碳酸饮料',
            category: '食品',
            price: 3.00
        },
        {
            barcode: 'ITEM000003',
            name: '苹果',
            unit: '斤',
            subCategory: '水果',
            category: '食品',
            price: 5.50
        },
        {
            barcode: 'ITEM000004',
            name: '钢笔',
            unit: '个',
            subCategory: '文具',
            category: '学习用品',
            price: 8.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            subCategory: '零食',
            category: '食品',
            price: 4.50
        }
    ];
}
function loadPromotions() {
    return [
        {
            type: 'FULL_100_PRESENT_1_PRODUCT',
            barcodes: [
                'ITEM000000',
            ]
        }
    ];
}

