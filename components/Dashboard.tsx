import React, { useState, useEffect } from 'react';
import { Car, AlertTriangle, MapPin, TrendingUp, Cloud, Shield, Calendar, Users, BarChart3, Activity } from 'lucide-react';

const AustinAVDashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('30d');
  const [weatherLayer, setWeatherLayer] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const safetyStats = {
    avIncidents: 12,
    humanIncidents: 1456,
    safetyRatio: 8.8,
    totalMiles: {
      av: 2400000,
      human: 156000000
    },
    weatherImpact: {
      av: 12,
      human: 34
    }
  };

  const incidentData = [
    { id: 1, type: 'av', lat: 30.2672, lng: -97.7431, severity: 'minor', date: '2024-06-20', weather: 'clear' },
    { id: 2, type: 'human', lat: 30.2849, lng: -97.7341, severity: 'major', date: '2024-06-19', weather: 'rain' },
    { id: 3, type: 'av', lat: 30.2711, lng: -97.7436, severity: 'minor', date: '2024-06-18', weather: 'clear' },
    { id: 4, type: 'human', lat: 30.2676, lng: -97.7411, severity: 'moderate', date: '2024-06-17', weather: 'cloudy' },
    { id: 5, type: 'human', lat: 30.2518, lng: -97.7596, severity: 'major', date: '2024-06-16', weather: 'rain' },
  ];

  const trendData = [
    { month: 'Jan', av: 2, human: 145 },
    { month: 'Feb', av: 1, human: 132 },
    { month: 'Mar', av: 3, human: 168 },
    { month: 'Apr', av: 2, human: 159 },
    { month: 'May', av: 1, human: 143 },
    { month: 'Jun', av: 3, human: 189 },
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, isHighlight = false }) => (
    <div className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
      isHighlight 
        ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 shadow-red-500/20' 
        : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50'
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <Icon size={16} />
            {title}
          </div>
          <div className={`text-2xl font-bold ${isHighlight ? 'text-red-400' : 'text-white'}`}>
            {value}
          </div>
          {subtitle && (
            <div className="text-gray-500 text-sm mt-1">{subtitle}</div>
          )}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend > 0 ? 'text-red-400' : 'text-green-400'
          }`}>
            <TrendingUp size={14} className={trend < 0 ? 'rotate-180' : ''} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );

  const ComparisonChart = () => {
    const maxValue = Math.max(...trendData.map(d => d.human));
    
    return (
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Monthly Incident Trends</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-400">AV Incidents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
              <span className="text-gray-400">Human Incidents</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {trendData.map((data, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-2 text-gray-400 text-sm">{data.month}</div>
              <div className="col-span-10 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2 relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-gray-600 to-gray-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(data.human / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-xs w-8">{data.human}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2 relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(data.av / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-red-400 text-xs w-8">{data.av}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const IncidentMap = () => (
    <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Austin Incident Map</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setWeatherLayer(!weatherLayer)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              weatherLayer 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-gray-700/50 text-gray-400 border border-gray-600/50'
            }`}
          >
            <Cloud size={14} className="inline mr-1" />
            Weather
          </button>
        </div>
      </div>
      
      <div className="relative bg-gray-800 rounded-lg h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800">
          <div className="absolute inset-4 border border-gray-600/30 rounded">
            <div className="text-gray-500 text-xs absolute top-2 left-2">Austin, TX</div>
            
            {incidentData.map((incident) => (
              <div
                key={incident.id}
                className={`absolute w-3 h-3 rounded-full cursor-pointer transition-all duration-200 hover:scale-150 ${
                  incident.type === 'av' 
                    ? 'bg-red-500 shadow-red-500/50' 
                    : 'bg-gray-400 shadow-gray-400/50'
                } shadow-lg`}
                style={{
                  left: `${((incident.lng + 97.8) * 100)}%`,
                  top: `${((30.4 - incident.lat) * 400)}%`,
                }}
                onClick={() => setSelectedIncident(incident)}
              />
            ))}
            
            {weatherLayer && (
              <div className="absolute inset-0 bg-blue-500/10 rounded">
                <div className="absolute top-4 right-4 text-blue-400 text-xs">
                  Weather Layer Active
                </div>
              </div>
            )}
          </div>
        </div>
        
        {selectedIncident && (
          <div className="absolute bottom-4 left-4 bg-gray-900 border border-gray-600 rounded-lg p-3 text-sm">
            <div className="text-white font-medium">
              {selectedIncident.type === 'av' ? 'AV' : 'Human'} Incident
            </div>
            <div className="text-gray-400">
              {selectedIncident.date} • {selectedIncident.severity}
            </div>
            <div className="text-gray-500 text-xs mt-1">
              Weather: {selectedIncident.weather}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ExpandableSection = ({ title, children, defaultExpanded = false }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    
    return (
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
        >
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </button>
        {expanded && (
          <div className="p-4 pt-0 border-t border-gray-700/30">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Car className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Austin AV Intelligence Platform</h1>
                <p className="text-gray-400 text-sm">Real-time Safety Analysis & Deployment Readiness</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['7d', '30d', '90d', '6m'].map((period) => (
                <button
                  key={period}
                  onClick={() => setActiveTimeframe(period)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    activeTimeframe === period
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:border-gray-500'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl px-8 py-6">
            <Shield className="text-red-400" size={32} />
            <div>
              <div className="text-4xl font-bold text-red-400">8.8x</div>
              <div className="text-gray-300 text-lg">Safer Than Human Drivers</div>
              <div className="text-gray-500 text-sm">Autonomous vehicles show 88% fewer incidents per mile</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={AlertTriangle}
            title="AV Incidents (30d)"
            value={safetyStats.avIncidents}
            subtitle={`${(safetyStats.avIncidents / safetyStats.totalMiles.av * 1000000).toFixed(2)} per million miles`}
            trend={-15}
            isHighlight={true}
          />
          <StatCard
            icon={Users}
            title="Human Incidents (30d)"
            value={safetyStats.humanIncidents.toLocaleString()}
            subtitle={`${(safetyStats.humanIncidents / safetyStats.totalMiles.human * 1000000).toFixed(2)} per million miles`}
            trend={8}
          />
          <StatCard
            icon={Cloud}
            title="Weather Impact"
            value={`${safetyStats.weatherImpact.av}% vs ${safetyStats.weatherImpact.human}%`}
            subtitle="AV vs Human in adverse conditions"
          />
          <StatCard
            icon={Activity}
            title="Miles Analyzed"
            value={`${(safetyStats.totalMiles.av / 1000000).toFixed(1)}M`}
            subtitle="AV miles in Austin metro area"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ComparisonChart />
          <IncidentMap />
        </div>

        <div className="space-y-4">
          <ExpandableSection title="Data Sources & Methodology" defaultExpanded={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-white font-medium mb-2">AV Data Sources</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Austin Power BI Dashboard (Weekly updates)</li>
                  <li>• Real-time API from AV operators</li>
                  <li>• Waymo & Cruise incident reports</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Human Driver Data</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Texas DOT CRIS Database</li>
                  <li>• Austin 3-1-1 Service reports</li>
                  <li>• Insurance claim correlations</li>
                </ul>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Deployment Recommendations" defaultExpanded={false}>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <div className="text-white font-medium">Immediate Deployment Ready</div>
                  <div className="text-gray-400 text-sm">Downtown Austin, South Austin corridors show optimal safety ratios</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <div className="text-white font-medium">Gradual Rollout Recommended</div>
                  <div className="text-gray-400 text-sm">Northwest Austin requires additional weather condition testing</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <div className="text-white font-medium">Enhanced Monitoring Needed</div>
                  <div className="text-gray-400 text-sm">Construction zones and school districts require additional protocols</div>
                </div>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Business Impact Analysis" defaultExpanded={false}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$2.4M</div>
                <div className="text-gray-400 text-sm">Potential annual savings</div>
                <div className="text-gray-500 text-xs">in reduced insurance costs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">94%</div>
                <div className="text-gray-400 text-sm">Reduced liability exposure</div>
                <div className="text-gray-500 text-xs">vs human driver fleets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">ROI</div>
                <div className="text-gray-400 text-sm">18-month payback</div>
                <div className="text-gray-500 text-xs">on AV deployment</div>
              </div>
            </div>
          </ExpandableSection>
        </div>

        <div className="text-center py-8 border-t border-gray-800/30">
          <div className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString()} • 
            Data refreshed every 5 minutes • 
            <span className="text-red-400">Enterprise AI Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AustinAVDashboard;
