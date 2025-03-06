const userId = document.cookie.split('=')[1]

document.addEventListener('DOMContentLoaded', () => {

    if (!userId) {
        document.getElementById('changeProfileButton').innerHTML = `No user logged in`
    } else {
        fetch(`http://localhost:3000/customers/api/${userId}`)
            .then(response => response.json())
            .then(data => {
                // if (data) {
                // console.log(data)
                // console.log(data.customer)
                // console.log(data.tickets)
                const customerData = data.customer
                const ticketsData = data.tickets

                const firstName = document.getElementById('first_name').value = customerData.First_name
                // firstName.value = customerData.First_name
                const lastName = document.getElementById('last_name').value = customerData.Last_name
                // lastName.value = customerData.Last_name
                const fullName = document.getElementById('full_name')
                fullName.textContent = firstName + ' ' + lastName
                document.getElementById('phone_number').value = customerData.Phone_number
                document.getElementById('address').value = customerData.Address
                const userName = document.getElementById('user_name').value = customerData.User_name
                profile_user_name.textContent = userName
                document.getElementById('password').value = customerData.User_password
                document.getElementById('Credit card number').value = customerData.Credit_card_number
                document.getElementById('User ID number').textContent = customerData.id
                // document.getElementById('profile_img').src = customerData.Profile_picture
                document.getElementById('profile_img').src = `/public/img/customersIMG/${customerData.Profile_picture}`

                tickets.innerHTML =
                    `<table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ticket id</th>
                                        <th scope="col">flight id</th>
                                        <th scope="col">airline company</th>
                                        <th scope="col">origin country</th>
                                        <th scope="col">destination country</th>
                                        <th scope="col">departure time</th>
                                        <th scope="col">landing time</th>
                                        <th scope="col">remaining tickets</th>
                                    </tr>
                                </thead>
                                <tbody id="tickets-table">
                        </tbody>
                        </table>`

                ticketsData.forEach(ticket => {
                    fetch(`http://localhost:3000/flights/api/${ticket.Flight_id}`)
                        .then(response => response.json())
                        .then(flightData => {
                            // console.log(flightData)
                            const ticketsTable = document.getElementById('tickets-table')

                            const row = document.createElement('tr')
                            row.innerHTML =
                                `<th scope='row' class="table-warning">${ticket.id}</th>
                            <th scope='row' class="table-info">${flightData.id}</th>
                            <td>${flightData.Airline_company_id}</td>
                            <td>${flightData.Origin_contry_id}</td>
                            <td>${flightData.Destination_country_id}</td>
                            <td>${flightData.Departure_time}</td>
                            <td>${flightData.Landing_time}</td>
                            <td>${flightData.Remaining_tickets}</td>`
                            ticketsTable.appendChild(row)

                        })
                })


                // } else {
                //     console.error('No data found for the user.');
                // }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }

})


const updateButton = document.getElementById('saveProfile')
updateButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/customers/api/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            First_name: document.getElementById('first_name').value,
            Last_name: document.getElementById('last_name').value,
            Address: document.getElementById('address').value,
            Phone_number: document.getElementById('phone_number').value,
            Credit_card_number: document.getElementById('Credit card number').value,
            User_name: document.getElementById('user_name').value,
            User_password: document.getElementById('password').value
        })
        
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            window.location.reload()
        })
})

const deleteButton = document.getElementById('deleteProfile')
deleteButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/customers/api/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.cookie = `customer=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
            window.location.href = '/registerOrLogin'
        })
})