### Instructions for Running the Flights System Project - Tests  

1. **Install Dependencies:**  
   Run the following command:  
   ```bash
   npm install
   ```  

2. **Create a `.env` File:**  
   Create a file named `.env` and add the following settings:  
   ```env
   DB_USER_NAME='your MySQL username'
   DB_USER_PASSWORD='your password'
   DATABASE_SCHEMA='flight_system'
   ```  
   *(The default username is usually `root`)*  

3. **Start the Server:**  
   Run the following command:  
   ```bash
   npm run start
   ```  

4. **Access the Website:**  
   Open your browser and navigate to the URL: [localhost:3000](http://localhost:3000/)  

5. **Set Up the Database:**  
   Download the *sql database file* from the homepage (or run it directly from the `config` folder) and use it to initialize the project schema in your MySQL database.  

   After initializing the schema, restart the server.  

6. **Authentication Issues:**  
   If you encounter authentication issues, download the *Authentication handling file* from the homepage (or the `config` folder) and follow the instructions provided.  

7. **Verify Everything is Working:**  
   If everything is set up correctly, you should see the following lines in the terminal:  
   ```
   server started on port 3000  
   Database connected with my sql  
   Database connected with my sql2  
   Database connected with knex  
   ```

**Enjoy!**
