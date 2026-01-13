import React from "react";
import { fetchFormStateByUser } from "@/actions/form.action";
import Metric from "./Metric";

const FormStats = async () => {
  const result = await fetchFormStateByUser();
  return (
    <>
      {!result.success && (
        <div className="text-destructive font-semibold text-sm">error</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Metric
          title="Total Forms"
          value={(result.success && result.data?.totalForms) || 0}
          description="All forms created on your account"
          isPercentage={false}
        />
        <Metric
          title="Total Responses"
          value={(result.success && result.data?.totalResponses) || 0}
          description="Responses submitted to your forms"
          isPercentage={false}
        />
        <Metric
          title="Conversion Rate"
          value={(result.success && result.data?.conversionRate) || 0}
          description="% of views that resulted in responses"
          isPercentage={true}
        />
        <Metric
          title="Engagement Rate"
          value={(result.success && result.data?.engagementRate) || 0}
          description="% of forms that received responses"
          isPercentage={true}
        />
      </div>
    </>
  );
};

export default FormStats;
