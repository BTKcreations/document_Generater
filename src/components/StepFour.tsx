import React from 'react';
import { useFormContext } from 'react-hook-form';

function StepFour() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="budget"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Budget
        </label>
        <select
          id="budget"
          {...register('budget', { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select budget range</option>
          <option value="<5k">Less than $5,000</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="10k-25k">$10,000 - $25,000</option>
          <option value="25k+">$25,000+</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="timeline"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Expected Timeline
        </label>
        <select
          id="timeline"
          {...register('timeline', { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select timeline</option>
          <option value="1-3">1-3 months</option>
          <option value="3-6">3-6 months</option>
          <option value="6-12">6-12 months</option>
          <option value="12+">12+ months</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="additionalInfo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Additional Information
        </label>
        <textarea
          id="additionalInfo"
          {...register('additionalInfo')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Any additional details you'd like to share..."
        />
      </div>
    </div>
  );
}

export default StepFour;