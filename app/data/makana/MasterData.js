const MasterData = {
    doctors: [
        {
            doctorKey: '000',
            name: 'Tim Brown, MDX',
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
    ],

    drugs: [
        {
            drugKey: '001',
            drugNames: ['Metformin', 'Glucophage (generic Metformin)'],            
            forms: ['tablet', 'capsule'],
            dosages: ['10mg', '20mg', '30mg'],
            quantities: [11, 31, 51],
            imgSrc: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/DrugItem_26204.JPG',
        },
        {
            drugKey: '002',
            drugNames: ['Lipitor', 'Atorvastatin (generic Lipitor)'],
            forms: ['tablet', 'capsule'],
            dosages: ['20mg', '30mg', '40mg'],
            quantities: [12, 32, 52],
            imgSrc: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/tms/DrugItem_6931.JPG',
        },
        {
            drugKey: '003',
            drugNames: ['Cozaar', 'Losartan (generic Cozaar)'],
            forms: ['syrup', 'capsule'],
            dosages: ['30mg', '40mg', '50mg'],
            quantities: [13, 23, 53],
            imgSrc: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/DrugItem_26204.JPG',
        }
    ],
    
    pharmacies: [
        {
            pharmacyKey: '001',
            pharmacyChain: 'Piggly Wiggly',
            pharmacyLogoUrl: 'https://www.pigglywigglyfl.com/wp-content/uploads/2018/11/logo-footer@2x.png.webp',
            pharmacyCity: 'St. Petersburg',
            pharmacyPrice: 101
        },
        {
            pharmacyKey: '002',
            pharmacyChain: 'Publix',
            pharmacyLogoUrl: 'https://cutpcdnwimages.azureedge.net/-/media/images/publix/publix_brandmark.svg?h=50&w=30&la=en&hash=250D8BC8604D4BC2D61677DFBF8E841AB79C327C',
            pharmacyCity: 'Tampa',
            pharmacyPrice: 202
        },
        {
            pharmacyKey: '003',
            pharmacyChain: 'Walmart',
            pharmacyLogoUrl: 'https://www.logolynx.com/images/logolynx/72/72228f020dfabd8322585148af496eb5.png',
            pharmacyCity: 'Clearwater',
            pharmacyPrice: 303
        }
    ]
}

export default MasterData