import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

function StepThree() {
  const { register, setValue } = useFormContext();
  
  const interests = [
    { name: 'Web Development', subcategories: ['Frontend', 'Backend', 'Full Stack'] },
    { name: 'Mobile Development', subcategories: ['iOS', 'Android'] },
    { name: 'Cloud Computing', subcategories: ['AWS', 'Azure', 'Google Cloud'] },
    { name: 'DevOps', subcategories: [] },
    { name: 'AI/ML', subcategories: ['Machine Learning', 'Deep Learning'] },
    { name: 'Blockchain', subcategories: [] },
    { name: 'Android Development', subcategories: [] },
    { name: 'UI/UX', subcategories: [] }
  ];

  const [selectedInterests, setSelectedInterests] = useState({});

  const handleCategoryChange = (category) => {
    const isSelected = !selectedInterests[category];
    const newSelectedInterests = { ...selectedInterests, [category]: isSelected };

    // Update subcategories based on category selection
    if (isSelected) {
      interests.find(interest => interest.name === category).subcategories.forEach(sub => {
        newSelectedInterests[sub] = true;
      });
    } else {
      interests.find(interest => interest.name === category).subcategories.forEach(sub => {
        newSelectedInterests[sub] = false;
      });
    }

    setSelectedInterests(newSelectedInterests);
    setValue('interests', Object.keys(newSelectedInterests).filter(key => newSelectedInterests[key]));
  };

  const handleSubcategoryChange = (subcategory) => {
    const isSelected = !selectedInterests[subcategory];
    const newSelectedInterests = { ...selectedInterests, [subcategory]: isSelected };

    // Check if all subcategories are selected to select the main category
    const category = interests.find(interest => interest.subcategories.includes(subcategory));
    if (category) {
      const allSelected = category.subcategories.every(sub => newSelectedInterests[sub]);
      newSelectedInterests[category.name] = allSelected;
    }

    setSelectedInterests(newSelectedInterests);
    setValue('interests', Object.keys(newSelectedInterests).filter(key => newSelectedInterests[key]));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Areas of Interest
        </label>
        <div className="grid grid-cols-2 gap-4">
          {interests.map((interest) => (
            <div key={interest.name}>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedInterests[interest.name] || false}
                  onChange={() => handleCategoryChange(interest.name)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{interest.name}</span>
              </label>
              {interest.subcategories.length > 0 && (
                <div className="ml-6">
                  {interest.subcategories.map((subcategory) => (
                    <label key={subcategory} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedInterests[subcategory] || false}
                        onChange={() => handleSubcategoryChange(subcategory)}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">{subcategory}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
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
          className="w-full px-4 py-2 border border-gray-300 rounded -lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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