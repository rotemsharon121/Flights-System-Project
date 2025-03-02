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
            const row = document.createElement(`div`)
            row.id = `${customer.id}`
            row.className = 'col-sm-6 col-md-4 col-lg-3'
            row.innerHTML = `
                    <form action="/user_page">
                        <button class="btn btn-outline-primary" type="submit" style= "border: none;">
                            <img src="${customer.Profile_picture}" class="card-img-top rounded-circle mt-5" alt="random person">
                            <div class="card-body">
                                <h5 class="card-title">${customer.User_name}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${customer.First_name} ${customer.Last_name}</li>
                            </ul>
                        </button>
                    </form>
                    `
            login.appendChild(row)

            row.addEventListener('submit', (event) => {
                const userid = row.id
                const cookieExpires = 60 * 10 // cookie expires after 10 minutes
                document.cookie = `customer=${userid}; max-age=${cookieExpires}`
            })
        })

    })
    .catch(error => {
        console.error('Error fetching data:', error)

    })

// loginForm.addEventListener('click', (event) => {
//     console.log('user1 clicked')
//     const userid = event.target.id
//     console.log(userid)

// })

// loginForm.addEventListener('submit', (event) => {
//     const userid = event.target.id
//     console.log(userid)
//     document.cookie = `customer=${userId}`
// })