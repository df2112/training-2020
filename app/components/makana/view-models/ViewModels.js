const ViewModels = {

    drugSearch: [
        {
            className: 'masterId_2112',
            isSimple: false,
            isfull: true,
            imageProps: {
                src:
                    'https://i.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg',
                width: '88px',
                height: '88px',
                alt: 'cat'
            },
            href: '#',
            options: [
                {
                    label: 'Dave ID 2112 yippee'
                }
            ],
            title: 'Product Title',
            price: '$2000'
        },
        {
            className: 'masterId_5150',
            isSimple: true,
            imageProps: {
                src:
                    'https://i.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg',
                width: '88px',
                height: '88px',
                alt: 'cat'
            },
            href: '#',
            options: [
                {
                    label: 'Dave ID 5150'
                }
            ],
            price: '$2000',
            title: 'Product Title2'
        }
    ],
    prescriptionConfigure: {
        variants: [
            {
                drugKey: '0',
                name: 'Atorvastatin (*generic) yo~',
                generic: true,
                unitPrice: 2.50
            },
            {
                drugKey: '1',
                name: 'Lipitor (*brand)',
                generic: false,
                unitPrice: 3.75
            }
        ],
        forms: ['tablet', 'liquid'],
        dosages: ['10mg', '20mg', '30mg'],
        quantities: [11, 21, 51],
    },
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