import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  role?: string;
  website?: string;
  linkedin?: string;
  resume?: FileList;
  inquiryType: string;
}

interface ContactFormProps {
  activeTab?: string;
  defaultSubject?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ activeTab = 'general', defaultSubject = '' }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      inquiryType: activeTab,
      subject: defaultSubject,
    },
  });

  useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      inquiryType: activeTab,
      subject: defaultSubject || formValues.subject,
      message: activeTab === 'plan' ? `New plan selection inquiry for: ${defaultSubject}` : formValues.message,
    }));
  }, [activeTab, defaultSubject, reset]);

  const showCompany = ['project', 'collaboration', 'plan'].includes(activeTab);
  const showPhone = ['project', 'career', 'collaboration', 'plan'].includes(activeTab);
  const showBudgetAndTimeline = ['project'].includes(activeTab);
  const showRoleAndWebsite = ['career', 'collaboration'].includes(activeTab);
  const showSubjectAndMessage = ['project', 'career', 'collaboration', 'general'].includes(activeTab);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual backend endpoint
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const formData = new FormData();
      
      // Force inject missing fields that might not be mounted or contain partial data
      if (activeTab === 'plan') {
        data.subject = defaultSubject || 'Plan Inquiry';
        data.message = `New plan selection inquiry for: ${defaultSubject}`;
      } else {
        if (!data.subject && activeTab === 'general') {
          data.subject = 'General Inquiry';
        }
      }
      
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'resume' && value !== undefined && value !== null && value !== '') {
          formData.append(key, value as string);
        }
      });
      
      // Always ensure inquiryType is set
      if (!data.inquiryType) {
        formData.set('inquiryType', activeTab);
      }
      
      if (data.resume && data.resume.length > 0) {
        formData.append('resume', data.resume[0]);
      }

      const response = await fetch(`${apiUrl}/api/contact/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Thank you! Your message has been sent. I\'ll get back to you within 24 hours.');
        reset();
      } else {
        let errorMsg = 'Failed to send message';
        try {
          const errorData = await response.json();
          if (errorData.error) errorMsg = errorData.error;
          else if (errorData.detail) {
            errorMsg = typeof errorData.detail === 'string' ? errorData.detail : errorData.detail[0]?.msg || errorMsg;
          }
        } catch (e) {
          // ignore
        }
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetOptions = [
    { value: '', label: t('contact.form.budget.select', 'Select budget') },
    { value: '$1k - $5k', label: '$1,000 - $5,000' },
    { value: '$5k - $10k', label: '$5,000 - $10,000' },
    { value: '$10k - $25k', label: '$10,000 - $25,000' },
    { value: '$25k - $50k', label: '$25,000 - $50,000' },
    { value: '$50k+', label: '$50,000+' },
    { value: 'custom', label: 'Custom Budget' },
  ];

  const timelineOptions = [
    { value: '', label: t('contact.form.timeline.select', 'Select timeline') },
    { value: 'urgent', label: t('contact.form.timeline.urgent', 'ASAP (Within 2 weeks)') },
    { value: '1month', label: t('contact.form.timeline.1m', '1 Month') },
    { value: '3months', label: t('contact.form.timeline.3m', '1-3 Months') },
    { value: '3plus', label: t('contact.form.timeline.3p', '3+ Months') },
    { value: 'flexible', label: t('contact.form.timeline.flex', 'Flexible') },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('contact.form.name')} *
          </label>
          <input
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={t('contact.form.name.ph', 'John Doe')}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t('contact.form.email')} *
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={t('contact.form.email.ph', 'john@example.com')}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone & Company */}
      {(showPhone || showCompany) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showPhone && (
            <div className={!showCompany ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium mb-2">
                {t('contact.form.phone')}
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t('contact.form.phone.ph', '+91 XXXXXXXXXX')}
                disabled={isSubmitting}
              />
            </div>
          )}

          {showCompany && (
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('contact.form.company')}
              </label>
              <input
                {...register('company')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t('contact.form.company.ph', 'Your Company Name')}
                disabled={isSubmitting}
              />
            </div>
          )}
        </div>
      )}

      {/* Role, Website, LinkedIn, Resume */}
      {showRoleAndWebsite && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {activeTab === 'career' ? 'Applying For Position' : 'Your Role'} *
              </label>
              {activeTab === 'career' ? (
                <select
                  {...register('role', { required: 'Position is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                >
                  <option value="">Select Position</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Product Designer">Product Designer</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  {...register('role', { required: 'Role is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. Content Creator"
                  disabled={isSubmitting}
                />
              )}
              {errors.role && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {activeTab === 'career' ? 'Portfolio Link' : 'Website / Social Link'}
              </label>
              <input
                type="url"
                {...register('website')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {activeTab === 'career' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  {...register('linkedin')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="https://linkedin.com/in/..."
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Resume / CV *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register('resume', { required: 'Resume is required' })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                  disabled={isSubmitting}
                />
                {errors.resume && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.resume.message}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subject */}
      {showSubjectAndMessage && (
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('contact.form.subject')} *
          </label>
          <input
            {...register('subject', {
              required: showSubjectAndMessage ? 'Subject is required' : false,
              minLength: { value: 5, message: 'Subject must be at least 5 characters' }
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={t('contact.form.subject.ph', 'Project Inquiry: Web Development')}
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>
          )}
        </div>
      )}

      {/* Budget & Timeline */}
      {showBudgetAndTimeline && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('contact.form.budget')}
            </label>
            <select
              {...register('budget')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isSubmitting}
            >
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t('contact.form.timeline')}
            </label>
            <select
              {...register('timeline')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isSubmitting}
            >
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Inquiry Type (Hidden) */}
      <input type="hidden" {...register('inquiryType')} />
      {!showSubjectAndMessage && (
        <>
          <input type="hidden" {...register('subject')} />
          <input type="hidden" {...register('message')} />
        </>
      )}

      {/* Message */}
      {showSubjectAndMessage && (
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('contact.form.message')} *
          </label>
          <textarea
            {...register('message', {
              required: showSubjectAndMessage ? 'Message is required' : false,
              minLength: { value: 10, message: 'Message must be at least 10 characters' },
              maxLength: { value: 2000, message: 'Message must be less than 2000 characters' }
            })}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder={t('contact.form.message.ph', 'Tell me about your project, requirements, and goals...')}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
          )}
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('contact.form.msgDesc')}
          </div>
        </div>
      )}



      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t('contact.form.sending', 'Sending...')}</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>{t('contact.form.submit')}</span>
          </>
        )}
      </motion.button>

      {/* Privacy Note */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {t('contact.form.privacy')}
        </p>
      </div>
    </motion.form>
  );
};

export default ContactForm;