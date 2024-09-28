import { useAuth, ContextHolder } from "@frontegg/react";

function TenantSwitcher() {
  const { user } = useAuth();
  const tenants = user?.tenants || [];  
  const switchTenant = (tenantId) => {
    const context = ContextHolder.getContext();
    const baseUrl = context.baseUrl;
    console.log(user);

   
    window.location.href = `${baseUrl}/oauth/switch-tenant?tenantId=${tenantId}&post_switch_redirect_uri=${window.location.href}`;
  };

  return (
    <div>
      {tenants.length > 0 ? (
        <select onChange={(e) => switchTenant(e.target.value)} defaultValue="">
          <option value="" disabled>Select a tenant</option>
          {tenants.map((tenant) => (
            <option key={tenant.tenantId} value={tenant.tenantId}>
              {tenant.tenantName}
            </option>
          ))}
        </select>
      ) : (
        <p>No tenants available</p>
      )}
    </div>
  );
}

export default TenantSwitcher;