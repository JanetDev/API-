const openM = document.querySelector(".hero_cta");
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal_close')

openM.addEventListener('click', (e)=>{
	e.preventDefault();
	modal.classList.add('modal--show')
})

closeModal.addEventListener('click', (e)=>{
	e.preventDefault();
	modal.classList.remove('modal--show')
})