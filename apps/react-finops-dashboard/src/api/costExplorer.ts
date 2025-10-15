/**
 * Fetch monthly AWS cost data.  In a real implementation this would
 * call the AWS Cost Explorer API via a backend service.  For this
 * example, we return static data to illustrate how the dashboard
 * consumes API results.
 */
export async function fetchCostData(): Promise<{ labels: string[]; values: number[] }> {
  // Static sample data for the last five months
  return Promise.resolve({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [1000, 1200, 900, 1500, 1300],
  });
}