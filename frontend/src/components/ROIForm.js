
import React, { useState, useEffect } from 'react';
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
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [email, setEmail] = useState('');
  const [reportHtml, setReportHtml] = useState('');

  useEffect(() => {
    loadScenarios();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSimulate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/simulate', formData);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };

  const saveScenario = async () => {
    if (!formData.scenario_name) {
      alert('Enter a scenario name first!');
      return;
    }
    await axios.post('http://localhost:5000/scenarios', formData);
    alert('Scenario saved!');
    loadScenarios();
  };

  const loadScenarios = async () => {
    const res = await axios.get('http://localhost:5000/scenarios');
    setSavedScenarios(res.data);
  };

  const loadScenario = (scenario) => {
    setFormData(scenario);
    setResults(null);
  };

  const deleteScenario = async (name) => {
    await axios.delete(`http://localhost:5000/scenarios/${name}`);
    alert('Scenario deleted!');
    loadScenarios();
  };

  const handleReportDownload = async () => {
    if (!email) {
      alert('Please enter your email to download the report.');
      return;
    }
    if (!results) {
      alert('Please run a simulation first.');
      return;
    }
    const payload = {
      scenario: { ...formData, ...results },
      email
    };
    const res = await axios.post('http://localhost:5000/report/generate', payload);
    setReportHtml(res.data.report_html);
    // Download as HTML file
    const blob = new Blob([res.data.report_html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.scenario_name || 'roi_report'}.html`;
    link.click();
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">ROI Simulator</h1>

      <input name="scenario_name" placeholder="Scenario Name" value={formData.scenario_name} onChange={handleChange} className="border p-2 m-1"/>
      <input name="monthly_invoice_volume" type="number" placeholder="Monthly Invoice Volume" value={formData.monthly_invoice_volume} onChange={handleChange} className="border p-2 m-1"/>
      <input name="num_ap_staff" type="number" placeholder="Number of AP Staff" value={formData.num_ap_staff} onChange={handleChange} className="border p-2 m-1"/>
      <input name="avg_hours_per_invoice" type="number" placeholder="Avg Hours per Invoice" value={formData.avg_hours_per_invoice} onChange={handleChange} className="border p-2 m-1"/>
      <input name="hourly_wage" type="number" placeholder="Hourly Wage" value={formData.hourly_wage} onChange={handleChange} className="border p-2 m-1"/>
      <input name="error_rate_manual" type="number" placeholder="Error Rate (%)" value={formData.error_rate_manual} onChange={handleChange} className="border p-2 m-1"/>
      <input name="error_cost" type="number" placeholder="Error Cost" value={formData.error_cost} onChange={handleChange} className="border p-2 m-1"/>
      <input name="time_horizon_months" type="number" placeholder="Time Horizon (months)" value={formData.time_horizon_months} onChange={handleChange} className="border p-2 m-1"/>
      <input name="one_time_implementation_cost" type="number" placeholder="Implementation Cost" value={formData.one_time_implementation_cost} onChange={handleChange} className="border p-2 m-1"/>

      <div className="mt-3">
        <button onClick={handleSimulate} className="bg-blue-500 text-white p-2 m-1">Simulate</button>
        <button onClick={saveScenario} className="bg-green-500 text-white p-2 m-1">Save Scenario</button>
      </div>

      {results && (
        <div className="mt-5 border p-3">
          <h2 className="font-bold">Results:</h2>
          <p>Monthly Savings: ${results.monthly_savings}</p>
          <p>Cumulative Savings: ${results.cumulative_savings}</p>
          <p>Net Savings: ${results.net_savings}</p>
          <p>Payback (months): {results.payback_months}</p>
          <p>ROI (%): {results.roi_percentage}</p>
          <div className="mt-3">
            <input type="email" placeholder="Enter your email to download report" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 m-1" />
            <button onClick={handleReportDownload} className="bg-purple-500 text-white p-2 m-1">Download Report</button>
          </div>
        </div>
      )}

      <h2 className="mt-5 font-bold">Saved Scenarios</h2>
      <ul>
        {savedScenarios.map(s => (
          <li key={s._id} className="mb-2">
            <span className="font-semibold">{s.scenario_name}</span>
            <button onClick={() => loadScenario(s)} className="bg-gray-300 p-1 m-1">Load</button>
            <button onClick={() => deleteScenario(s.scenario_name)} className="bg-red-500 text-white p-1 m-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ROIForm;
