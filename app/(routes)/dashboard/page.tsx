import CreateForm from "./_components/CreateForm";
import Metric from "./_components/Metric";
import FormList from "./_components/FormList";
import { Suspense } from "react";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your forms.
          </p>
        </div>
        <CreateForm />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Metric
          title="Total Forms"
          value={0}
          description="All forms created on your account"
          isPercentage={false}
        />
        <Metric
          title="Total Responses"
          value={0}
          description="Responses submitted to your forms"
          isPercentage={false}
        />
        <Metric
          title="Conversion Rate"
          value={0}
          description="% of views that resulted in responses"
          isPercentage={true}
        />
        <Metric
          title="Engagement Rate"
          value={0}
          description="% of forms that received responses"
          isPercentage={true}
        />
      </div>

      {/* Forms Section */}
      <Suspense fallback={<div>loading......</div>}>
        <FormList />
      </Suspense>
    </div>
  );
};

export default Dashboard;
