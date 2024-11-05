import React from 'react';
import { useFormContext } from 'react-hook-form';

function StepThree() {
  const { register } = useFormContext();
  const interests = [
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'DevOps',
    'AI/ML',
    'Blockchain',
    'Android Development',
    'UI/UX'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Areas of Interest
        </label>
        <div className="grid grid-cols-2 gap-4">
          {interests.map((interest) => (
            <label
              key={interest}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={interest}
                {...register('interests')}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Years of Experience
        </label>
        <select
          id="experience"
          {...register('experience', { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select experience</option>
          <option value="0-2">0-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="goals"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Goals
        </label>
        <textarea
          id="goals"
          {...register('goals', { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Describe your project goals..."
        />
      </div>
    </div>
  );
}

export default StepThree;