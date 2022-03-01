//search button click and data load
const searchButton = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;
    input.value = '';

    //clean main contain for search another contain
    document.getElementById('main').textContent = "";

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
    document.getElementById('error-box').style.display = 'none'

}

//display all phone in 3 colunm

const displayPhone = (phones) => {

    if (phones.length > 0) {
        console.log(phones.length)
        const mainContainer = document.getElementById('main');

        for (const phone of phones) {

            const div = document.createElement('div')
            div.classList.add('col-lg-4')
            div.innerHTML = `
    
    
                <div class="card p-4 border bg-light w-100">
    
                    <img  class="w-50 mx-auto" src="${phone.image}" class="card-img-top" alt="...">
    
                    <div class="card-body mt-2">
                        
                        <h3 class="card-title">${phone.phone_name}</h3>
                        <h4 class="card-title">Brand: ${phone.brand}</h4>
    
                        <button type="button" class="btn btn-warning text-center mt-2">More Details . . .</button>
                      
                    </div>
                    
                </div>
    
            `;
            mainContainer.appendChild(div)
        }
        console.log('pukpuk')
    }
    else {
        document.getElementById('error-box').style.display = 'block'
        console.log('tuktuk')
    }


}