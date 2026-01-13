import MetricSkeleton from "./MetricSkeleton";

const FormStatsSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricSkeleton
          title="Total Forms"
          description="All forms created on your account"
        />
        <MetricSkeleton
          title="Total Responses"
          description="Responses submitted to your forms"
        />
        <MetricSkeleton
          title="Conversion Rate"
          description="% of views that resulted in responses"
        />
        <MetricSkeleton
          title="Engagement Rate"
          description="% of forms that received responses"
        />
      </div>
    </div>
  );
};

export default FormStatsSkeleton;
