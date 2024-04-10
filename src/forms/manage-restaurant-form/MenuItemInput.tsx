import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

function MenuItemInput({ index, removeMenuItem }: Props) {
  const { control } = useFormContext(); // this is required to link the form field to name and price to react hook form lib.

  return (
    // NAME.
    <div className="flex felx-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Name <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="momo"
                  className="bg-white"
                ></Input>
              </FormControl>
            </FormItem>
          );
        }}
      ></FormField>

      {/* PRICE */}
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Price (HKD) <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="0.00"
                  className="bg-white"
                ></Input>
              </FormControl>
            </FormItem>
          );
        }}
      ></FormField>
      <Button
        onClick={removeMenuItem}
        type="button"
        className="bg-red-500 max.h.fit"
      >
        Remove Item
      </Button>
    </div>
  );
}

export default MenuItemInput;
