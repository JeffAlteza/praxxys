# Laravel Vue.js Project

## Project Setup

### Laravel Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/JeffAlteza/praxxys.git
    ```
2. Install Dependencies:
    ```bash
    composer install
    ```

3. Generate Application Key:
    ```bash
    php artisan key:generate
    ```
4. Run Migration and Seeder:
    ```
    php artisan migrate:fresh --seed
    ```

5. Serve the Application:
    ```
    php artisan serve
    ```

6. Copy the Server URL:
Example: http://localhost:8000

### Vue Setup

1. Navigate to Vue Project Directory:
    ```
    cd /vite-project
    ```

2. Configure Laravel Server URL:
    Open vite-project/src/main.js.
    Set the Laravel server URL:
    ```
    window.domain = "http://localhost:8000";
    ```

3. Install Node.js Dependencies:
    ```
    npm install
    ```
    
4. Run Development Server:
    ```
    npm run dev
    ```
5. Open the Application:
   Navigate to the provided link.

Credentials
Username: admin@gmail.com
Password: password
