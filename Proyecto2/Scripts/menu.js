//Menu de hamburguesa
const toggleButton2 = document.getElementById('button-menu2')
const navWrapper2 = document.getElementById('nav2')

toggleButton2.addEventListener('click',() => {
  toggleButton2.classList.toggle('close')
  navWrapper2.classList.toggle('show')
})

navWrapper2.addEventListener('click',e => {
  if(e.target.id === 'nav2'){
    navWrapper2.classList.remove('show')
    toggleButton2.classList.remove('close')
  }
})

//funcion seccion deslizable
//oculta
function toggleClass(elem,className){
	if (elem.className.indexOf(className) !== -1){
		elem.className = elem.className.replace(className,'');
	}
	else{
		elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
	}
	
	return elem;
}
//delsix
function toggleDisplay(elem){
	const curDisplayStyle = elem.style.display;			
				
	if (curDisplayStyle === 'none' || curDisplayStyle === ''){
		elem.style.display = 'block';
	}
	else{
		elem.style.display = 'none';
	}
}

//dropdown
function toggleMenuDisplay(e){
	const dropdown = e.currentTarget.parentNode;
	const menu = dropdown.querySelector('.menu');
	const icon = dropdown.querySelector('.fa-angle-right');

	toggleClass(menu,'hide');
	toggleClass(icon,'rotate-90');
}
//obtiene elementos
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

//vincula listeners a estos elementos
dropdownTitle.addEventListener('click', toggleMenuDisplay);
dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));
document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);