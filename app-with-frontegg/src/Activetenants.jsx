import { useAuth } from "@frontegg/react";
import { useEffect, useState } from "react";

function ActiveTenants() {
  const { user } = useAuth();
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState(null);

  const fetchTenantDetails = async (tenantId) => {
    const accessToken = user?.accessToken;
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await fetch(`https://api.frontegg.com/tenants/resources/tenants/v1/${tenantId}`, options);
      if (response.ok) {
        const tenantData = await response.json();
        return tenantData.name; 
      } else {
        console.error("Failed to fetch tenant details");
        return null;
      }
    } catch (error) {
      console.error("Error fetching tenant details:", error);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      const userId = user?.id;
      const accessToken = user?.accessToken;

      if (!userId || !accessToken) {
        console.error("Missing necessary information for API call");
        return;
      }

      const fetchActiveTenants = async () => {
        try {
          const response = await fetch(`https://api.frontegg.com/identity/resources/applications/user-tenants/active/v1`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
              'frontegg-user-id': userId
            }
          });
          
          if (response.ok) {
            const responseData = await response.json();
            
            const tenantPromises = responseData.applicationActiveTenants.map(async (tenant) => {
              const tenantName = await fetchTenantDetails(tenant.tenantId);
              return {
                ...tenant,
                tenantName
              };
            });
            
            const tenantsWithNames = await Promise.all(tenantPromises);
            setTenants(tenantsWithNames);
          } else {
            console.error("Failed to fetch tenants");
            setError("Failed to fetch active tenants.");
          }
        } catch (error) {
          console.error("Error fetching tenants:", error);
          setError("An error occurred while fetching tenants.");
        }
      };

      fetchActiveTenants();
    }
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {tenants.length > 0 ? (
        <div>
          {tenants.map((tenant) => (
            <button key={tenant.tenantId}>
              {tenant.tenantName || "Unknown Tenant"}
            </button>
          ))}
        </div>
      ) : (
        <p>No active tenants found</p>
      )}
    </div>
  );
}

export default ActiveTenants;
