async function getAllProduct() {
    const res = await fetch('/api/products');
    const products = await res.json();

    console.log(products);
    products.forEach(products => productHTML(products));
}

window.addEventListener('DOMContentLoaded', getAllProduct,);

document.querySelector('.bth__edit').addEventListener('click', openModal);
document.querySelector('.bth__delete').addEventListener('click', () => deleteProduct(id));
document.querySelector('.bth__change').addEventListener('click', () => editProduct(id));

function productHTML({id, name, about, price}) {
    const listProduct = document.getElementById('list-product');

    if (listProduct) {
        listProduct.insertAdjacentHTML('beforeend', `
            <div class="product" id="list-product${id}">
                <hr class="line-product">
                <h3 class="name_product">${name}</h3>
                <p class="about_product">
                About: ${about} <br><br> ID product: ${id}</p>
                <hr class="line-product">
                <button class="bth_price">Buy: ${price}₽</button>
                <!-- button management -->
                <div class="button">
                    <button onclick="openModal()" type="button" class="bth__edit">edit</button>
                    <button onclick="deleteProduct(${id})" type="submit" class="bth__delete">delete</button>
                </div>
            </div> 

            <div id="myModal" class="modal">
                <div class="modal-content" id="list-product${id}">
                <!-- Контент модального окна -->
                <span class="close" onclick="closeModal()">&times;</span>

                    <h4 class="new_data">Edit modal show</h4>

                    <label for="name">Name: </label>
                    <input type="text" class="input__edit" id="name"  placeholder="${name}">
                    
                    <br>
                    <br>
                    
                    <label for="description">About:</label>
                    <input type="text" class="input__edit" placeholder="${about}" id="description">

                    <br>
                    <br>

                    <label for="price">Price:</label>
                    <input type="number" class="input__edit" placeholder="${price}" id="price">

                    <br>
                    <br>
                    
                    <button type="submit" onclick="editProduct(${id})" class="bth__change">Change</button>
                </div>
            </div>
    `);
    }
}

async function deleteProduct(id) {
    const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await res.json();
    console.log(data);

    if(data) {
        document.getElementById(`list-product${id}`).remove()
    }
}

async function editProduct(id) {
    const name = document.getElementById('name').value;
    const about = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, about, price }),
    });

    const data = await res.json();
    console.log(data);

    if (!data) {
        console.error('Error');
    } else {

        document.getElementById(`list-product${id}`).textContent() // Очистите содержимое
    }
}

// modal show

function openModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}