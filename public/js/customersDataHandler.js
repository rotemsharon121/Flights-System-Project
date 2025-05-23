const allCustomers = document.getElementById('allCustomers')

fetch('http://localhost:3000/customers/api/allCustomers')
    .then(response => response.json())
    .then(data => {
        if (data === 'an error occurred, can\'t show all customers') {
            allCustomers.innerHTML =
                `<div class="col-lg-10 text-center mx-auto">
                        <h3 class="text-danger">an error occurred, can't show all customers</h3>`
        }
        data.forEach(customer => {
            const row = document.createElement('div')
            row.className = 'col-sm-6 col-md-4 col-lg-3'
            row.innerHTML = `
                        <div class="card">
                            <img src=/public/img/customersIMG/${customer.Profile_picture} class="card-img-top" alt="random person">
                            <div class="card-body">
                                <h5 class="card-title">${customer.First_name}</h5>
                                <h5 class="card-title">${customer.Last_name}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${customer.Address}</li>
                                <li class="list-group-item">${customer.Phone_number}</li>
                                <li class="list-group-item">${customer.User_name}</li>
                            </ul>
                        </div>
                    </div>`
            allCustomers.appendChild(row)
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error)

    })

    