"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

const formSchema = z.object({
  service_name: z.string().min(2, "Name must be at least 2 characters"),
  service_type: z.string().min(1, "Service type is required"),
  market: z.enum(["B2C", "B2B"], { required_error: "Market is required" }),
  delivery_price: z.number().min(0, "Delivery price must be a positive number"),
  service_price: z.number().min(0, "Service price must be a positive number"),
  // Optional fuel fields
  pms_amount: z.number().optional(),
  diesel_amount: z.number().optional(),
  // Optional tyre fields
  change_amount: z.number().optional(),
  repair_amount: z.number().optional(),
  // Optional battery fields
  boost_amount: z.number().optional(),
  swap_amount: z.number().optional(),
  // Optional towing fields
  hook_chain_amount: z.number().optional(),
  flat_amount: z.number().optional(),
  password: z.string().min(4, "Password must be provided"),
});

type FormValues = z.infer<typeof formSchema>;

const SERVICE_TYPES = [
  { value: "HEALTH_CHECK", label: "Health Check" },
  { value: "OUT_OF_FUEL", label: "Out of Fuel" },
  { value: "FUEL_DELIVERY", label: "Fuel Delivery" },
  { value: "FLAT_TYRE", label: "Flat Tyre" },
  { value: "TOWING", label: "Towing" },
  { value: "JUMP_START", label: "Jump Start" },
  { value: "BATTERY", label: "Battery" },
];

export function CreateServiceForm({
  onSubmit,
}: {
  onSubmit: (data: any) => Promise<void>;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_name: "",
      service_type: "",
      market: "B2C",
      delivery_price: 0,
      service_price: 0,
      password: "",
    },
  });

  const watchServiceType = form.watch("service_type");

  const showFuelFields =
    watchServiceType === "OUT_OF_FUEL" || watchServiceType === "FUEL_DELIVERY";
  const showTyreFields = watchServiceType === "FLAT_TYRE";
  const showBatteryFields =
    watchServiceType === "JUMP_START" || watchServiceType === "BATTERY";
  const showTowingFields = watchServiceType === "TOWING";

  const handleSubmit = (data: FormValues) => {
    // Remove undefined/0 optional fields
    const cleanedData: any = {
      service_name: data.service_name,
      service_type: data.service_type,
      market: data.market,
      delivery_price: data.delivery_price,
      service_price: data.service_price,
      password: data.password,
    };

    // Add optional fields only if they have values
    if (data.pms_amount) cleanedData.pms_amount = data.pms_amount;
    if (data.diesel_amount) cleanedData.diesel_amount = data.diesel_amount;
    if (data.change_amount) cleanedData.change_amount = data.change_amount;
    if (data.repair_amount) cleanedData.repair_amount = data.repair_amount;
    if (data.boost_amount) cleanedData.boost_amount = data.boost_amount;
    if (data.swap_amount) cleanedData.swap_amount = data.swap_amount;
    if (data.hook_chain_amount)
      cleanedData.hook_chain_amount = data.hook_chain_amount;
    if (data.flat_amount) cleanedData.flat_amount = data.flat_amount;

    onSubmit(cleanedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="service_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Health Check" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SERVICE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="market"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Market *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="B2C" id="b2c" />
                      <Label htmlFor="b2c" className="cursor-pointer">
                        B2C
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="B2B" id="b2b" />
                      <Label htmlFor="b2b" className="cursor-pointer">
                        B2B
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="delivery_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Price (₦) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Price (₦) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Conditional Fields - Fuel Services */}
        {showFuelFields && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-4 text-gray-700">Fuel Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pms_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PMS Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(e.target.value) || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diesel_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diesel Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(e.target.value) || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Conditional Fields - Tyre Services */}
        {showTyreFields && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-4 text-gray-700">
              Tyre Service Pricing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="change_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(e.target.value) || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repair_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repair Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(e.target.value) || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Conditional Fields - Battery Services */}
        {showBatteryFields && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-4 text-gray-700">
              Battery Service Pricing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="boost_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Boost Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(e.target.value) || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="swap_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Swap Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(e.target.value) || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Conditional Fields - Towing Services */}
        {showTowingFields && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-4 text-gray-700">
              Towing Service Pricing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hook_chain_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hook Chain Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(e.target.value) || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="flat_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flat Amount (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            parseFloat(e.target.value) || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Admin Password */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Password *</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Enter admin password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="submit" className="bg-orange hover:bg-orange/90">
            Create Service
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
