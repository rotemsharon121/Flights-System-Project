const login = document.getElementById('login')

fetch('http://localhost:3000/customers/api/allCustomers')
    .then(response => response.json())
    .then(data => {
        if (data === 'an error occurred, can\'t show all customers') {
            login.innerHTML =
                `<div class="col-lg-10 text-center mx-auto">
                        <h3 class="text-danger">an error occurred, can't show all customers</h3>`
        }
        data.forEach(customer => {
            const row = document.createElement('div')
            row.className = 'col-sm-6 col-md-4 col-lg-3'
            row.innerHTML = `

                            <img src="${customer.Profile_picture}" class="card-img-top rounded-circle mt-5" alt="random person">
                            <div class="card-body">
                                <h5 class="card-title">${customer.User_name}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${customer.First_name} ${customer.Last_name}</li>
                            </ul>

                    `
            login.appendChild(row)
        })

    })
    .catch(error => {
        console.error('Error fetching data:', error)

    })
