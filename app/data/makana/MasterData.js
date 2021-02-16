const MasterData = {
    doctors: [
        {
            doctorKey: '000',
            name: 'Tim Brown, MDX',
            age: 41,
            imgSrc: 'https://lh3.googleusercontent.com/a-/AOh14Gg3XGKD-v4EpVeECRKnNFSxUhGAxhmogB0ed6tP'
        },
        {
            doctorKey: '001',
            name: 'Dave Foley, DO',
            age: 42,
            imgSrc: 'https://render.fineartamerica.com/images/rendered/default/print/8/8/break/images/artworkimages/medium/2/shaken-not-stirred-peter-ruck.jpg'
        },
        {
            doctorKey: '002',
            name: 'Olivier Lafont, DSE',
            age: 43,
            imgSrc: 'https://lh3.googleusercontent.com/a-/AOh14GhsaCN4AmWohyd7OyjX-E7msAsmq6By64vy58y2pQ'
        },
        {
            doctorKey: '003',
            name: 'Nupur Marwaha, MD',
            age: 44,
            imgSrc: 'https://lh3.googleusercontent.com/a-/AOh14Giw6VCcbTc2-HljzAattVvx3s-d3ASL232gZ6Pb'
        },
        {
            doctorKey: '004',
            name: 'Nat Pavic, DMD',
            age: 45,
            imgSrc: 'https://lh3.googleusercontent.com/a-/AOh14GjlrOHEVfWo-aywcCcJ9b8KLgFEniZSJiqNfDkf4g'
        },
        {
            doctorKey: '005',
            name: 'Chad Chain, PhD',
            age: 45,
            imgSrc: 'https://lh3.googleusercontent.com/a-/AOh14GhtgE0HUsxQIO9297BV3hzZOD-ybsLKNMwF7gII0Q'
        },
        {
            doctorKey: '006',
            name: 'Amulya Pradhan, DO',
            age: 46,
            imgSrc: 'https://lh3.googleusercontent.com/a-/AOh14Gh55P1TegmgRk81Aa5ZAwzD_0Ymcj_bat0zxKVt'
        }    
    ],

    drugs: [
        {
            drugKey: '001',
            variants: [
                {
                    variantKey: '00101',
                    variantName: 'Metformin'
                }, 
                {
                    variantKey: '00102',
                    variantName: 'Glucophage (* Metformin)'                    
                }
            ],            
            forms: ['tablet', 'capsule'],
            dosages: ['10mg', '20mg', '30mg'],
            quantities: [11, 31, 51],
            imgSrc: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/DrugItem_26204.JPG',
        },
        {
            drugKey: '002',
            variants: [
                {
                    variantKey: '00201',
                    variantName: 'Lipitor'
                }, 
                {
                    variantKey: '00202',
                    variantName: 'Atorvastatin (* Lipitor)'                    
                }
            ],            
            forms: ['tablet', 'capsule'],
            dosages: ['20mg', '30mg', '40mg'],
            quantities: [12, 32, 52],
            imgSrc: 'https://www.grxstatic.com/d4fuqqd5l3dbz/products/tms/DrugItem_6931.JPG',
        },
        {
            drugKey: '003',
            variants: [
                {
                    variantKey: '00301',
                    variantName: 'Cozaar'
                }, 
                {
                    variantKey: '00302',
                    variantName: 'Losartan (* Cozaar)'                    
                }
            ],            
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