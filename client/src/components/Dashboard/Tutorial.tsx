import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";

const Tutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Contenu des étapes du didacticiel
  const steps = [
    "Étape 1 : Connectez-vous à votre compte pour accéder à vos sauvegardes.",
    "Étape 2 : Naviguez vers la section 'Backups' pour voir toutes les sauvegardes disponibles.",
    "Étape 3 : Utilisez les options de restauration pour récupérer une sauvegarde précédente.",
    "Étape 4 : Consultez les statistiques pour surveiller l’état de vos bases de données.",
  ];

  // Fonction pour changer l'étape
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col items-center justify-center border border-stone-200 bg-transparent p-6 rounded-lg shadow-md text-center max-w-xl mx-auto">
      <div className="flex items-center justify-center mb-6 w-full relative space-x-4">
        {steps.map((_, index) => (
          <div key={index}>
            {/* Cercle numéroté */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                  index === currentStep ? "bg-violet-400" : "bg-violet-200"
                }`}
              >
                {index + 1}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="absolute top-1/2 w-20 h-1 bg-violet-200"></div>
            )}
          </div>
        ))}
      </div>

      {/* Contenu de l'étape */}
      <p className="font-medium mb-4">{steps[currentStep]}</p>

      {/* Navigation avec les flèches */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={prevStep}
          className={`p-2 rounded-full bg-violet-300 hover:bg-violet-400 ${
            currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentStep === 0}
        >
          <ChevronLeftIcon className="w-6 h-6 text-violet-700" />
        </button>

        <button
          onClick={nextStep}
          className={`p-2 rounded-full bg-violet-300 hover:bg-violet-400 ${
            currentStep === steps.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={currentStep === steps.length - 1}
        >
          <ChevronRightIcon className="w-6 h-6 text-violet-700" />
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
