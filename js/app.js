"use string"

document.addEventListener('DOMContentLoaded', function (){


let input = document.getElementById('_name');
input.oninput = () => {
  if((input.value.charAt(0) === ' ')||(input.value.charAt(0) === '-')) {
    input.value = '';
  }
}
const form = document.getElementById('form');
const bod = document.getElementById('bod');
form.addEventListener('submit', formSend);
	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('image', formimage.files[0]);

		if(error === 0){
			/*bod.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body:formData
			});
			if (response.ok){

				let result = await response.json();
				alert(result.message);
				formreview.innerHTML = '';
				form.reset();
				bod.classList.remove('_sending');
			}else{
				alert('an error has occurred');
				bod.classList.remove('_sending');
			}
			*/
		}else{
			alert('check the correctness of the entered data');
		}

	}
	function formValidate(form){
			let formreq = document.querySelectorAll('._req');
			let error = 0;
			for (let index = 0; index < formreq.length; index++) {
				const input = formreq[index];
				formRemoveError(input);
				if (input.classList.contains('_email')){
					if (emailtest(input)) {
						formadderror(input);
						formremovegood(input);
						error++;
					}else{
						formaddgood(input);
					}
				}else{
						if ((input.value === '') ||(input.value === '') || (input.value === '0')|| (input.value === '00')) {
						formadderror(input);
						formremovegood(input);
						error++;
					}else{
						formaddgood(input);
					}
				}
			}
			return error;
	}
		function formadderror(input) {
			input.parentElement.classList.add('_error');
			input.classList.add('_error');
		}
		function formRemoveError(input) {
			input.parentElement.classList.remove('_error');
			input.classList.remove('_error');
		}
		function formaddgood(input) {
			input.parentElement.classList.add('_good');
			input.classList.add('_good');
		}
		function formremovegood(input) {
			input.parentElement.classList.remove('_good');
			input.classList.remove('_good');
		}
		function emailtest(input) {
			return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value);
		}


		const formimage = document.getElementById('formimage');

		const formreview = document.getElementById('formreview');

		formimage.addEventListener('change', () => {
			uploadFile(formimage.files[0]);
		});

		function uploadFile(file) {
			
		if (!['image/jpeg', 'image/png'].includes(file.type)){
			alert('Invalid file format');
			formimage.value = '';
			return;
			}	
		

		var reader = new FileReader();
		reader.onload = function (e) {
			formreview.innerHTML = `<img src="${e.target.result}" alt="" class="photto">`;
		};
		reader.onerror = function (e){
			alert('an error has occurred');
		};
		reader.readAsDataURL(file);
}


		$("#_age").on("input", function(){
			$(this).val( $(this).val().replace(/[^0-9]/g,'') );
	});
		$("#_name").on("input", function(){
		$(this).val( $(this).val().replace(/[^a-zA-Za-zA-ZА-Яа-яЁё\-\ ]/g,''));
});
});