// not working
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
                <hr class="line-product">
                <h3 class="name_product">${name}</h3>
                <p class="about_product">
                About: ${about}</p>
                <hr class="line-product">
                <button class="bth_price">Buy: ${price}₽</button>
                <!-- button management -->
                <div class="button">
                    <a href="/edit" class="bth__edit">edit</a>
                    <form action="/api/products/:${id}" method="delete">
                        <button type="submit" class="bth__delete">delete</button>
                    </form>
                    
                </div>
            </div>  
    `)
}
