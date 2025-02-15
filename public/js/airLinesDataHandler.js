if (document.getElementById('allAirlinesTable')) {
    const allAirLines = document.getElementById('allAirlinesTable')

    fetch('http://localhost:3000/airlineCompanies/api/allAirlineCompanies')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if (data === 'There is no airline Companies') {
                const row = document.createElement('tr');
                row.innerHTML =
                    `<th scope="row">no data</th>
                    <td>no data</td>
                    <td>no data</td>
                    <td>no data</td>
                    <td>no data</td>
                    <td>no data</td>
                    <td>no data</td>
                    <td>no data</td>`
                allAirLines.appendChild(row)
            } else {
                data.forEach(airLine => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<th scope='row'>${airLine.id}</th>
                    <td>${airLine.Company_name}</td>
                    <td>${airLine.Country_id}</td>
                    <td>${airLine.User_name}</td>`
                    allAirLines.appendChild(row)
                })
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error)

        })
}

if (document.getElementById('search-form')) {
    const form = document.getElementById('search-form')

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const listParam = form.elements['searchAirlineBySelector'].value
        const searchParam = form.elements['search-box'].value
        const searchResults = document.getElementById('searchResults')

        console.log(listParam)
        console.log(searchParam)
        // const origin = form.elements['origin'].value === '' ? 'no-data' : form.elements['origin'].value
        // const destination = form.elements['destination'].value === '' ? 'no-data' : form.elements['destination'].value
        // const departure = form.elements['departure-date'].value === '' ? 'no-data' : form.elements['departure-date'].value
        // const landing = form.elements['landing-date'].value === '' ? 'no-data' : form.elements['landing-date'].value
        // const landing = form.elements['landing-date'].value.trim() !== '' ? form.elements['landing-date'].value : 'empty';
        // console.log(origin, destination, departure, landing)

        // if (origin === 'no-data' && destination === 'no-data' && departure === 'no-data' && landing === 'no-data') {
        //     searchResults.innerHTML =
        //         `<div class="col-lg-10 text-center mx-auto">
        //         <h3 class="text-danger">please enter a search parameter</h3>` }
        // else {
            fetch(`http://localhost:3000/airlineCompanies/api/AirlineByParams/${listParam}&${searchParam}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    
                    // switch (data) {
                    //     case 'ERROR origin country does not exist':
                    //         searchResults.innerHTML =
                    //             `<div class="col-lg-10 text-center mx-auto">
                    //         <h3 class="text-danger">origin country does not exist (${origin})</h3>`
                    //         break;

                    //     case 'ERROR destination country does not exist':
                    //         searchResults.innerHTML =
                    //             `<div class="col-lg-10 text-center mx-auto">
                    //             <h3 class="text-danger">destination country does not exist (${destination})</h3>`
                    //         break

                    //     case 'ERROR Unable to find the flight':
                    //         searchResults.innerHTML =
                    //             `<div class="col-lg-10 text-center mx-auto">
                    //             <h3 class="text-danger">Unable to find the flight based on the parameters entered by the user</h3>`
                    //         break

                    //     default:
                            searchResults.innerHTML =
                                `<table class="table table-hover table-bordered">
                            <thead>
                            <tr>
                            <th scope="col">airline id</th>
                            <th scope="col">airline company name</th>
                            <th scope="col">country</th>
                            <th scope="col">manager name</th>
                            </tr>
                            </thead>
                            <tbody id="AirlinesSearchTable">
                            </tbody>
                            </table>`
                            const AirlinesSearchTable = document.getElementById('AirlinesSearchTable')

                            data.forEach(airline => {
                                const row = document.createElement('tr');
                                row.innerHTML = `<th scope='row'>${airline.id}</th>
                                <td>${airline.Company_name}</td>
                                <td>${airline.Country_id}</td>
                                <td>${airline.User_name}</td>`
                                AirlinesSearchTable.appendChild(row)
                            })
                            // break;
                    // }

                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        // }
    })
}
