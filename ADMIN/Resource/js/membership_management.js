// arr
	arrItemsList = [

		{
			itemCode: 'KH001',
			itemName: 'Nguyễn Văn An',
			registrationDate: '21/04/2024',
			rank: 'Bạc',
			point: '260',
			booksTimes: '26',
			activeStatus: 'Còn',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH002',
			itemName: 'Nguyễn Thành Đạt',
			registrationDate: '23/05/2023',
			rank: 'Vàng',
			point: '330',
			booksTimes: '33',
			activeStatus: 'Còn',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH003',
			itemName: 'Trần Thị Minh Châu',
			registrationDate: '22/01/2024',
			rank: 'Đồng',
			point: '130',
			booksTimes: '13',
			activeStatus: 'Còn',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH0004',
			itemName: 'Lê Hoàng Anh',
			registrationDate: '10/07/2022',
			rank: 'VIP',
			point: '520',
			booksTimes: '52',
			activeStatus: 'Còn',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH0005',
			itemName: 'Nguyễn Minh Quân',
			registrationDate: '25/02/2024',
			rank: 'Đồng',
			point: '150',
			booksTimes: '15',
			activeStatus: 'Không',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH0006',
			itemName: 'Trần Đức Dũng',
			registrationDate: '06/01/2024',
			rank: 'Bạc',
			point: '240',
			booksTimes: '24',
			activeStatus: 'Còn',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH0007',
			itemName: 'Lê Hoàng Phúc',
			registrationDate: '02/12/2023',
			rank: 'Bạc',
			point: '210',
			booksTimes: '21',
			activeStatus: 'Còn',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH0008',
			itemName: 'Phạm Gia Bảo',
			registrationDate: '21/04/2022',
			rank: 'VIP',
			point: '560',
			booksTimes: '55',
			activeStatus: 'Còn',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH0009',
			itemName: 'Vũ Tuấn Kiệt',
			registrationDate: '29/02/2022',
			rank: 'VIP',
			point: '510',
			booksTimes: '51',
			activeStatus: 'Còn',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		{
			itemCode: 'KH010	',
			itemName: 'Đỗ Thành Công',
			registrationDate: '22/10/2023',
			rank: 'Đồng',
			point: '130',
			booksTimes: '13',
			activeStatus: 'Không',
			functions: '<i class="fa-solid fa-trash-can delete"></i> <i class="fa-solid fa-pen-to-square update"></i>'
		},
		
	]
// arr

// display
	function displayItemsList() {
		var items = document.getElementsByClassName('table-list-items')[0]
		items.innerHTML =
			`
			<tr>
				<td>Mã Khách Hàng</td>
				<td>Tên Mặt Hàng</td>
				<td>Ngày Đăng Ký</td>
				<td>Hạng Thẻ</td>
				<td>Điểm Tích Lũy</td>
				<td>Số Lần Đặt Sân</td>
				<td>Tình Trạng Hoạt Động</td>
				<td>Chức Năng</td>
			</tr>
			`;
		for (var i = 0; i < arrItemsList.length; i++) {
			itemCode = arrItemsList[i].itemCode;
			itemName = arrItemsList[i].itemName;
			registrationDate = arrItemsList[i].registrationDate;
			rank = arrItemsList[i].rank;
			point = arrItemsList[i].point;
			booksTimes = arrItemsList[i].booksTimes;
			activeStatus = arrItemsList[i].activeStatus;
			functions = arrItemsList[i].functions;

			items.innerHTML +=
			`
			<tr>
				<td>${itemCode}</td>
				<td>${itemName}</td>
				<td>${registrationDate}</td>
				<td>${rank}</td>
				<td>${point}</td>
				<td>${booksTimes}</td>
				<td>${activeStatus}</td>
				<td>${functions}</td>
			</tr>
			`;

		}
	}
	displayItemsList();

// display
