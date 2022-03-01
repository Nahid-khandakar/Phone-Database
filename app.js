//search button click and data load
const searchButton = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;

    //clean main contain for search another contain
    document.getElementById('main').textContent = "";

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

//display all phone in 3 colunm

const displayPhone = (phones) => {

    const mainContainer = document.getElementById('main');

    for (const phone of phones) {
        console.log(phone)

        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.innerHTML = `


            <div class="card p-3 border bg-light w-100">

                <img  class="w-50 mx-auto" src="${phone.image}" class="card-img-top" alt="...">

                <div class="card-body">
                    <h5 class="card-title"> <u> Phone Name:</u></h5>
                    <h3 class="card-title">${phone.phone_name}</h3>
                    <h5 class="card-title"> <u> Brand:</u></h5>
                    <h4 class="card-title">${phone.brand}</h4>

                    <button type="button" class="btn btn-warning text-center">More Details</button>
                  
                </div>
                
            </div>

        `;
        mainContainer.appendChild(div)
    }
}