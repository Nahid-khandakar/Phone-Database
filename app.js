//search button click and data load
const searchButton = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;

    if (isNaN(inputValue) == false || inputValue == "") {
        alert('Text Only');
        input.value = '';
    }

    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
        input.value = '';
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data))
        document.getElementById('error-box').style.display = 'none'

    }
    //clean main contain for search another contain
    document.getElementById('main').textContent = "";

    //clean phone details 
    document.getElementById('details-container').textContent = "";
}

//display all phone in 3 colunm

const displayPhone = (phones) => {

    if (phones.length > 0) {
        const mainContainer = document.getElementById('main');

        for (const phone of phones.slice(0, 20)) {

            const div = document.createElement('div')
            div.classList.add('col-lg-4')
            div.innerHTML = `
    
                <div class="card p-4 border bg-light w-100 bg-white">
    
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

//display details div 
const displayPhoneDetails = (phoneDetails) => {

    //check phone details object  other property

    const othersdata = phoneDetails.others
    const checkOthers = (othersdata) => {
        if (othersdata == undefined) {
            return 'No others data found'
        }
        else {
            return othersdata
        }
    }

    //Main details div
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.textContent = '';
    const div = document.createElement('div')
    div.innerHTML = `

    <div class="col-lg-6 col-12 shadow-lg card mx-auto">

        <img src="${phoneDetails.image}" class="card-img-top w-50 mx-auto mt-5 p-2" alt="...">

        <div class="card-body">
            <h4>${phoneDetails.name}</h4>
            <h5>Brand: ${phoneDetails.brand}</h5>
            <h5>${phoneDetails.releaseDate ? phoneDetails.releaseDate : "Release date not found"}</h5>

            <hr>
            
            <h5 class="text-danger">Main Features</h5>

            <ul>

            <li><b>Storage</b> <br> ${phoneDetails.mainFeatures.storage ? phoneDetails.mainFeatures.storage : "Not found"}</li>

            <li><b>Display Size</b> <br> ${phoneDetails.mainFeatures.displaySize ? phoneDetails.mainFeatures.displaySize : "Not found"}</li>

            <li><b>ChipSet</b> <br> ${phoneDetails.mainFeatures.chipSet ? phoneDetails.mainFeatures.chipSet : "Not found"}</li>

            <li><b>Memory</b> <br> ${phoneDetails.mainFeatures.memory ? phoneDetails.mainFeatures.memory : "Not found"}</li>
            </ul>

            <hr>

            <h5 class="text-danger">Sensor List</h5>

            <p class="card-title">${Object.values(phoneDetails.mainFeatures.sensors ? phoneDetails.mainFeatures.sensors : "Sensor data not found")}</p>

            <hr>

            <h5 class="text-danger">Others</h5>
 
            <ul>
            <li>Wlan: ${checkOthers(phoneDetails?.others?.WLAN)}</li>
            <li>Bluetooth: ${checkOthers(phoneDetails?.others?.Bluetooth)}</li>
            <li>GPS: ${checkOthers(phoneDetails?.others?.GPS)}</li>
            <li>NFC: ${checkOthers(phoneDetails?.others?.NFC)}</li>
            <li>Radio: ${checkOthers(phoneDetails?.others?.Radio)}</li>
            <li>USB: ${checkOthers(phoneDetails?.others?.USB)}</li>
            </ul>

            <hr>

            <button onclick="hideDetailsDisplay()" class="btn btn-warning mx-auto"> Main Page</button>
        </div>
    </div>

    `;
    detailsContainer.appendChild(div);

}

//details div hide
const hideDetailsDisplay = () => {
    document.getElementById('details-container').style.display = 'none'
}
