import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Calculator, Download, RotateCcw, TrendingUp, Users, DollarSign, Percent, Settings } from 'lucide-react';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';

const RevenuePayrollCalculator = () => {
  // Input States
  const [totalCTC, setTotalCTC] = useState<number>(0);
  const [teamSize, setTeamSize] = useState<number>(32);
  const [revenueMultiplier, setRevenueMultiplier] = useState<string>('2');
  const [customMultiplier, setCustomMultiplier] = useState<number>(2);
  const [employerOverhead, setEmployerOverhead] = useState<number>(150000);
  const [foundersDrawCurrency, setFoundersDrawCurrency] = useState<number>(200000);
  const [salesMarketingSpend, setSalesMarketingSpend] = useState<number>(200000);
  const [toolsSaasHosting, setToolsSaasHosting] = useState<number>(75000);
  const [miscOps, setMiscOps] = useState<number>(50000);

  // Advanced Settings
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [benchPercent, setBenchPercent] = useState<number>(0);
  const [capexAdditions, setCapexAdditions] = useState<number>(0);
  const [customRevenue, setCustomRevenue] = useState<number>(0);

  // Calculated Values
  const [calculations, setCalculations] = useState<{
    revenueTarget?: number;
    totalOperationalCosts?: number;
    netProfit?: number;
    netMargin?: number;
    costOfDelivery?: number;
    avgCTCPerEmployee?: number;
    idealBilling2x?: number;
    highMarginBilling3x?: number;
    adjustedCTC?: number;
  }>({});

  const formatCurrency = (amount: number | bigint | ValueType) => {
    const numericAmount = typeof amount === 'number' || typeof amount === 'bigint' ? amount : 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numericAmount);
  };

  // Calculate all metrics
  useEffect(() => {
    const multiplier = revenueMultiplier === 'custom' ? customMultiplier : parseFloat(revenueMultiplier) || 1;
    const revenueTarget = customRevenue > 0 ? customRevenue : totalCTC * multiplier;
    const adjustedCTC = totalCTC * (1 + benchPercent / 100);
    const totalOperationalCosts =
      adjustedCTC +
      employerOverhead +
      foundersDrawCurrency +
      salesMarketingSpend +
      toolsSaasHosting +
      miscOps +
      capexAdditions;
    const netProfit = revenueTarget - totalOperationalCosts;
    const netMargin = revenueTarget > 0 ? (netProfit / revenueTarget) * 100 : 0;
    const costOfDelivery = revenueTarget > 0 ? ((adjustedCTC + employerOverhead) / revenueTarget) * 100 : 0;
    const avgCTCPerEmployee = teamSize > 0 ? totalCTC / teamSize : 0;
    const idealBilling2x = avgCTCPerEmployee * 2;
    const highMarginBilling3x = avgCTCPerEmployee * 3;

    setCalculations({
      revenueTarget,
      totalOperationalCosts,
      netProfit,
      netMargin,
      costOfDelivery,
      avgCTCPerEmployee,
      idealBilling2x,
      highMarginBilling3x,
      adjustedCTC,
    });
  }, [
    totalCTC,
    teamSize,
    revenueMultiplier,
    customMultiplier,
    employerOverhead,
    foundersDrawCurrency,
    salesMarketingSpend,
    toolsSaasHosting,
    miscOps,
    benchPercent,
    capexAdditions,
    customRevenue,
  ]);

  // Chart data
  const donutData = [
    { name: 'Employee CTC', value: calculations.adjustedCTC || 0, color: '#3B82F6' },
    { name: 'Employer Overhead', value: employerOverhead, color: '#10B981' },
    { name: 'Founders Draw', value: foundersDrawCurrency, color: '#F59E0B' },
    { name: 'Sales & Marketing', value: salesMarketingSpend, color: '#EF4444' },
    { name: 'Tools & SaaS', value: toolsSaasHosting, color: '#8B5CF6' },
    { name: 'Misc Operations', value: miscOps, color: '#6B7280' },
    { name: 'Net Profit', value: Math.max(0, calculations.netProfit || 0), color: '#059669' }
  ];

  const barData = [
    { multiplier: '1.5x', profit: totalCTC * 1.5 - calculations.totalOperationalCosts },
    { multiplier: '2x', profit: totalCTC * 2 - calculations.totalOperationalCosts },
    { multiplier: '3x', profit: totalCTC * 3 - calculations.totalOperationalCosts }
  ];

  const marginTrendData = [
    { multiplier: 1.5, margin: ((totalCTC * 1.5 - calculations.totalOperationalCosts) / (totalCTC * 1.5)) * 100 },
    { multiplier: 2, margin: ((totalCTC * 2 - calculations.totalOperationalCosts) / (totalCTC * 2)) * 100 },
    { multiplier: 2.5, margin: ((totalCTC * 2.5 - calculations.totalOperationalCosts) / (totalCTC * 2.5)) * 100 },
    { multiplier: 3, margin: ((totalCTC * 3 - calculations.totalOperationalCosts) / (totalCTC * 3)) * 100 }
  ];

  const resetAll = () => {
    setTotalCTC(0);
    setTeamSize(32);
    setRevenueMultiplier('2');
    setCustomMultiplier(2);
    setEmployerOverhead(150000);
    setFoundersDrawCurrency(200000);
    setSalesMarketingSpend(200000);
    setToolsSaasHosting(75000);
    setMiscOps(50000);
    setBenchPercent(0);
    setCapexAdditions(0);
    setCustomRevenue(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Revenue vs Payroll Calculator</h1>
          </div>
          <p className="text-gray-600">Calculate revenue targets, margins, and per-employee billing benchmarks</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Input Parameters
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Monthly CTC *</label>
                  <input
                    type="number"
                    value={totalCTC}
                    onChange={(e) => setTotalCTC(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter total monthly CTC"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size *</label>
                  <input
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Multiplier</label>
                  <select
                    value={revenueMultiplier}
                    onChange={(e) => setRevenueMultiplier(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {revenueMultiplier === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Multiplier</label>
                    <input
                      type="number"
                      step="0.1"
                      value={customMultiplier}
                      onChange={(e) => setCustomMultiplier(parseFloat(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employer Overhead</label>
                  <input
                    type="number"
                    value={employerOverhead}
                    onChange={(e) => setEmployerOverhead(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹1,50,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Founders/Directors Draw</label>
                  <input
                    type="number"
                    value={foundersDrawCurrency}
                    onChange={(e) => setFoundersDrawCurrency(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹2,00,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sales & Marketing Spend</label>
                  <input
                    type="number"
                    value={salesMarketingSpend}
                    onChange={(e) => setSalesMarketingSpend(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹2,00,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tools, SaaS, Hosting</label>
                  <input
                    type="number"
                    value={toolsSaasHosting}
                    onChange={(e) => setToolsSaasHosting(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹75,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Misc Ops (Legal, Travel, etc.)</label>
                  <input
                    type="number"
                    value={miscOps}
                    onChange={(e) => setMiscOps(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹50,000"
                  />
                </div>

                {/* Advanced Settings */}
                <div className="border-t pt-4">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {showAdvanced ? '▼ Hide Advanced Settings' : '▶ Show Advanced Settings'}
                  </button>
                  
                  {showAdvanced && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bench % (Non-billable)</label>
                        <input
                          type="number"
                          value={benchPercent}
                          onChange={(e) => setBenchPercent(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CapEx/Infra Additions</label>
                        <input
                          type="number"
                          value={capexAdditions}
                          onChange={(e) => setCapexAdditions(parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Revenue Override</label>
                        <input
                          type="number"
                          value={customRevenue}
                          onChange={(e) => setCustomRevenue(parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={resetAll}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-2">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue Target</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.revenueTarget || 0)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Op. Costs</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(calculations.totalOperationalCosts || 0)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-red-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Profit</p>
                    <p className={`text-2xl font-bold ${(calculations.netProfit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(calculations.netProfit || 0)}
                    </p>
                  </div>
                  <div className={`h-8 w-8 ${(calculations.netProfit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(calculations.netProfit || 0) >= 0 ? '📈' : '📉'}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Margin</p>
                    <p className={`text-2xl font-bold ${(calculations.netMargin || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(calculations.netMargin || 0).toFixed(1)}%
                    </p>
                  </div>
                  <Percent className="h-8 w-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cost of Delivery</p>
                    <p className="text-2xl font-bold text-orange-600">{(calculations.costOfDelivery || 0).toFixed(1)}%</p>
                  </div>
                  <div className="h-8 w-8 text-orange-600">🎯</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg CTC/Employee</p>
                    <p className="text-2xl font-bold text-indigo-600">{formatCurrency(calculations.avgCTCPerEmployee || 0)}</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Per Employee Benchmarks */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Per Employee Billing Benchmarks</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Current Avg CTC</p>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(calculations.avgCTCPerEmployee || 0)}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Ideal Billing (2x)</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(calculations.idealBilling2x || 0)}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">High Margin (3x)</p>
                  <p className="text-xl font-bold text-purple-600">{formatCurrency(calculations.highMarginBilling3x || 0)}</p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Donut Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Cost Allocation</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit by Multiplier</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="multiplier" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="profit" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Margin Trend by Multiplier</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={marginTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="multiplier" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                      <Line type="monotone" dataKey="margin" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                Export as Excel
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Download className="h-4 w-4" />
                Download as PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                📊 Compare with Industry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePayrollCalculator;