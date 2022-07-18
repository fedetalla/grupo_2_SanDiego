window.addEventListener('load', function(){

    let deleteButton = document.querySelector('.button-delete');
    console.log('Enlazado')

    deleteButton.addEventListener('click', function(event){
        let confirmDelete = confirm('¿Estás seguro de que quieres borrar este producto?')
        if(confirmDelete == false){
            event.preventDefault()
    }
    })

})