	function chooseFIle(fileInput){
		if(fileInput.files && fileInput.files[0]){
			var reader = new FileReader();
			
			reader.onload = function (e) {
				$('#img').attr('src',e.target.result);

			}
			reader.readAsDataURL(fileInput.files[0]);
		}
	}