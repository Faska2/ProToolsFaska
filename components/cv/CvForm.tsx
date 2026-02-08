'use client';

import { CvData, Experience, Education, Skill } from './CvTypes';
import { useTranslations } from 'next-intl';
import { Plus, Trash2 } from 'lucide-react';

interface CvFormProps {
  data: CvData;
  onChange: (data: CvData) => void;
}

export default function CvForm({ data, onChange }: CvFormProps) {
  const t = useTranslations();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, experience: [...data.experience, newExperience] });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, education: [...data.education, newEducation] });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'Intermediate',
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    });
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange({
      ...data,
      skills: data.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-white">{t('CV.personalInfo')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">{t('CV.fullName')}</label>
            <input
              type="text"
              name="fullName"
              value={data.personalInfo.fullName}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">{t('CV.email')}</label>
            <input
              type="email"
              name="email"
              value={data.personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">{t('CV.phone')}</label>
            <input
              type="tel"
              name="phone"
              value={data.personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">{t('CV.address')}</label>
            <input
              type="text"
              name="address"
              value={data.personalInfo.address}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">{t('CV.summary')}</label>
            <textarea
              name="summary"
              rows={4}
              value={data.personalInfo.summary}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
            />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">{t('CV.experience')}</h3>
          <button
            onClick={addExperience}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('CV.addExperience')}
          </button>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="bg-white/5 p-4 rounded-md border border-white/10 relative">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title={t('Common.remove')}
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">{t('CV.jobTitle')}</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">{t('CV.company')}</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">{t('CV.startDate')}</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">{t('CV.endDate')}</label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white disabled:opacity-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      id={`current-${exp.id}`}
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-white/10 bg-white/5 rounded"
                    />
                    <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-gray-300">
                      {t('CV.current')}
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300">{t('CV.description')}</label>
                  <textarea
                    rows={3}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">{t('CV.education')}</h3>
          <button
            onClick={addEducation}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('CV.addEducation')}
          </button>
        </div>
        <div className="space-y-6">
          {data.education.map((edu) => (
            <div key={edu.id} className="bg-white/5 p-4 rounded-md border border-white/10 relative">
              <button
                onClick={() => removeEducation(edu.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title={t('Common.remove')}
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">{t('CV.degree')}</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">{t('CV.school')}</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">{t('CV.startDate')}</label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">{t('CV.endDate')}</label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">{t('CV.skills')}</h3>
          <button
            onClick={addSkill}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('CV.addSkill')}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.skills.map((skill) => (
            <div key={skill.id} className="bg-white/5 p-4 rounded-md border border-white/10 relative flex items-center gap-2">
              <button
                onClick={() => removeSkill(skill.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title={t('Common.remove')}
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="flex-grow">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  placeholder={t('CV.skillName')}
                  className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border mb-2 text-white placeholder-gray-400"
                />
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
                >
                  <option value="Beginner" className="text-gray-900">{t('CV.levels.beginner')}</option>
                  <option value="Intermediate" className="text-gray-900">{t('CV.levels.intermediate')}</option>
                  <option value="Advanced" className="text-gray-900">{t('CV.levels.advanced')}</option>
                  <option value="Expert" className="text-gray-900">{t('CV.levels.expert')}</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
