addEventListener('load', () => {

    let menuMobile = document.querySelector('.burger-menu');  
    let navBar = document.querySelector('#nav-bar');  
    let xMark = document.querySelector('.fa-solid');  

    menuMobile.addEventListener('click', ()=>{
        // alert('enlazado');
        navBar.classList.add('header-list-mobile');
        navBar.classList.remove('header-list');
    });    
    xMark.addEventListener('click', ()=>{
        navBar.classList.remove('header-list-mobile');
        navBar.classList.add('header-list');
    });

});
