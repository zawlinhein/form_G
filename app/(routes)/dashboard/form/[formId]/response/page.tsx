import { getResponsesByFormId } from "@/actions/form.action";
import { FormResponse } from "@/database/schema";
import { Card } from "@/components/ui/card";

type ResponseFieldObj = {
  label: string;
  value: string;
};

const FormResponses = async ({
  params,
}: {
  params: Promise<{ formId: string }>;
}) => {
  const { formId } = await params;
  const result = await getResponsesByFormId(formId);
  if (result.success === false) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Form Responses
            </h1>
            <p className="text-muted-foreground">
              View all responses submitted to your form
            </p>
          </div>
        </div>
        <Card className="p-6 border-destructive/50 bg-destructive/5">
          <p className="text-destructive">
            Error fetching responses: {result.message}
          </p>
        </Card>
      </div>
    );
  }
  const responses: FormResponse[] = result.data || [];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Form Responses
          </h1>
          <p className="text-muted-foreground">
            {responses.length}{" "}
            {responses.length === 1 ? "response" : "responses"} submitted
          </p>
        </div>
      </div>

      {/* Responses Section */}
      {responses.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground text-lg">
            No responses yet. Share your form to start collecting responses.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {responses.map((response, index) => {
            const resArray: ResponseFieldObj[] = JSON.parse(
              response.responseData
            );
            return (
              <Card
                key={response.id}
                className="p-6 border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    Response #{index + 1}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(response.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-3">
                  {resArray.map((field, fieldIndex) => (
                    <div
                      key={fieldIndex}
                      className="flex items-start justify-between gap-4 pb-3 last:pb-0 border-b last:border-b-0 border-border/50"
                    >
                      <span className="font-medium text-foreground min-w-fit">
                        {field.label}
                      </span>
                      <span className="text-muted-foreground text-right break-words">
                        {field.value || <span className="italic">Empty</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormResponses;
