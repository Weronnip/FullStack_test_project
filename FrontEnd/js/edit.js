async function editProduct() {
    const res = await fetch('/api/products/:id');
    const products = await res.json();

    console.log(products);
    products.forEach(products => productHTML(products));
}

window.addEventListener('DOMContentLoaded', editProduct);

function productHTML({id, name, about, price}) {
    const listProduct = document.getElementById('modal_add')

    listProduct.insertAdjacentHTML('beforeend', `
        <h4 class="new_data">Edit product</h4>
        <form action="/api/products/:id" method="post">

            <!-- <label for="id" class="label__input">id product: ${id}</label> -->

            <label for="name" class="label__input">Name product: ${name}</label>
            <input type="text" placeholder="Name: coffee" name="name" class="input__data">

            <br>
            <br>

            <label for="about" class="label__input">About product: ${about}</label>
            <input type="text" placeholder="About: this coffe nice" name="about" class="input__data">

            <br>
            <br>

            <label for="price" class="label__input">Price product: ${price}</label>
            <input type="text" placeholder="price: 100" name="price" class="input__data">
            
            <br>
            <br>
            
            <button type="submit" class="new__product">Add changes</button>
        </form>
    `)
}