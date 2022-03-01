const searchButton = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
}

