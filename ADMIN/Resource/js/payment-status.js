

const urlPDS = 'http://localhost:8000/orders/module/v1/orders/all'

const option = {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json'
  }
};

fetch(urlPDS, option)
	.then(response => {
		if (!response.ok) {
				return response.json().then(errorData => {
						throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
				});
		}
		return response.json();
	})
  .then(data => {
    data.forEach(user => {
      const ma_san = sessionStorage.getItem('ma_san');
      const urlChi_Tiet_PDS = `http://localhost:8000/order-items/module/v1/order-items/detail?ma_pds=${user.ma_pds}&ma_san=${ma_san}`

      fetch(urlChi_Tiet_PDS, option)
      .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.detail || 'Lỗi khi tải dữ liệu từ máy chủ');
            });
        }
        return response.json();
      })
      .then(detailData => {
      console.log(detailData);

        displayItemsList(user, detailData);
      })
    });
  })


	.catch(error => {
		Swal.fire({
				icon: 'error',
				title: 'Đã xảy ra lỗi',
				text: 'Lỗi: ' + error.message,
		});
	});

// displayItemsList
var items = document.getElementsByClassName('table-list-items')[0]
items.innerHTML =
  `
  <tr>
    <th>Mã PDS</th>
    <th>Mã KH</th>
    <th>Mã Sân</th>
    <th>Ngày Đặt Sân</th>
    <th>Giờ BĐ</th>
    <th>Giờ KT</th>
    <th>Giá Sân</th>
    <th>Hình Thức Thanh Toán </th>
    <th>Hạn Mức Thanh Toán </th>
    <th class = "note">Ghi Chú</th>
  </tr>
  `;
  function displayItemsList(user, detailData) {
    
    const output  =
      `
      <tr>
        <td>${user.ma_pds}</td>
        <td>${user.ma_kh}</td>
        <td>${detailData.ma_san}</td>
        <td>${new Date(detailData.ngay_dat_san).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
        <td>${new Date(detailData.gio_bd).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
        <td>${new Date(detailData.gio_kt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
        <td>${detailData.gia_tong_san}</td>
        <td>${detailData.hinh_thuc_thanh_toan}</td>
        <td>${detailData.han_muc_thanh_toan}</td>
        <td class = "note">${user.ghi_chu}</td>
      </tr>
      `;
	items.insertAdjacentHTML('beforeend', output);

  }
// displayItemsList