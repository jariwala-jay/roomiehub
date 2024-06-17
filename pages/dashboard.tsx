import ProtectedRoute from '../src/components/ProtectedRoute'

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to the protected dashboard!</p>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
