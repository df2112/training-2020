const ViewModels = {

    drugSearch: [
        {
            className: 'masterId_2112',
            isSimple: true,
            isfull: true,
            imageProps: {
                src:
                    'https://www.grxstatic.com/d4fuqqd5l3dbz/products/DrugItem_26204.JPG',
                width: '88px',
                height: '88px',
                alt: 'cat'
            },
            href: '#',
            options: [
                {
                    label: 'Dave ID (a)'
                }
            ],
            title: 'Atorvastatin (generic Lipitor) 2112',
            price: '$25'
        },
        {
            className: 'masterId_2112',
            isSimple: true,
            imageProps: {
                src:
                    'https://www.grxstatic.com/d4fuqqd5l3dbz/products/tms/DrugItem_6931.JPG',
                width: '88px',
                height: '88px',
                alt: 'cat'
            },
            href: '#',
            options: [
                {
                    label: 'Dave ID (b)'
                }
            ],
            price: '$675',
            title: 'Lipitor 2112'
        },
        {
            className: 'masterId_8118',
            isSimple: true,
            isfull: true,
            imageProps: {
                src:
                    'https://www.grxstatic.com/d4fuqqd5l3dbz/products/DrugItem_26204.JPG',
                width: '88px',
                height: '88px',
                alt: 'cat'
            },
            href: '#',
            options: [
                {
                    label: 'Dave ID (x)'
                }
            ],
            title: 'Atorvastatin (generic Lipitor) 8118',
            price: '$125'
        },
        {
            className: 'masterId_8118',
            isSimple: true,
            imageProps: {
                src:
                    'https://www.grxstatic.com/d4fuqqd5l3dbz/products/tms/DrugItem_6931.JPG',
                width: '88px',
                height: '88px',
                alt: 'cat'
            },
            href: '#',
            options: [
                {
                    label: 'Dave ID (y)'
                }
            ],
            price: '$1675',
            title: 'Lipitor 8118'
        }
    ],

    prescriptionConfigure: [
        {
            masterKey: '2112',
            variants: [
                {
                    drugKey: '0',
                    name: 'Atorvastatin (*generic) 2112',
                    generic: true,
                    unitPrice: 25
                },
                {
                    drugKey: '1',
                    name: 'Lipitor (*brand) 2112',
                    generic: false,
                    unitPrice: 675
                }
            ],
            forms: ['tablet', 'liquid'],
            dosages: ['10mg', '20mg', '30mg'],
            quantities: [11, 21, 51],
        },
        {
            masterKey: '8118',
            variants: [
                {
                    drugKey: '0',
                    name: 'Atorvastatin (*generic) 8118',
                    generic: true,
                    unitPrice: 125
                },
                {
                    drugKey: '1',
                    name: 'Lipitor (*brand) 8118',
                    generic: false,
                    unitPrice: 1675
                }
            ],
            forms: ['tablet', 'liquid'],
            dosages: ['10mg', '20mg', '30mg'],
            quantities: [11, 21, 51],
        }
    ],

    prescriptionsGrid: [
        {
            _gridRowKey: 0,
            drugKey: '0',
            drugName: 'Atorvastatin',
            drugForm: 'tablets',
            drugDosage: '40mg',
            drugQuantity: '30',
            pharmacyKey: '',
            pharmacyChain: 'Piggly Wiggly',
            pharmacyLogoUrl: 'https://www.pigglywigglyfl.com/wp-content/uploads/2018/11/logo-footer@2x.png.webp',
            pharmacyCity: 'St. Petersburg'
        },
        {
            _gridRowKey: 1,
            drugKey: '1',
            drugName: 'Lipitor',
            drugForm: 'tablets',
            drugDosage: '10mg',
            drugQuantity: '90',
            pharmacyKey: '',
            pharmacyChain: 'Publix',
            pharmacyLogoUrl: 'https://cutpcdnwimages.azureedge.net/-/media/images/publix/publix_brandmark.svg?h=50&w=30&la=en&hash=250D8BC8604D4BC2D61677DFBF8E841AB79C327C',
            pharmacyCity: 'Tampa'
        },
        {
            _gridRowKey: 2,
            drugKey: '2',
            drugName: 'Cozaar',
            drugForm: 'tablets',
            drugDosage: '50mg',
            drugQuantity: '10',
            pharmacyKey: '',
            pharmacyChain: 'Walmart',
            pharmacyLogoUrl: 'https://www.logolynx.com/images/logolynx/72/72228f020dfabd8322585148af496eb5.png',
            pharmacyCity: 'Clearwater'
        }
    ]

}

export default ViewModels