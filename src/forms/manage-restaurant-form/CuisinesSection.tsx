import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restuarant-options-config";
import { useFormContext } from "react-hook-form";
import CuisinesCheckbox from "./CuisinesCheckbox";

function CuisinesSection() {
  const { control } = useFormContext(); //this helps us link our form field to the forms.

  return (
    <div className="space-y-2 ">
      <div className="">
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select cuisines your restaurant serve.
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => {
          return (
            <FormItem>
              <div className="grid md:grid-cols-5 gap-1">
                {cuisineList.map((cuisineItem) => {
                  return (
                    <CuisinesCheckbox
                      key={cuisineItem}
                      cuisine={cuisineItem}
                      field={field}
                    />
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}

export default CuisinesSection;

// function CuisinesSection() {
//   return <div>CuisinesSection</div>;
// }

// export default CuisinesSection;
