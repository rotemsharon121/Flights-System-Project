const customerCookie = document.cookie.includes('customer')
const customerId = document.cookie.split('=')[1]

if (document.getElementById('allFlightsTable')) {
    const allFlights = document.getElementById('allFlightsTable')

    fetch('http://localhost:3000/flights/api/allFlights')
        .then(response => response.json())
        .then(data => {
            if (data === 'There is no flights') {
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
                allFlights.appendChild(row)
            } else {
                data.forEach(flight => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<th scope='row'>${flight.id}</th>
                    <td>${flight.Airline_company_id}</td>
                    <td>${flight.Origin_contry_id}</td>
                    <td>${flight.Destination_country_id}</td>
                    <td>${flight.Departure_time}</td>
                    <td>${flight.Landing_time}</td>
                    <td>${flight.Remaining_tickets}</td>`
                    if (customerCookie) {
                        if (flight.Remaining_tickets < 1) {
                            row.innerHTML += `<td>no more tickets</td>`
                        } else {
                            row.innerHTML += `<td><button id="buyTicketBtn" class="btn btn-primary btn-rounded">Buy</button></td>`
                            row.querySelector('#buyTicketBtn') .addEventListener('click', () => {
                                fetch(`http://localhost:3000/tickets/api/newTicket`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': document.cookie
                                    },
                                    body: JSON.stringify({
                                        "Customer_Id": customerId,
                                        "Flight_Id": flight.id,
                                        "Remaining_tickets": flight.Remaining_tickets - 1
                                    })
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.messege === 'sucsses') {
                                            //need to update the remaining tickets
                                            window.location.reload()
                                            alert('ticket was purchased successfully')
                                        } else {
                                            alert('ticket was not purchased')
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error)
                                    })
                            })
                        }
        }
                    allFlights.appendChild(row)
                })
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error)

        })
}

if (document.getElementById('flight-form')) {
    const form = document.getElementById('flight-form')
    const searchResults = document.getElementById('searchResults')


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const origin = form.elements['origin'].value === '' ? 'no-data' : form.elements['origin'].value
        const destination = form.elements['destination'].value === '' ? 'no-data' : form.elements['destination'].value
        const departure = form.elements['departure-date'].value === '' ? 'no-data' : form.elements['departure-date'].value
        const landing = form.elements['landing-date'].value === '' ? 'no-data' : form.elements['landing-date'].value
        // const landing = form.elements['landing-date'].value.trim() !== '' ? form.elements['landing-date'].value : 'empty';
        // console.log(origin, destination, departure, landing)

        if (origin === 'no-data' && destination === 'no-data' && departure === 'no-data' && landing === 'no-data') {
            searchResults.innerHTML =
                `<div class="col-lg-10 text-center mx-auto">
                <h3 class="text-danger">please enter a search parameter</h3>` }
        else {
            fetch(`http://localhost:3000/flights/api/flightByParams/${origin}&${destination}&${departure}&${landing}`)
                .then(response => response.json())
                .then(data => {
                    switch (data) {
                        case 'ERROR origin country does not exist':
                            searchResults.innerHTML =
                                `<div class="col-lg-10 text-center mx-auto">
                            <h3 class="text-danger">origin country does not exist (${origin})</h3>`
                            break;

                        case 'ERROR destination country does not exist':
                            searchResults.innerHTML =
                                `<div class="col-lg-10 text-center mx-auto">
                                <h3 class="text-danger">destination country does not exist (${destination})</h3>`
                            break

                        case 'ERROR Unable to find the flight':
                            searchResults.innerHTML =
                                `<div class="col-lg-10 text-center mx-auto">
                                <h3 class="text-danger">Unable to find the flight based on the parameters entered by the user</h3>`
                            break

                        default:
                            searchResults.innerHTML =
                                `<table class="table table-hover table-bordered">
                            <thead>
                            <tr>
                            <th scope="col">flight id</th>
                            <th scope="col">airline company</th>
                            <th scope="col">origin country</th>
                            <th scope="col">destination country</th>
                            <th scope="col">departure time</th>
                            <th scope="col">landing time</th>
                            <th scope="col">remaining tickets</th>
                            <th scope="col">buy ticket</th>
                            </tr>
                            </thead>
                            <tbody id="FlightsSearchTable">
                            </tbody>
                            </table>`
                            const FlightsSearch = document.getElementById('FlightsSearchTable')
                            data.forEach(flight => {
                                const row = document.createElement('tr');
                                row.innerHTML = `<th scope='row'>${flight.id}</th>
                                <td>${flight.Airline_company_id}</td>
                                <td>${flight.Origin_contry_id}</td>
                                <td>${flight.Destination_country_id}</td>
                                <td>${flight.Departure_time}</td>
                                <td>${flight.Landing_time}</td>
                                <td>${flight.Remaining_tickets}</td>`
                                if (customerCookie) {
                                    if (flight.Remaining_tickets < 1) {
                                        row.innerHTML += `<td>no more tickets</td>`
                                    } else {
                                        row.innerHTML += `<td><button id="buyTicketBtn" class="btn btn-primary btn-rounded">Buy ticket</button></td>`
                                        row.querySelector('#buyTicketBtn') .addEventListener('click', () => {
                                            fetch(`http://localhost:3000/tickets/api/newTicket`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': document.cookie
                                                },
                                                body: JSON.stringify({
                                                    "Customer_Id": customerId,
                                                    "Flight_Id": flight.id,
                                                    "Remaining_tickets": flight.Remaining_tickets - 1
                                                })
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    if (data.messege === 'sucsses') {
                                                        //need to update the remaining tickets
                                                        window.location.reload()
                                                        alert('ticket was purchased successfully')
                                                    } else {
                                                        alert('ticket was not purchased')
                                                    }
                                                })
                                                .catch(error => {
                                                    console.error('Error:', error)
                                                })
                                        })
                                    }
                    }
                                FlightsSearch.appendChild(row)
                            })
                            break;
                    }

                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        }
    })
}
