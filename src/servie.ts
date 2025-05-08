const api_stats_url = "https://8finity.xyz/stats";
const api_deployments_url = "https://8finity.xyz/deployments";

async function getStats() {
  let response = await fetch(api_stats_url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(
      `get stats failed with ${response.status}`
    );
  }
  return await response.json();
}

async function getDeployments({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const url = `${api_deployments_url}?limit=${limit}&offset=${offset}`;
  let response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(
      `get deployments failed with ${response.status}`
    );
  }
  return await response.json();
}

const ServerConnect = {
  getStats,
  getDeployments,
};
export default ServerConnect;
