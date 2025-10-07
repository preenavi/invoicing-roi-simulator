import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ROIForm = () => {
  const [formData, setFormData] = useState({
    scenario_name: '',
    monthly_invoice_volume: 0,
    num_ap_staff: 0,
    avg_hours_per_invoice: 0,
    hourly_wage: 0,
    error_rate_manual: 0,
    error_cost: 0,
    time_horizon_months: 0,
    one_time_implementation_cost: 0
  });

  const [results, setResults] = useState({});
  const [savedScenarios, setSavedScenarios] = useState([]);

  // Load all saved scenarios
  const loadScenarios = async () => {
    const res = await axios.get('http://localhost:5000/scenarios');
    setSavedScenarios(res.data);
  };

  useEffect(() => {
    loadScenarios();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) || value }));
  };

  // Simulate ROI
  const simulate = async () => {
    const res = await axios.post('http://localhost:5000/simulate', formData);
    setResults(res.data);
  };

  // Save scenario
  const saveScenario = async () => {
    if (!formData.scenario_name) {
      alert('Enter a scenario name first!');
      return;
    }
    await axios.post('http://localhost:5000/scenarios', formData);
    alert('Scenario saved!');
    loadScenarios();
  };

  // Load scenario
  const loadScenario = (scenario) => {
    setFormData(scenario);
  };

  // Delete scenario
  const deleteScenario = async (name) => {
    await axios.delete(`http://localhost:5000/scenarios/${name}`);
    alert('Scenario deleted!');
    loadScenarios();
  };

  return (
    <div>
      <h2>ROI Simulator</h2>
      <div>
        <label>Scenario Name:</label>
        <input name="scenario_name" value={formData.scenario_name} onChange={handleChange} />
      </div>
      <div>
        <label>Monthly Invoice Volume:</label>
        <input name="monthly_invoice_volume" type="number" value={formData.monthly_invoice_volume} onChange={handleChange} />
      </div>
      <div>
        <label>Number of AP Staff:</label>
        <input name="num_ap_staff" type="number" value={formData.num_ap_staff} onChange={handleChange} />
      </div>
      <div>
        <label>Avg Hours per Invoice:</label>
        <input name="avg_hours_per_invoice" type="number" value={formData.avg_hours_per_invoice} onChange={handleChange} />
      </div>
      <div>
        <label>Hourly Wage:</label>
        <input name="hourly_wage" type="number" value={formData.hourly_wage} onChange={handleChange} />
      </div>
      <div>
        <label>Error Rate (%):</label>
        <input name="error_rate_manual" type="number" value={formData.error_rate_manual} onChange={handleChange} />
      </div>
      <div>
        <label>Error Cost:</label>
        <input name="error_cost" type="number" value={formData.error_cost} onChange={handleChange} />
      </div>
      <div>
        <label>Time Horizon (months):</label>
        <input name="time_horizon_months" type="number" value={formData.time_horizon_months} onChange={handleChange} />
      </div>
      <div>
        <label>One-time Implementation Cost:</label>
        <input name="one_time_implementation_cost" type="number" value={formData.one_time_implementation_cost} onChange={handleChange} />
      </div>

      <button onClick={simulate}>Simulate</button>
      <button onClick={saveScenario}>Save Scenario</button>

      {results.monthly_savings && (
        <div>
          <h3>Results:</h3>
          <p>Monthly Savings: ${results.monthly_savings}</p>
          <p>Cumulative Savings: ${results.cumulative_savings}</p>
          <p>Net Savings: ${results.net_savings}</p>
          <p>Payback (months): {results.payback_months}</p>
          <p>ROI (%): {results.roi_percentage}</p>
        </div>
      )}

      <h3>Saved Scenarios</h3>
      <ul>
        {savedScenarios.map(s => (
          <li key={s._id}>
            {s.scenario_name}
            <button onClick={() => loadScenario(s)}>Load</button>
            <button onClick={() => deleteScenario(s.scenario_name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ROIForm;
