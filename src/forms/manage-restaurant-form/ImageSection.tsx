import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function ImageSection() {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an Image that will de desplayed in your restuarant listing in
          search result. Adding a new image will overwrite an existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full"
              alt=""
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
}
