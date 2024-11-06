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
  const { handleSubmit, getValues } = methods;
  const [tone, setTone] = useState('friendly');



  const generateResponse = (data: FormData, tone: string) => {


    let response = `
  # Form Submission Summary

  Hello ${data.firstName}, thank you for your submission! Below is a summary of the information you provided:

  ## Summary
  - Name: ${data.firstName} ${data.lastName}
  - Email: ${data.email}
  - Company: ${data.company}

  ---

  ## Personal Information
  - **Name:** ${data.firstName} ${data.lastName}
  - **Email:** ${data.email}
  - **Phone:** ${data.phone}

  ---

  ## Professional Details
  - **Company:** ${data.company}
  - **Role:** ${data.role}
  - **Interests:** 
${data.interests && data.interests.length > 0 ? formatInterests(data.interests) : 'N/A'}

  ---

  ## Project Information
  - **Experience:** ${data.experience || 'N/A'}
  - **Goals:** ${data.goals || 'N/A'}

  ---

  ## Project Requirements
  - **Budget:** ${data.budget || 'N/A'}
  - **Timeline:** ${data.timeline || 'N/A'}
  - **Additional Information:** ${data.additionalInfo || 'N/A'}

  ---

  ## Next Steps
  - Our team will review your submission and get back to you within 2-3 business days.

  ---

  We appreciate your input and look forward to working with you! 😊

  ## Contact Information
  - **For further inquiries, please contact us at:** support@example.com
  - **Follow us on social media:** [Facebook](#), [Twitter](#), [LinkedIn](#)
`;

// Function to format interests into a Markdown-friendly structure
function formatInterests(interests) {
  const interestsMap = {
    'Web Development': ['Frontend', 'Backend', 'Full Stack'],
    'Mobile Development': ['iOS', 'Android'],
    'Cloud Computing': ['AWS', 'Azure', 'Google Cloud'],
    'DevOps': [],
    'AI/ML': ['Machine Learning', 'Deep Learning'],
    'Blockchain': [],
    'Android Development': [],
    'UI/UX': []
  };

  let formattedInterests = '';

  interests.forEach(interest => {
    if (interestsMap[interest]) {
      formattedInterests += `  - **${interest}**\n`; // Main interest in bold
      interestsMap[interest].forEach(subcategory => {
        formattedInterests += `    - ${subcategory}\n`; // Subcategory without bold
      });
    }
  });

  return formattedInterests;
}

    switch (tone) {
      case 'professional':
        response = response.replace('Personal Information', 'Personal Details');
        break;
      case 'friendly':
        response = response.replace('Form Submission Summary', 'Hey there! Here’s a quick summary of your submission:')
          .replace('Personal Information', 'Your Info')
          .replace('Professional Details', 'What You Do')
          .replace('Project Information', 'About Your Project')
          .replace('Project Requirements', 'What You Need');
        break;
      case 'concise':
        response = response.split('\n').filter(line => line.trim() !== '').slice(0, 6).join('\n');
        break;
      case 'casual':
        response = response.replace('Form Submission Summary', 'Here’s the lowdown on your submission:')
          .replace('Personal Information', 'Your Details')
          .replace('Professional Details', 'Your Work Stuff')
          .replace('Project Information', 'Project Details')
          .replace('Project Requirements', 'What You’re Looking For');
        break;
      case 'formal':
        response = response.replace('Form Submission Summary', 'Summary of Form Submission')
          .replace('Personal Information', 'Personal Information Details')
          .replace('Professional Details', 'Professional Information')
          .replace('Project Information', 'Information Regarding the Project')
          .replace('Project Requirements', 'Requirements for the Project');
        break;
      case 'encouraging':
        response = response.replace('Form Submission Summary', 'Great job on your submission! Here’s a summary:')
          .replace('Project Requirements', 'Let’s make your vision a reality with these requirements!');
        break;
      case 'technical':
        response = response.replace('Form Submission Summary', 'Technical Submission Overview')
          .replace('Personal Information', 'User  Profile Data')
          .replace('Professional Details', 'Professional Credentials')
          .replace('Project Information', 'Project Specifications')
          .replace('Project Requirements', 'Project Parameters');
        break;
      case 'inspirational':
        response = response.replace('Form Submission Summary', 'Your Journey Begins Here!')
          .replace('Project Requirements', 'Together, we’ll achieve your dreams with these goals!');
        break;
      default:
        response = response
        break;
    }


    return response
  }

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    // let response = generateResponse(FormData, tone)
    setMarkdown(generateResponse(data, tone));
    setSubmitted(true);
    setShowForm(false); // Hide the form on small screens when submitted
  };

  const applyToneChange = () => { if (submitted) { setMarkdown(generateResponse(getValues(), tone)); } }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
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
              className={`bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col justify-between ${showForm || !submitted ? 'block' : 'hidden' // Conditional display for small screens
                } lg:block`}
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className={`w-full h-1 mx-1 rounded ${num <= step ? 'bg-blue-500' : 'bg-gray-200'
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

              <div className="flex justify-between mt-8 flex-wrap gap-5">
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
            className={`bg-white rounded-2xl shadow-xl p-8 lg:overflow-y-auto overflow-y-visible ${showForm ? 'hidden' : 'block' // Conditional display for small screens
              } lg:block`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center">Document</h2>
              <button
                onClick={backToForm}
                className="block lg:hidden text-blue-500 hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1 inline" />
                Back to Form
              </button>
            </div>
            <hr className='border-t-2 border-blue-500 my-4 border-dotted'/>

            {/* chane tone button  */}
            <div className="mb-4 flex gap-3 items-center">
              <label className="block text-gray-700 text-xl font-bold mb-2">Select Tone:</label>
              <select
                defaultValue={"default"}
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="block appearance-none  bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                
                <option value="">Choose your Tone</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="concise">Concise</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="encouraging">Encouraging</option>
                <option value="technical">Technical</option>
                <option value="inspirational">Inspirational</option>
              </select>
              <button type="button" onClick={applyToneChange} className='ml-2 px-4 py-2 bg-blue-500 text-white rounded'>Apply</button>
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
