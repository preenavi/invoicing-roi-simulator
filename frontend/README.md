
# Invoicing ROI Simulator

## Overview
This app helps users simulate cost savings, ROI, and payback when switching from manual to automated invoicing. It includes a React frontend and Node.js/Express backend with MongoDB for scenario storage.

## Features
- Quick ROI simulation with live results
- Save, load, and delete named scenarios
- Downloadable HTML report (email required)
- REST API for all operations

## Setup Instructions

### 1. Backend
1. Navigate to the `backend` folder:
	```powershell
	cd ../backend
	```
2. Install dependencies:
	```powershell
	npm install
	```
3. Start MongoDB locally (default URI: `mongodb://127.0.0.1:27017/roi_simulator`).
4. Start the backend server:
	```powershell
	node server.js
	```

### 2. Frontend
1. Navigate to the `frontend` folder:
	```powershell
	cd ../frontend
	```
2. Install dependencies:
	```powershell
	npm install
	```
3. Start the React app:
	```powershell
	npm start
	```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
1. Fill out the form with your business metrics.
2. Click **Simulate** to view results instantly.
3. Save scenarios for future reference.
4. Download a report by entering your email and clicking **Download Report**.

## API Endpoints
- `POST /simulate` — Run simulation
- `POST /scenarios` — Save scenario
- `GET /scenarios` — List scenarios
- `GET /scenarios/:name` — Get scenario details
- `DELETE /scenarios/:name` — Delete scenario
- `POST /report/generate` — Generate HTML report (email required)

## Testing
- Frontend: `npm test` in the `frontend` folder
- Backend: Use Postman or curl to test API endpoints

## Demo
Host locally or deploy online (Render, Vercel, etc.).

## Contact
For questions, email your lead or open an issue in the repository.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
