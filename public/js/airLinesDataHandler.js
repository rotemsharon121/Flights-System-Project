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
        const paramValue = form.elements['searchAirlineBySelector'].value
        const paramValueFixer = () => {
            switch (paramValue) {
                case 'airline id':
                    return 'id'
                case 'manager name':
                    return 'User_name'
                case 'country id':
                    return 'country_id'
                case 'airline company name':
                    return 'Company_name'
            }
        }
        const listParam = paramValueFixer()
        const searchParam = form.elements['search-box'].value
        const searchResults = document.getElementById('searchResults')

        fetch(`http://localhost:3000/airlineCompanies/api/AirlineByParams/${listParam}&${searchParam}`)
            .then(response => response.json())
            .then(data => {
                if (data.length == 0) {
                    searchResults.innerHTML =
                        `<div class="col-lg-10 text-center mx-auto">
                                <h3 class="text-danger">Unable to find the Airline based on the parameters entered by the user</h3>`
                } else {
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
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    })
}
