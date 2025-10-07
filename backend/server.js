const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/roi_simulator', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Constants
const AUTOMATED_COST_PER_INVOICE = 0.2;
const ERROR_RATE_AUTO = 0.001; // 0.1%
const MIN_ROI_BOOST_FACTOR = 1.1;

// API: Simulate ROI
app.post('/simulate', (req, res) => {
  const data = req.body;
  const labor_cost_manual = data.num_ap_staff * data.hourly_wage * data.avg_hours_per_invoice * data.monthly_invoice_volume;
  const auto_cost = data.monthly_invoice_volume * AUTOMATED_COST_PER_INVOICE;
  const error_savings = (data.error_rate_manual/100 - ERROR_RATE_AUTO) * data.monthly_invoice_volume * data.error_cost;

  let monthly_savings = (labor_cost_manual + error_savings) - auto_cost;
  monthly_savings *= MIN_ROI_BOOST_FACTOR;

  const cumulative_savings = monthly_savings * data.time_horizon_months;
  const net_savings = cumulative_savings - data.one_time_implementation_cost;
  const payback_months = data.one_time_implementation_cost / monthly_savings;
  const roi_percentage = (net_savings / data.one_time_implementation_cost) * 100;

  res.json({
    monthly_savings: monthly_savings.toFixed(2),
    cumulative_savings: cumulative_savings.toFixed(2),
    net_savings: net_savings.toFixed(2),
    payback_months: payback_months.toFixed(2),
    roi_percentage: roi_percentage.toFixed(2)
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
