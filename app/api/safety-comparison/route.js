export async function GET(request) {
  const mockData = {
    success: true,
    data: {
      safety_ratio: {
        overall: 8.8,
        by_weather: {
          clear: 7.2,
          cloudy: 9.1,
          rain: 12.4,
          snow: 15.0,
          fog: 10.3
        },
        by_time_of_day: {
          morning_rush: 6.8,
          midday: 9.2,
          evening_rush: 7.5,
          night: 11.1
        },
        by_location_type: {
          highway: 9.8,
          city_streets: 7.4,
          intersections: 6.9,
          parking_areas: 12.1
        }
      },
      incident_rates: {
        av: {
          incidents_per_million_miles: 5.0,
          total_incidents: 12,
          total_miles: 2400000,
          severity_breakdown: {
            minor: 10,
            moderate: 2,
            major: 0,
            fatal: 0
          }
        },
        human: {
          incidents_per_million_miles: 44.1,
          total_incidents: 1456,
          total_miles: 33000000,
          severity_breakdown: {
            minor: 892,
            moderate: 421,
            major: 115,
            fatal: 28
          }
        }
      },
      business_impact: {
        roi_analysis: {
          deployment_cost_per_vehicle: 150000,
          savings_per_vehicle_per_year: 85000,
          payback_period_months: 21,
          five_year_roi: 285
        },
        risk_reduction: {
          liability_exposure_reduction: 89,
          insurance_premium_reduction: 53,
          fleet_safety_score_improvement: 88
        }
      }
    },
    metadata: {
      generated_at: new Date().toISOString(),
      source: 'austin_av_intelligence_platform',
      timeframe: '30d'
    }
  };

  return Response.json(mockData);
}
