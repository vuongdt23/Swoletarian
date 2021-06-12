const foodArr = [
  {
    foodName: 'Ba khía muối',
    foodCalories: '83',
  },
  {
    foodName: 'Ba tê',
    foodCalories: '326',
  },
  {
    foodName: 'Bánh bao',
    foodCalories: '219',
  },
  {
    foodName: 'Bánh đúc',
    foodCalories: '52',
  },
  {
    foodName: 'Bánh in chay',
    foodCalories: '376',
  },
  {
    foodName: 'Bánh men',
    foodCalories: '369',
  },
  {
    foodName: 'Bánh mì',
    foodCalories: '249',
  },
  {
    foodName: 'Bánh mì khô',
    foodCalories: '346',
  },
  {
    foodName: 'Bánh phở',
    foodCalories: '141',
  },
  {
    foodName: 'Bánh phồng tôm',
    foodCalories: '676',
  },
  {
    foodName: 'Bánh sôcôla',
    foodCalories: '449',
  },
  {
    foodName: 'Bánh thỏi sôcôla',
    foodCalories: '543',
  },
  {
    foodName: 'Bánh tráng mỏng',
    foodCalories: '333',
  },
  {
    foodName: 'Bao tử bò',
    foodCalories: '97',
  },
  {
    foodName: 'Bao tử heo',
    foodCalories: '85',
  },
  {
    foodName: 'Bắp tươi',
    foodCalories: '196',
  },
  {
    foodName: 'Bầu',
    foodCalories: '14',
  },
  {
    foodName: 'Bí đao (bí xanh)',
    foodCalories: '12',
  },
  {
    foodName: 'Bí ngô',
    foodCalories: '24',
  },
  {
    foodName: 'Bia',
    foodCalories: '43',
  },
  {
    foodName: 'Bơ',
    foodCalories: '756',
  },
  {
    foodName: 'Bột sắn dây',
    foodCalories: '340',
  },
  {
    foodName: 'Bún',
    foodCalories: '110',
  },
  {
    foodName: 'Bún ăn liền',
    foodCalories: '348',
  },
  {
    foodName: 'Bưởi',
    foodCalories: '30',
  },
  {
    foodName: 'Cá bống',
    foodCalories: '70',
  },
  {
    foodName: 'Cá chép',
    foodCalories: '96',
  },
  {
    foodName: 'Cà chua',
    foodCalories: '19',
  },
  {
    foodName: 'Cá đối',
    foodCalories: '108',
  },
  {
    foodName: 'Cá giếc',
    foodCalories: '87',
  },
  {
    foodName: 'Cá hồi',
    foodCalories: '136',
  },
  {
    foodName: 'Cá khô',
    foodCalories: '208',
  },
  {
    foodName: 'Cá lóc',
    foodCalories: '97',
  },
  {
    foodName: 'Cá mè',
    foodCalories: '144',
  },
  {
    foodName: 'Cá mỡ',
    foodCalories: '151',
  },
  {
    foodName: 'Cá mòi',
    foodCalories: '124',
  },
  {
    foodName: 'Cá nạc',
    foodCalories: '80',
  },
  {
    foodName: 'Cá ngừ',
    foodCalories: '87',
  },
  {
    foodName: 'Cá nục',
    foodCalories: '111',
  },
  {
    foodName: 'Cà pháo',
    foodCalories: '20',
  },
  {
    foodName: 'Cá phèn',
    foodCalories: '104',
  },
  {
    foodName: 'Cá quả (cá lóc)',
    foodCalories: '97',
  },
  {
    foodName: 'Cá rô đồng',
    foodCalories: '126',
  },
  {
    foodName: 'Cá rô phi',
    foodCalories: '100',
  },
  {
    foodName: 'Cà rốt',
    foodCalories: '38',
  },
  {
    foodName: 'Cá thu',
    foodCalories: '166',
  },
  {
    foodName: 'Cá thu hộp',
    foodCalories: '207',
  },
  {
    foodName: 'Cà tím',
    foodCalories: '22',
  },
  {
    foodName: 'Cá trắm cỏ',
    foodCalories: '91',
  },
  {
    foodName: 'Cá trê',
    foodCalories: '173',
  },
  {
    foodName: 'Cá trích hộp',
    foodCalories: '233',
  },
  {
    foodName: 'Cá trôi',
    foodCalories: '127',
  },
  {
    foodName: 'Cải bắp',
    foodCalories: '29',
  },
  {
    foodName: 'Cải cúc',
    foodCalories: '14',
  },
  {
    foodName: 'Cải thìa (cải trắng)',
    foodCalories: '16',
  },
  {
    foodName: 'Cải xanh',
    foodCalories: '15',
  },
  {
    foodName: 'Cam',
    foodCalories: '37',
  },
  {
    foodName: 'Cần ta',
    foodCalories: '10',
  },
  {
    foodName: 'Cari bột',
    foodCalories: '283',
  },
  {
    foodName: 'Cật bò',
    foodCalories: '67',
  },
  {
    foodName: 'Cật heo',
    foodCalories: '81',
  },
  {
    foodName: 'Chả bò',
    foodCalories: '357',
  },
  {
    foodName: 'Chà bông',
    foodCalories: '396',
  },
  {
    foodName: 'Chà bông cá lóc',
    foodCalories: '312',
  },
  {
    foodName: 'Chả lợn',
    foodCalories: '517',
  },
  {
    foodName: 'Chả lụa',
    foodCalories: '136',
  },
  {
    foodName: 'Chả quế',
    foodCalories: '416',
  },
  {
    foodName: 'Chân giò lợn (bỏ xương)',
    foodCalories: '230',
  },
  {
    foodName: 'Chanh',
    foodCalories: '23',
  },
  {
    foodName: 'Cháo ăn liền',
    foodCalories: '346',
  },
  {
    foodName: 'Chôm chôm',
    foodCalories: '72',
  },
  {
    foodName: 'Chuối tây',
    foodCalories: '66',
  },
  {
    foodName: 'Chuối tiêu',
    foodCalories: '97',
  },
  {
    foodName: 'CocaCola',
    foodCalories: '42',
  },
  {
    foodName: 'Củ cải trắng',
    foodCalories: '21',
  },
  {
    foodName: 'Củ dong',
    foodCalories: '119',
  },
  {
    foodName: 'Củ sắn',
    foodCalories: '152',
  },
  {
    foodName: 'Củ từ',
    foodCalories: '92',
  },
  {
    foodName: 'Cua biển',
    foodCalories: '103',
  },
  {
    foodName: 'Cua đồng',
    foodCalories: '87',
  },
  {
    foodName: 'Cùi dừa già',
    foodCalories: '368',
  },
  {
    foodName: 'Cùi dừa non',
    foodCalories: '40',
  },
  {
    foodName: 'Da heo',
    foodCalories: '118',
  },
  {
    foodName: 'Dăm bông heo',
    foodCalories: '318',
  },
  {
    foodName: 'Đậu cô ve',
    foodCalories: '73',
  },
  {
    foodName: 'Đậu đen (hạt)',
    foodCalories: '325',
  },
  {
    foodName: 'Đậu Hà lan (hạt)',
    foodCalories: '342',
  },
  {
    foodName: 'Đầu heo',
    foodCalories: '335',
  },
  {
    foodName: 'Đậu phộng',
    foodCalories: '573',
  },
  {
    foodName: 'Đậu phộng chiên',
    foodCalories: '680',
  },
  {
    foodName: 'Đậu phụ',
    foodCalories: '95',
  },
  {
    foodName: 'Dầu thực vật',
    foodCalories: '897',
  },
  {
    foodName: 'Đậu tương (đậu nành)',
    foodCalories: '400',
  },
  {
    foodName: 'Đậu xanh',
    foodCalories: '328',
  },
  {
    foodName: 'Dọc mùng',
    foodCalories: '5',
  },
  {
    foodName: 'Đu đủ chín',
    foodCalories: '35',
  },
  {
    foodName: 'Dưa cải bắp',
    foodCalories: '18',
  },
  {
    foodName: 'Dưa cải bẹ',
    foodCalories: '17',
  },
  {
    foodName: 'Dưa chuột',
    foodCalories: '15',
  },
  {
    foodName: 'Dưa hấu',
    foodCalories: '16',
  },
  {
    foodName: 'Dứa ta',
    foodCalories: '29',
  },
  {
    foodName: 'Đuôi bò',
    foodCalories: '137',
  },
  {
    foodName: 'Đuôi heo',
    foodCalories: '467',
  },
  {
    foodName: 'Đường cát trắng',
    foodCalories: '397',
  },
  {
    foodName: 'Ếch',
    foodCalories: '90',
  },
  {
    foodName: 'Gấc',
    foodCalories: '122',
  },
  {
    foodName: 'Gan bò',
    foodCalories: '110',
  },
  {
    foodName: 'Gân chân bò',
    foodCalories: '124',
  },
  {
    foodName: 'Gan gà',
    foodCalories: '111',
  },
  {
    foodName: 'Gan heo',
    foodCalories: '116',
  },
  {
    foodName: 'Gan vịt',
    foodCalories: '122',
  },
  {
    foodName: 'Gạo nếp cái',
    foodCalories: '346',
  },
  {
    foodName: 'Gạo tẻ',
    foodCalories: '344',
  },
  {
    foodName: 'Ghẹ',
    foodCalories: '54',
  },
  {
    foodName: 'Giá đậu xanh',
    foodCalories: '43',
  },
  {
    foodName: 'Giò bò',
    foodCalories: '357',
  },
  {
    foodName: 'Giò lụa',
    foodCalories: '136',
  },
  {
    foodName: 'Giò thủ',
    foodCalories: '553',
  },
  {
    foodName: 'Gừng tươi',
    foodCalories: '25',
  },
  {
    foodName: 'Hải sâm',
    foodCalories: '90',
  },
  {
    foodName: 'Hành lá (hành hoa)',
    foodCalories: '22',
  },
  {
    foodName: 'Hạt điều',
    foodCalories: '605',
  },
  {
    foodName: 'Hến',
    foodCalories: '45',
  },
  {
    foodName: 'Hồng xiêm',
    foodCalories: '48',
  },
  {
    foodName: 'Huyết bò',
    foodCalories: '75',
  },
  {
    foodName: 'Huyết heo luộc',
    foodCalories: '44',
  },
  {
    foodName: 'Huyết heo sống',
    foodCalories: '25',
  },
  {
    foodName: 'Kẹo cà phê',
    foodCalories: '378',
  },
  {
    foodName: 'Kẹo đậu phộng',
    foodCalories: '449',
  },
  {
    foodName: 'Kẹo dừa mềm',
    foodCalories: '415',
  },
  {
    foodName: 'Kẹo ngậm bạc hà',
    foodCalories: '268',
  },
  {
    foodName: 'Kẹo sôcôla',
    foodCalories: '388',
  },
  {
    foodName: 'Kẹo sữa',
    foodCalories: '390',
  },
  {
    foodName: 'Khoai lang',
    foodCalories: '119',
  },
  {
    foodName: 'Khoai lang nghệ',
    foodCalories: '116',
  },
  {
    foodName: 'Khoai môn',
    foodCalories: '109',
  },
  {
    foodName: 'Khoai tây',
    foodCalories: '92',
  },
  {
    foodName: 'Khoai tây chiên',
    foodCalories: '525',
  },
  {
    foodName: 'Lạp xưởng',
    foodCalories: '585',
  },
  {
    foodName: 'Lê',
    foodCalories: '45',
  },
  {
    foodName: 'Lòng đỏ trứng gà',
    foodCalories: '327',
  },
  {
    foodName: 'Lòng đỏ trứng vịt',
    foodCalories: '368',
  },
  {
    foodName: 'Lòng heo (ruột già)',
    foodCalories: '167',
  },
  {
    foodName: 'Lòng trắng trứnggà',
    foodCalories: '46',
  },
  {
    foodName: 'Lòng trắng trứngvịt',
    foodCalories: '50',
  },
  {
    foodName: 'Lưỡi bò',
    foodCalories: '164',
  },
  {
    foodName: 'Lưỡi heo',
    foodCalories: '178',
  },
  {
    foodName: 'Lươn',
    foodCalories: '94',
  },
  {
    foodName: 'Mắm tôm đặc',
    foodCalories: '73',
  },
  {
    foodName: 'Mận',
    foodCalories: '20',
  },
  {
    foodName: 'Măng chua',
    foodCalories: '11',
  },
  {
    foodName: 'Mật ong',
    foodCalories: '327',
  },
  {
    foodName: 'Mè',
    foodCalories: '568',
  },
  {
    foodName: 'Mề gà',
    foodCalories: '99',
  },
  {
    foodName: 'Mì ăn liền',
    foodCalories: '435',
  },
  {
    foodName: 'Miến ăn liền',
    foodCalories: '367',
  },
  {
    foodName: 'Miến dong',
    foodCalories: '332',
  },
  {
    foodName: 'Mít dai',
    foodCalories: '48',
  },
  {
    foodName: 'Mít mật',
    foodCalories: '62',
  },
  {
    foodName: 'Mơ',
    foodCalories: '46',
  },
  {
    foodName: 'Mỡ lợn nước',
    foodCalories: '896',
  },
  {
    foodName: 'Mộc nhĩ',
    foodCalories: '304',
  },
  {
    foodName: 'Mực khô',
    foodCalories: '291',
  },
  {
    foodName: 'Mực tươi',
    foodCalories: '73',
  },
  {
    foodName: 'Muối',
    foodCalories: '0',
  },
  {
    foodName: 'Mướp',
    foodCalories: '16',
  },
  {
    foodName: 'Mứt đu đủ',
    foodCalories: '178',
  },
  {
    foodName: 'Mứt thơm',
    foodCalories: '208',
  },
  {
    foodName: 'Na',
    foodCalories: '64',
  },
  {
    foodName: 'Nấm hương khô',
    foodCalories: '274',
  },
  {
    foodName: 'Nem chua',
    foodCalories: '137',
  },
  {
    foodName: 'Nghệ khô',
    foodCalories: '360',
  },
  {
    foodName: 'Nghệ tươi',
    foodCalories: '22',
  },
  {
    foodName: 'Ngô tươi',
    foodCalories: '196',
  },
  {
    foodName: 'Ngô vàng hạt vàng',
    foodCalories: '354',
  },
  {
    foodName: 'Nhãn',
    foodCalories: '48',
  },
  {
    foodName: 'Nhãn hộp',
    foodCalories: '62',
  },
  {
    foodName: 'Nho ta (nho chua)',
    foodCalories: '14',
  },
  {
    foodName: 'Nhộng',
    foodCalories: '111',
  },
  {
    foodName: 'Nước mắm',
    foodCalories: '28',
  },
  {
    foodName: 'Nước thơm',
    foodCalories: '39',
  },
  {
    foodName: 'Óc bò',
    foodCalories: '124',
  },
  {
    foodName: 'Ốc bươu',
    foodCalories: '84',
  },
  {
    foodName: 'Óc heo',
    foodCalories: '123',
  },
  {
    foodName: 'Ốc nhồi',
    foodCalories: '84',
  },
  {
    foodName: 'Ốc vặn',
    foodCalories: '72',
  },
  {
    foodName: 'Ớt vàng to',
    foodCalories: '28',
  },
  {
    foodName: 'Patê',
    foodCalories: '326',
  },
  {
    foodName: 'Phèo heo',
    foodCalories: '44',
  },
  {
    foodName: 'Phở ăn liền',
    foodCalories: '342',
  },
  {
    foodName: 'Quýt',
    foodCalories: '38',
  },
  {
    foodName: 'Ran kinh giới',
    foodCalories: '22',
  },
  {
    foodName: 'Rau bí',
    foodCalories: '18',
  },
  {
    foodName: 'Rau đay',
    foodCalories: '24',
  },
  {
    foodName: 'Rau khoai lang',
    foodCalories: '22',
  },
  {
    foodName: 'Rau mồng tơi',
    foodCalories: '14',
  },
  {
    foodName: 'Rau mùi',
    foodCalories: '13',
  },
  {
    foodName: 'Rau muống',
    foodCalories: '23',
  },
  {
    foodName: 'Rau ngót',
    foodCalories: '35',
  },
  {
    foodName: 'Rau răm',
    foodCalories: '30',
  },
  {
    foodName: 'Rau rút',
    foodCalories: '28',
  },
  {
    foodName: 'Rau thơm',
    foodCalories: '18',
  },
  {
    foodName: 'Rượu nếp',
    foodCalories: '166',
  },
  {
    foodName: 'Sò',
    foodCalories: '51',
  },
  {
    foodName: 'Su hào',
    foodCalories: '36',
  },
  {
    foodName: 'Su su',
    foodCalories: '18',
  },
  {
    foodName: 'Sữa bò tươi',
    foodCalories: '74',
  },
  {
    foodName: 'Sữa bột tách béo',
    foodCalories: '357',
  },
  {
    foodName: 'Sữa bột toàn phần',
    foodCalories: '494',
  },
  {
    foodName: 'Sữa chua',
    foodCalories: '61',
  },
  {
    foodName: 'Sữa đặc có đường',
    foodCalories: '336',
  },
  {
    foodName: 'Sữa đậu nành',
    foodCalories: '28',
  },
  {
    foodName: 'Sữa mẹ',
    foodCalories: '61',
  },
  {
    foodName: 'Sườn heo bỏ xương',
    foodCalories: '187',
  },
  {
    foodName: 'Súp lơ',
    foodCalories: '30',
  },
  {
    foodName: 'Tai heo',
    foodCalories: '121',
  },
  {
    foodName: 'Táo ta',
    foodCalories: '37',
  },
  {
    foodName: 'Táo tây',
    foodCalories: '47',
  },
  {
    foodName: 'Tép gạo',
    foodCalories: '58',
  },
  {
    foodName: 'Tép khô',
    foodCalories: '269',
  },
  {
    foodName: 'Thịt bê nạc',
    foodCalories: '85',
  },
  {
    foodName: 'Thịt bò',
    foodCalories: '118',
  },
  {
    foodName: 'Thịt bò hộp',
    foodCalories: '251',
  },
  {
    foodName: 'Thịt bò khô',
    foodCalories: '239',
  },
  {
    foodName: 'Thịt dê nạc',
    foodCalories: '122',
  },
  {
    foodName: 'Thịt gà hộp',
    foodCalories: '273',
  },
  {
    foodName: 'Thịt gà ta',
    foodCalories: '199',
  },
  {
    foodName: 'Thịt gà tây',
    foodCalories: '218',
  },
  {
    foodName: 'Thịt heo ba chỉ',
    foodCalories: '260',
  },
  {
    foodName: 'Thịt heo hộp',
    foodCalories: '344',
  },
  {
    foodName: 'Thịt heo mỡ',
    foodCalories: '394',
  },
  {
    foodName: 'Thịt heo nạc',
    foodCalories: '139',
  },
  {
    foodName: 'Thịt lơn nạc',
    foodCalories: '139',
  },
  {
    foodName: 'Thịt mông chó',
    foodCalories: '338',
  },
  {
    foodName: 'Thịt ngỗng',
    foodCalories: '409',
  },
  {
    foodName: 'Thịt thỏ',
    foodCalories: '158',
  },
  {
    foodName: 'Thịt vai chó',
    foodCalories: '230',
  },
  {
    foodName: 'Thịt vịt',
    foodCalories: '267',
  },
  {
    foodName: 'Thơm hộp',
    foodCalories: '56',
  },
  {
    foodName: 'Tía tô',
    foodCalories: '25',
  },
  {
    foodName: 'Tim bò',
    foodCalories: '89',
  },
  {
    foodName: 'Tim gà',
    foodCalories: '114',
  },
  {
    foodName: 'Tim heo',
    foodCalories: '89',
  },
  {
    foodName: 'Tôm biển',
    foodCalories: '82',
  },
  {
    foodName: 'Tôm chua',
    foodCalories: '68',
  },
  {
    foodName: 'Tôm đồng',
    foodCalories: '90',
  },
  {
    foodName: 'Tôm khô',
    foodCalories: '347',
  },
  {
    foodName: 'Trai',
    foodCalories: '38',
  },
  {
    foodName: 'Trứng gà',
    foodCalories: '166',
  },
  {
    foodName: 'Trứng vịt',
    foodCalories: '184',
  },
  {
    foodName: 'Trứng vịt lộn',
    foodCalories: '182',
  },
  {
    foodName: 'Tương ớt',
    foodCalories: '37',
  },
  {
    foodName: 'Vải',
    foodCalories: '43',
  },
  {
    foodName: 'Vải hộp',
    foodCalories: '60',
  },
  {
    foodName: 'Vú sữa',
    foodCalories: '42',
  },
  {
    foodName: 'Xì dầu',
    foodCalories: '28',
  },
  {
    foodName: 'Xoài chín',
    foodCalories: '69',
  },
  {
    foodName: 'Xúc xích',
    foodCalories: '535',
  },
];

console.log (foodArr.length);
