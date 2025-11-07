ye# TODO List for Weather Forecasting Application Setup and Testing

- [x] Check if MySQL is installed on the system (Already installed)
- [ ] Execute init.sql to create the 'weather_app' database and 'api_logs' table
- [x] Create .env file with placeholders for OPENWEATHER_API_KEY and DB credentials
- [ ] Instruct user to obtain OpenWeatherMap API key and add it to .env
- [ ] Start the server (npm start) and verify database connection
- [ ] Test weather API integration with real data (requires API key)
- [ ] Test frontend functionality: form submission, data display, charts
- [ ] Test admin dashboard: API usage statistics chart
- [ ] Test error handling: invalid cities, API failures
- [ ] Test responsive design on different screen sizes

# Previous Enhancements (Completed)

- [x] Update server.js: Add route to serve admin.html, rename /admin to /admin/data, add comments to all functions
- [x] Create public/admin.html: HTML page for admin dashboard with Bootstrap and Chart.js
- [x] Create public/admin.js: JavaScript to fetch /admin/data and display usage chart
- [x] Update public/index.html: Add link to admin dashboard
- [x] Update public/script.js: Add comments to all functions
- [x] Update db_config.js: Add comments to functions
- [x] Update README.md: Add admin dashboard access instructions
