# Weather Forecasting Application

A cloud-based weather forecasting application built with Node.js, Express, MySQL, and OpenWeatherMap API.

## Features

- Real-time weather data for any city
- Responsive UI with Bootstrap
- Weather metrics visualization with Chart.js
- Admin dashboard for API usage monitoring
- MySQL database for logging API requests

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- OpenWeatherMap API Key (free at https://openweathermap.org/api)

## Installation

1. Clone or download the project files.

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the database:

   - Create a MySQL database named `weather_app`.
   - Run the `init.sql` script to create the necessary tables.

4. Create a `.env` file in the root directory with the following variables:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=weather_app
   PORT=3000
   ```

## Running the Application

1. Start the server:

   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Enter a city name to get weather information.

## Admin Dashboard

Access the admin dashboard at `http://localhost:3000/admin` to view API usage statistics. The dashboard displays a chart showing the number of API requests made in the last 7 days.

## Cloud Deployment

### AWS Deployment

1. Create an EC2 instance with Node.js and MySQL installed.
2. Upload your project files to the instance.
3. Set up environment variables.
4. Run the application with PM2 for production:
   ```
   npm install -g pm2
   pm2 start server.js --name weather-app
   pm2 startup
   pm2 save
   ```
5. Configure security groups to allow HTTP/HTTPS traffic.

### Alternative Cloud Providers

- Heroku: Use Heroku CLI to deploy.
- DigitalOcean: Similar to AWS EC2 setup.
- Vercel/Netlify: For frontend-only deployment, but backend would need separate hosting.

## API Endpoints

- `GET /api/weather?city=<city_name>`: Fetch weather data for a city.
- `GET /admin`: Get API usage logs (JSON).

## Technologies Used

- Backend: Node.js, Express
- Database: MySQL
- Frontend: HTML, CSS, JavaScript, Bootstrap, Chart.js
- API: OpenWeatherMap

## License

ISC
