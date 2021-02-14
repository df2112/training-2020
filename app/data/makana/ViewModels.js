const ViewModels = {

    drugSearch: [
        {
            className: 'masterId_2112',
            isSimple: true,
            isfull: true,
            imageProps: {
                src: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/DrugItem_26204.JPG',
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
                src: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/tms/DrugItem_6931.JPG',
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
                src: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/DrugItem_26204.JPG',
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
                src: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/tms/DrugItem_6931.JPG',
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
                    drugKey: '001',
                    name: 'Atorvastatin (*generic) 2112',
                    generic: true,
                    unitPrice: 25
                },
                {
                    drugKey: '002',
                    name: 'Lipitor (*brand) 2112',
                    generic: false,
                    unitPrice: 675
                }
            ],
            drug: {
                drugKey: '001',
                drugName: 'Metformin',
                drugNames: ['Metformin', 'Glucophage (generic)'],
                forms: ['tablet', 'capsule'],
                dosages: ['10mg', '20mg', '30mg'],
                quantities: [11, 31, 51],
            },            
            forms: ['tablet', 'capsule'],
            dosages: ['10mg', '20mg', '30mg'],
            quantities: [11, 21, 51],
            pharmacies: [
                {
                    pharmacyKey: '001',
                    pharmacyChain: 'Piggly Wiggly',
                    pharmacyLogoUrl: 'https://www.pigglywigglyfl.com/wp-content/uploads/2018/11/logo-footer@2x.png.webp',
                    pharmacyCity: 'St. Petersburg',
                    pharmacyPrice: 200
                },
                {
                    pharmacyKey: '002',
                    pharmacyChain: 'Publix',
                    pharmacyLogoUrl: 'https://cutpcdnwimages.azureedge.net/-/media/images/publix/publix_brandmark.svg?h=50&w=30&la=en&hash=250D8BC8604D4BC2D61677DFBF8E841AB79C327C',
                    pharmacyCity: 'Tampa',
                    pharmacyPrice: 201
                },
                {
                    pharmacyKey: '003',
                    pharmacyChain: 'Walmart',
                    pharmacyLogoUrl: 'https://www.logolynx.com/images/logolynx/72/72228f020dfabd8322585148af496eb5.png',
                    pharmacyCity: 'Clearwater',
                    pharmacyPrice: 202        
                }
            ],
            doctors: [
                {
                    doctorKey: '000',
                    name: 'Tim Brown, MD',
                    age: 41,
                },
                {
                    doctorKey: '001',
                    name: 'Dave Foley, DO',
                    age: 42,
                },
                {
                    doctorKey: '002',
                    name: 'Olivier Lafont, DSE',
                    age: 43,
                },
                {
                    doctorKey: '003',
                    name: 'Nupur Marwaha, MD',
                    age: 44,
                },
                {
                    doctorKey: '004',
                    name: 'Nat Pavic, DMD',
                    age: 45,
                },
                {
                    doctorKey: '005',
                    name: 'Amulya Pradhan, DO',
                    age: 46
                }
            ]
        },
        {
            masterKey: '8118',
            variants: [
                {
                    drugKey: '001',
                    name: 'Atorvastatin (*generic) 8118',
                    generic: true,
                    unitPrice: 125
                },
                {
                    drugKey: '002',
                    name: 'Lipitor (*brand) 8118',
                    generic: false,
                    unitPrice: 1675
                }
            ],
            drug: {
                drugKey: '002',
                drugName: 'Lipitor',
                drugNames: ['Lipitor', 'Atorvastatin (generic)'],
                forms: ['tablet', 'capsule'],
                dosages: ['20mg', '30mg', '40mg'],
                quantities: [12, 32, 52],
            },    
            forms: ['tablet', 'liquid'],
            dosages: ['10mg', '20mg', '30mg'],
            quantities: [11, 21, 51],
            pharmacies: [
                {
                    pharmacyKey: '001',
                    pharmacyChain: 'Piggly Wiggly',
                    pharmacyLogoUrl: 'https://www.pigglywigglyfl.com/wp-content/uploads/2018/11/logo-footer@2x.png.webp',
                    pharmacyCity: 'St. Petersburg',
                    pharmacyPrice: 100
                },
                {
                    pharmacyKey: '002',
                    pharmacyChain: 'Publix',
                    pharmacyLogoUrl: 'https://cutpcdnwimages.azureedge.net/-/media/images/publix/publix_brandmark.svg?h=50&w=30&la=en&hash=250D8BC8604D4BC2D61677DFBF8E841AB79C327C',
                    pharmacyCity: 'Tampa',
                    pharmacyPrice: 101
                },
                {
                    pharmacyKey: '003',
                    pharmacyChain: 'Walmart',
                    pharmacyLogoUrl: 'https://www.logolynx.com/images/logolynx/72/72228f020dfabd8322585148af496eb5.png',
                    pharmacyCity: 'Clearwater',
                    pharmacyPrice: 102        
                }
            ],
            doctors: [
                {
                    doctorKey: '000',
                    name: 'Tim Brown, MD',
                    age: 41,
                },
                {
                    doctorKey: '001',
                    name: 'Dave Foley, DO',
                    age: 42,
                },
                {
                    doctorKey: '002',
                    name: 'Olivier Lafont, DSE',
                    age: 43,
                },
                {
                    doctorKey: '003',
                    name: 'Nupur Marwaha, MD',
                    age: 44,
                },
                {
                    doctorKey: '004',
                    name: 'Nat Pavic, DMD',
                    age: 45,
                },
                {
                    doctorKey: '005',
                    name: 'Amulya Pradhan, DO',
                    age: 46
                }
            ]
        }
    ]
}

export default ViewModels