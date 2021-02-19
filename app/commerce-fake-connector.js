import UserData from './data/makana/UserData'

export default class CommerceFakeConnector {

    getCart() {
        return UserData.cart
    }

    getProduct(id) {
        const product = {
            "currency": "USD",
            "id": "793775362380M",
            "imageGroups": [
                {
                    "images": [
                        {
                            "alt": "Striped Silk Tie, Red, large",
                            "disBaseLink": "https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/ZZSA_073/on/demandware.static/-/Sites-apparel-m-catalog/default/dw09c2b476/images/large/PG.949114314S.REDSI.PZ.jpg",
                            "link": "https://zzsa-073.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw09c2b476/images/large/PG.949114314S.REDSI.PZ.jpg",
                            "title": "Striped Silk Tie, Red"
                        },
                        {
                            "alt": "Striped Silk Tie, Red, large",
                            "disBaseLink": "https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/ZZSA_073/on/demandware.static/-/Sites-apparel-m-catalog/default/dwf33b51ac/images/large/PG.949114314S.REDSI.BZ.jpg",
                            "link": "https://zzsa-073.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dwf33b51ac/images/large/PG.949114314S.REDSI.BZ.jpg",
                            "title": "Striped Silk Tie, Red"
                        }
                    ],
                    "variationAttributes": [
                        {
                            "id": "color",
                            "values": [
                                {
                                    "value": "REDSI"
                                }
                            ]
                        }
                    ],
                    "viewType": "large"
                },
                {
                    "images": [
                        {
                            "alt": "Striped Silk Tie, Red, medium",
                            "disBaseLink": "https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/ZZSA_073/on/demandware.static/-/Sites-apparel-m-catalog/default/dw23ccf9b1/images/medium/PG.949114314S.REDSI.PZ.jpg",
                            "link": "https://zzsa-073.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw23ccf9b1/images/medium/PG.949114314S.REDSI.PZ.jpg",
                            "title": "Striped Silk Tie, Red"
                        },
                        {
                            "alt": "Striped Silk Tie, Red, medium",
                            "disBaseLink": "https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/ZZSA_073/on/demandware.static/-/Sites-apparel-m-catalog/default/dw7c4dd07f/images/medium/PG.949114314S.REDSI.BZ.jpg",
                            "link": "https://zzsa-073.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw7c4dd07f/images/medium/PG.949114314S.REDSI.BZ.jpg",
                            "title": "Striped Silk Tie, Red"
                        }
                    ],
                    "variationAttributes": [
                        {
                            "id": "color",
                            "values": [
                                {
                                    "value": "REDSI"
                                }
                            ]
                        }
                    ],
                    "viewType": "medium"
                },
                {
                    "images": [
                        {
                            "alt": "Striped Silk Tie, Red, small",
                            "disBaseLink": "https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/ZZSA_073/on/demandware.static/-/Sites-apparel-m-catalog/default/dwf5e19358/images/small/PG.949114314S.REDSI.PZ.jpg",
                            "link": "https://zzsa-073.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dwf5e19358/images/small/PG.949114314S.REDSI.PZ.jpg",
                            "title": "Striped Silk Tie, Red"
                        },
                        {
                            "alt": "Striped Silk Tie, Red, small",
                            "disBaseLink": "https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/ZZSA_073/on/demandware.static/-/Sites-apparel-m-catalog/default/dw3b75ded6/images/small/PG.949114314S.REDSI.BZ.jpg",
                            "link": "https://zzsa-073.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw3b75ded6/images/small/PG.949114314S.REDSI.BZ.jpg",
                            "title": "Striped Silk Tie, Red"
                        }
                    ],
                    "variationAttributes": [
                        {
                            "id": "color",
                            "values": [
                                {
                                    "value": "REDSI"
                                }
                            ]
                        }
                    ],
                    "viewType": "small"
                },
                {
                    "images": [
                        {
                            "alt": "Striped Silk Tie, Red, swatch",
                            "disBaseLink": "https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/ZZSA_073/on/demandware.static/-/Sites-apparel-m-catalog/default/dw68a4e1e5/images/swatch/PG.949114314S.REDSI.CP.jpg",
                            "link": "https://zzsa-073.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw68a4e1e5/images/swatch/PG.949114314S.REDSI.CP.jpg",
                            "title": "Striped Silk Tie, Red"
                        }
                    ],
                    "variationAttributes": [
                        {
                            "id": "color",
                            "values": [
                                {
                                    "value": "REDSI"
                                }
                            ]
                        }
                    ],
                    "viewType": "swatch"
                }
            ],
            "inventory": {
                "ats": 100,
                "backorderable": false,
                "id": "inventory_m",
                "orderable": true,
                "preorderable": false,
                "stockLevel": 100
            },
            "longDescription": "This silk tie works well with a Commerce Cloud Store dress shirt and suit It's perfect for any occasion. ",
            "master": {
                "masterId": "25752986M",
                "orderable": true,
                "price": 29.99
            },
            "minOrderQuantity": 1,
            "name": "Dave's Fake Product!",
            "pageDescription": "This silk tie works well with a Commerce Cloud Store dress shirt and suit It's perfect for any occasion. ",
            "pageTitle": "Striped Silk Tie",
            "price": 29.99,
            "shortDescription": "This silk tie works well with a Commerce Cloud Store dress shirt and suit. It's perfect for any occasion. ",
            "stepQuantity": 1,
            "type": {
                "variant": true
            },
            "upc": "793775362380",
            "validFrom": {
                "default": "2011-02-07T05:00:00.000Z"
            },
            "variants": [
                {
                    "orderable": true,
                    "price": 29.99,
                    "productId": "793775370033M",
                    "variationValues": {
                        "color": "TURQUSI"
                    }
                },
                {
                    "orderable": true,
                    "price": 29.99,
                    "productId": "793775362380M",
                    "variationValues": {
                        "color": "REDSI"
                    }
                }
            ],
            "variationAttributes": [
                {
                    "id": "color",
                    "name": "Color",
                    "values": [
                        {
                            "name": "Red",
                            "orderable": true,
                            "value": "REDSI"
                        },
                        {
                            "name": "Turquoise",
                            "orderable": true,
                            "value": "TURQUSI"
                        }
                    ]
                }
            ],
            "variationValues": {
                "color": "REDSI"
            },
            "c_color": "REDSI",
            "c_isSale": true,
            "c_refinementColor": "red",
            "c_size": "000",
            "c_width": "Z"
        }

        return product
    }
}
