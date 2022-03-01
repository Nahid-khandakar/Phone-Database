//search button click and data load
const searchButton = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;
    input.value = '';

    //clean main contain for search another contain
    document.getElementById('main').textContent = "";

    //clean phone details 
    document.getElementById('details-container').textContent = "";

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
    document.getElementById('error-box').style.display = 'none'

}

//display all phone in 3 colunm

const displayPhone = (phones) => {

    if (phones.length > 0) {
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
    
                        <button onclick="getPhoneId('${phone.slug}')" type="button" class="btn btn-warning text-center mt-2">More Details . . .</button>
                      
                    </div>
                    
                </div>
    
            `;
            mainContainer.appendChild(div)
        }
    }
    else {
        document.getElementById('error-box').style.display = 'block'
    }
}
//set slug ,slug data come form more delatlis button 

const getPhoneId = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))

    document.getElementById('details-container').style.display = 'block'
}

const displayPhoneDetails = (phoneDetails) => {


    console.log(phoneDetails)
    // console.log(phoneDetails.name)
    // console.log(phoneDetails.brand)
    // console.log(phoneDetails.releaseDate)
    // console.log(phoneDetails.mainFeatures.storage)
    // console.log(phoneDetails.others.GPS)
    // console.log(phoneDetails.others.WLAN)
    // console.log(phoneDetails.others.Bluetooth)
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.textContent = '';
    const div = document.createElement('div')
    div.innerHTML = `

    <div class="card mx-2">
        <img src="${phoneDetails.image}" class="card-img-top w-50" alt="...">

        <div class="card-body mb-4">
            <h5 class="card-title">name:${phoneDetails.name}</h5>
            <h5 class="card-title">Brand:${phoneDetails.brand}</h5>
            <h5 class="card-title">Release Date:${phoneDetails.releaseDate}</h5>

            <button onclick="blockDisplay()"> Main Page</button>
        </div>
    </div>

    `;
    detailsContainer.appendChild(div);

}

const blockDisplay = () => {
    document.getElementById('details-container').style.display = 'none'
}