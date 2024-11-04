import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, ArrowLeft } from 'lucide-react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';


type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  interests: string[];
  experience: string;
  goals: string;
  budget: string;
  timeline: string;
  additionalInfo: string;
};

function App() {
  const [step, setStep] = useState(1);
  const [markdown, setMarkdown] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    const response = `
# Form Submission Summary

## Personal Information
- **Name:** ${data.firstName} ${data.lastName}
- **Email:** ${data.email}
- **Phone:** ${data.phone}

## Professional Details
- **Company:** ${data.company}
- **Role:** ${data.role}
- **Interests:** ${data.interests?.join(', ')}

## Project Information
- **Experience:** ${data.experience}
- **Goals:** ${data.goals}

## Project Requirements
- **Budget:** ${data.budget}
- **Timeline:** ${data.timeline}
- **Additional Information:** ${data.additionalInfo}
    `;

    setMarkdown(response);
    setSubmitted(true);
    setShowForm(false); // Hide the form on small screens when submitted
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const backToForm = () => setShowForm(true); // Show the form when "Back to Form" is clicked

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Form Block */}
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col ${
                showForm || !submitted ? 'block' : 'hidden' // Conditional display for small screens
              } lg:block`}
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className={`w-full h-1 mx-1 rounded ${
                        num <= step ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Step {step} of 4
                </h2>
                <p className="text-gray-600">
                  {step === 1 && 'Personal Information'}
                  {step === 2 && 'Professional Details'}
                  {step === 3 && 'Project Information'}
                  {step === 4 && 'Final Details'}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center ml-auto px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center ml-auto px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Submit
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </form>
          </FormProvider>

          {/* Right Block */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 lg:overflow-y-auto overflow-y-visible ${
              showForm ? 'hidden' : 'block' // Conditional display for small screens
            } lg:block`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Form Summary</h2>
              <button
                onClick={backToForm}
                className="block lg:hidden text-blue-500 hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1 inline" />
                Back to Form
              </button>
            </div>
            <div className="prose max-w-none">
              {markdown ? (
                <ReactMarkdown>{markdown}</ReactMarkdown>
              ) : (
                <p className="text-gray-500 italic">
                  Your form summary will appear here after submission...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
