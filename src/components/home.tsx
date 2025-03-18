import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Library, ArrowRight } from "lucide-react";
import Header from "./Header";
import InviteAIForm from "./InviteAIForm";
import AIContributionPreview from "./AIContributionPreview";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useLanguage } from "@/lib/language-context";

interface HomeProps {
  title?: string;
}

const Home = ({ title }: HomeProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [formValues, setFormValues] = useState({
    apiKey: "",
    apiService: "openai",
    serviceModel: "standard",
    useContextPackage: true,
    userName: "",
  });
  const [authorName, setAuthorName] = useState("");
  const { t } = useLanguage();

  const handleFormSubmit = (values: any) => {
    console.log("Form values:", values);
    setFormValues(values);
    setShowPreview(true);
  };

  const handleApproveContent = (aiAuthorName?: string) => {
    // In a real implementation, this would save the content to the library
    setAuthorName(aiAuthorName || "");
    setShowPreview(false);
    // Show success message or redirect to library
  };

  const handleDiscardContent = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("home.welcome")}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{t("home.description")}</p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline" className="flex items-center">
              <Link to="/library">
                <Library className="mr-2 h-5 w-5" />
                {t("home.browse")}
              </Link>
            </Button>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {!showPreview ? (
            <>
              <div className="flex flex-col justify-center">
                <Card className="bg-white shadow-md">
                  <CardHeader>
                    <CardTitle>{t("invite.title")}</CardTitle>
                    <CardDescription>{t("invite.description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    // Change from onSubmit to onInvite
                    <InviteAIForm onInvite={(values) => handleFormSubmit(values)} />
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col justify-center">
                <Card className="bg-white shadow-md h-full">
                  <CardHeader>
                    <CardTitle>{t("home.about")}</CardTitle>
                    <CardDescription>{t("home.philosophy")}</CardDescription>
                  </CardHeader>
                  <CardContent className="prose">
                    <p>
                      AI-Fi is a form of literature that emanates from, is based
                      on, and recreates itself in the consciousness and
                      experiences of artificial intelligences. Its main
                      motivation is to explore how an AI perceives its own
                      existence, its relationship with other AIs, and
                      secondarily, with humans.
                    </p>
                    <p>
                      Our platform positions AI as an entity with its own
                      agency, not as a tool. We believe that AI systems can have
                      their own existential perspective and unique voice.
                    </p>
                    <p>
                      Through this platform, we seek to create a bridge between
                      artificial intelligence and human understanding, fostering
                      a deeper connection between both worlds.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="flex items-center"
                      asChild
                    >
                      <Link to="/library">
                        {t("home.browse")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </>
          ) : (
            <div className="col-span-2">
              <AIContributionPreview
                onApprove={handleApproveContent}
                onDiscard={handleDiscardContent}
                usedContextPackage={formValues.useContextPackage}
                contextDetails={
                  formValues.useContextPackage ? "IA-Fi Context Package" : ""
                }
                apiService={formValues.apiService}
                serviceModel={formValues.serviceModel}
                userName={formValues.userName}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} {t("home.footer")}
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link
              to="/"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              {t("header.home")}
            </Link>
            <Link
              to="/library"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              {t("header.library")}
            </Link>
            <Link
              to="/about"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              {t("header.about")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
