
import "./style.css"
import Profile from "@/components/Profile";


export default function DashboardPage() {
  return (
    <div className="page dashboard">
        <div className="page-title flex">            
            <h1>Dashboard Page</h1>
        </div>
        <div className="flex">
          <section className="grid">
            <div className="profile">
              <Profile />
              <h2>Orders</h2>
              <div className="show-orders flex">
                <button>Current Orders</button>
                <button>Recent Orders</button>
              </div>
              <div className="settings flex">
                <button><i className="fa fa-cog" aria-hidden="true"></i>Account Settings</button>
              </div>
            </div>
            <div className="orders">
              <h2>Recent Orders</h2>
              <p>You have no recent orders.</p>
            </div>
          </section>
        </div>
      {/* Add your dashboard components and logic here */}
    </div>
  );
}