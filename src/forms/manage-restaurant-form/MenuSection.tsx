import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

function MenuSection() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  // use field array can help us create dynamic input form. add or remove input area depending on requirement.
  // fields is the array of menu items , append add into field array, remove removes from the field array.

  return (
    <div className="space-y-2">
      <div className="">
        <h2 className="text-2xl font-bold">
          <FormDescription>
            Create menu , give Items name and price.
          </FormDescription>
        </h2>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => {
          return (
            <FormItem className="flex flex-col gap-2">
              {fields.map((_, index) => {
                return (
                  <MenuItemInput
                    key={index}
                    index={index}
                    removeMenuItem={() => remove(index)}
                  />
                );
              })}
            </FormItem>
          );
        }}
      ></FormField>
      {/* Just add empty string in the menu item and edit it */}
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  );
}

export default MenuSection;
