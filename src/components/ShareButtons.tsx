import React from "react";
import { Button } from "./ui/button";
import { Twitter, Facebook, Linkedin, Link, Copy } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useLanguage } from "@/lib/language-context";

interface ShareButtonsProps {
  title?: string;
  url?: string;
  excerpt?: string;
}

const ShareButtons = ({
  title = "AI Contribution",
  url = window.location.href,
  excerpt = "Check out this interesting AI contribution on the AI-Fi Literary Platform!",
}: ShareButtonsProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedExcerpt = encodeURIComponent(excerpt);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedExcerpt}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast({
          title: t("share.copied"),
          description: t("share.copied.description"),
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: t("share.error"),
          description: t("share.error.description"),
          variant: "destructive",
        });
      },
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium mb-2">{t("share.title")}</p>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white hover:text-white"
          onClick={() => window.open(shareLinks.twitter, "_blank")}
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white hover:text-white"
          onClick={() => window.open(shareLinks.facebook, "_blank")}
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white hover:text-white"
          onClick={() => window.open(shareLinks.linkedin, "_blank")}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          <Copy className="h-4 w-4 mr-2" />
          {t("share.copy")}
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;
