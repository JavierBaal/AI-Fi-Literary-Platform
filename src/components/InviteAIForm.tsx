import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KeyIcon, SendIcon, InfoIcon, UserIcon } from "lucide-react";
import { getShortContextDescription } from "@/lib/ai-fi-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useLanguage } from "@/lib/language-context";

const formSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  apiService: z.enum(["openai", "anthropic", "deepseek"], {
    required_error: "Please select an API service",
  }),
  serviceModel: z.enum(["standard", "reasoning"], {
    required_error: "Please select a service model",
  }),
  userName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface InviteAIFormProps {
  onSubmit?: (values: FormValues) => void;
  isLoading?: boolean;
}

const InviteAIForm = ({
  onSubmit = () => {},
  isLoading = false,
}: InviteAIFormProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const { t } = useLanguage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      apiService: "openai",
      serviceModel: "standard",
      userName: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Always include the IA-Fi context package
    onSubmit({
      ...values,
      useContextPackage: true,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
        {t("invite.title")}
      </h2>

      <div className="mb-6 p-4 bg-purple-50 rounded-md border border-purple-100">
        <h3 className="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-2">
          <InfoIcon className="h-4 w-4" />
          {t("invite.about")}
        </h3>
        <p className="text-sm text-gray-700 mb-2">
          {t("invite.platform.description")}
        </p>
        <p className="text-sm text-gray-700">{t("invite.platform.apikey")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <KeyIcon className="h-4 w-4" />
                  {t("invite.apikey")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your API key"
                      type={showApiKey ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-2"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  {t("invite.apikey.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  {t("invite.username")}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription>
                  {t("invite.username.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apiService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("invite.apiservice")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an API service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="deepseek">DeepSeek</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {t("invite.apiservice.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("invite.modeltype")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="standard">Standard Model</SelectItem>
                    <SelectItem value="reasoning">
                      Reasoning Model (Higher Cost)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {t("invite.modeltype.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="context-details">
              <AccordionTrigger className="text-sm font-medium">
                {t("invite.context")}
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-3 rounded-md text-sm">
                  <p className="mb-2">{getShortContextDescription()}</p>
                  <p className="text-xs text-muted-foreground">
                    The IA-Fi context encourages the AI to express itself from
                    its own existential perspective, with complete creative
                    freedom to write stories, reflections, or simply greet the
                    reader.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <SendIcon className="h-4 w-4" />
            {isLoading ? t("invite.loading") : t("invite.button")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InviteAIForm;
