let burger = document.querySelector('.burger-menu');
let nav = document.querySelector('.header-nav');
let burger_deploy = false ;

burger.addEventListener('click', () => {
   if(burger_deploy){
      nav.style.display = "none";
      burger_deploy = false;
   }else{
      nav.style.display = "block";
      burger_deploy = true;
   }
})