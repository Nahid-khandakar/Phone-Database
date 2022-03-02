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

    console.log(phoneDetails.slug)

    const detailsContainer = document.getElementById("details-container");
    detailsContainer.textContent = '';
    const div = document.createElement('div')
    div.innerHTML = `

    <div class="col-lg-6 col-12  card mx-auto">

        <img src="${phoneDetails.image}" class="card-img-top w-50 mx-auto mt-3" alt="...">

        <div class="card-body">
            <h4>${phoneDetails.name}</h4>
            <h5>Brand: ${phoneDetails.brand}</h5>
            <h5>${phoneDetails.releaseDate ? phoneDetails.releaseDate : "Release date not found"}</h5>

            <hr>
            
            <h5>Main Features</h5>

            <ul>

            <li><b>Storage</b> <br> ${phoneDetails.mainFeatures.storage ? phoneDetails.mainFeatures.storage : "Not found"}</li>

            <li><b>Display Size</b> <br> ${phoneDetails.mainFeatures.displaySize ? phoneDetails.mainFeatures.displaySize : "Not found"}</li>

            <li><b>ChipSet</b> <br> ${phoneDetails.mainFeatures.chipSet ? phoneDetails.mainFeatures.chipSet : "Not found"}</li>

            <li><b>Memory</b> <br> ${phoneDetails.mainFeatures.memory ? phoneDetails.mainFeatures.memory : "Not found"}</li>
            </ul>

            <hr>

            <h5>Sensor List</h5>

            <p class="card-title">${Object.values(phoneDetails.mainFeatures.sensors ? phoneDetails.mainFeatures.sensors : "Sensor data not found")}</p>

            <hr>

            <h5>Others</h5>

            
            <ul>
            <li>Wlan: ${phoneDetails.others.WLAN ? phoneDetails.others.WLAN : "Not Found"}</li>
            <li>Bluetooth: ${phoneDetails.others.Bluetooth ? phoneDetails.others.Bluetooth : "Not Found"}</li>
            <li>GPS :${phoneDetails.others.GPS ? phoneDetails.others.GPS : "Not Found"}</li>
            <li>NFC :${phoneDetails.others.NFC ? phoneDetails.others.NFC : "Not Found"}</li>
            <li>Radio :${phoneDetails.others.Radio ? phoneDetails.others.Radio : "Not Found"}</li>
            <li>USB :${phoneDetails.others.USB ? phoneDetails.others.USB : "Not Found"}</li>
            </ul>

            <hr>

            <button onclick="blockDisplay()" class="btn btn-warning mx-auto"> Main Page</button>
        </div>
    </div>

    `;
    detailsContainer.appendChild(div);

}

const blockDisplay = () => {
    document.getElementById('details-container').style.display = 'none'
}
