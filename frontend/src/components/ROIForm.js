import React, { useState } from 'react';
import axios from 'axios';

function ROIForm() {
  const [formData, setFormData] = useState({
    scenario_name: '',
    monthly_invoice_volume: 0,
    num_ap_staff: 0,
    avg_hours_per_invoice: 0,
    hourly_wage: 0,
    error_rate_manual: 0,
    error_cost: 0,
    time_horizon_months: 36,
    one_time_implementation_cost: 0
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSimulate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/simulate', formData);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">ROI Simulator</h1>

      <input name="scenario_name" placeholder="Scenario Name" onChange={handleChange} className="border p-2 m-1"/>
      <input name="monthly_invoice_volume" type="number" placeholder="Monthly Invoice Volume" onChange={handleChange} className="border p-2 m-1"/>
      <input name="num_ap_staff" type="number" placeholder="Number of AP Staff" onChange={handleChange} className="border p-2 m-1"/>
      <input name="avg_hours_per_invoice" type="number" placeholder="Avg Hours per Invoice" onChange={handleChange} className="border p-2 m-1"/>
      <input name="hourly_wage" type="number" placeholder="Hourly Wage" onChange={handleChange} className="border p-2 m-1"/>
      <input name="error_rate_manual" type="number" placeholder="Error Rate (%)" onChange={handleChange} className="border p-2 m-1"/>
      <input name="error_cost" type="number" placeholder="Error Cost" onChange={handleChange} className="border p-2 m-1"/>
      <input name="time_horizon_months" type="number" placeholder="Time Horizon (months)" onChange={handleChange} className="border p-2 m-1"/>
      <input name="one_time_implementation_cost" type="number" placeholder="Implementation Cost" onChange={handleChange} className="border p-2 m-1"/>
      
      <div className="mt-3">
        <button onClick={handleSimulate} className="bg-blue-500 text-white p-2 m-1">Simulate</button>
      </div>

      {results && (
        <div className="mt-5 border p-3">
          <h2 className="font-bold">Results:</h2>
          <p>Monthly Savings: ${results.monthly_savings}</p>
          <p>Cumulative Savings: ${results.cumulative_savings}</p>
          <p>Net Savings: ${results.net_savings}</p>
          <p>Payback (months): {results.payback_months}</p>
          <p>ROI (%): {results.roi_percentage}</p>
        </div>
      )}
    </div>
  )
}

export default ROIForm;
