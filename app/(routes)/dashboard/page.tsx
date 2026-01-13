import CreateForm from "./_components/CreateForm";
import FormList from "./_components/FormList";
import { Suspense } from "react";
import FormStats from "./_components/FormStats";
import Header from "./_components/Header";
import FormStatsSkeleton from "./_components/_loadingComponents/FormStatsSkeleton";
import { Form } from "react-hook-form";
import FormListSkeleton from "./_components/_loadingComponents/FormListSkeleton";

const Dashboard = async () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header formId="" />
      <div className="w-full flex-1">
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your forms.
              </p>
            </div>
            <CreateForm />
          </div>

          {/* Metrics Grid */}
          <Suspense fallback={<FormStatsSkeleton />}>
            <FormStats />
          </Suspense>

          {/* Forms Section */}
          <Suspense fallback={<FormListSkeleton />}>
            <FormList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
