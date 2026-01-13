import { getAllFormsByUser } from "@/actions/form.action";
import FormItem from "./FormItem";

const FormList = async () => {
  const result = await getAllFormsByUser();
  if (!result.success)
    return (
      <div className="text-xl font-bold text-destructive">
        Error while retriving forms!
      </div>
    );
  if (!result.data)
    return <h2 className="text-xl font-bold text-foreground mb-6">No forms</h2>;
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">All Forms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {result.data.map((form) => (
          <FormItem
            key={form.id}
            id={form.id}
            name={form.name}
            description={form.description}
            responses={form.responses}
            createdAt={form.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default FormList;
