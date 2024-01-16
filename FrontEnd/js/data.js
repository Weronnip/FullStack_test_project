async function getAllProduct() {
    const res = await fetch('/api/products');
    const products = await res.json();

    console.log(products);
    products.forEach(products => productHTML(products));
}

window.addEventListener('DOMContentLoaded', getAllProduct);

function productHTML({id, name, about, price}) {
    const listProduct = document.getElementById('list-product')

    listProduct.insertAdjacentHTML('beforeend', `
        <div class="product" id="list-product${id}">
                <img src="" alt="img_product">
                <hr class="line">
                <h3 class="name_product">${name}</h3>
                <p class="about_product">${about}</p>
                <hr class="line">
                <button class="bth_price">Buy: ${price}</button>
                <!-- button management -->
                <div class="button">
                    <a href="/edit/:{id}" class="bth__edit">edit</a>
                    <a href="/delete" class="bth__delete">delete</a>
                </div>
            </div>  
    `)
}