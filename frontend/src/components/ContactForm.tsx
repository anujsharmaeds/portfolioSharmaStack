import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  inquiryType: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      inquiryType: 'general',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call - replace with actual backend endpoint
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent. I\'ll get back to you within 24 hours.');
        reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again or contact me directly at anujankur13@gmail.com');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetOptions = [
    { value: '', label: 'Select budget' },
    { value: '$1k - $5k', label: '$1,000 - $5,000' },
    { value: '$5k - $10k', label: '$5,000 - $10,000' },
    { value: '$10k - $25k', label: '$10,000 - $25,000' },
    { value: '$25k - $50k', label: '$25,000 - $50,000' },
    { value: '$50k+', label: '$50,000+' },
    { value: 'custom', label: 'Custom Budget' },
  ];

  const timelineOptions = [
    { value: '', label: 'Select timeline' },
    { value: 'urgent', label: 'ASAP (Within 2 weeks)' },
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '1-3 Months' },
    { value: '3plus', label: '3+ Months' },
    { value: 'flexible', label: 'Flexible' },
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
            placeholder="John Doe"
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
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone & Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Phone (Optional)
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="+91 75250 71752"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Company (Optional)
          </label>
          <input
            {...register('company')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Your Company Name"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('contact.form.subject')} *
        </label>
        <input
          {...register('subject', { 
            required: 'Subject is required',
            minLength: { value: 5, message: 'Subject must be at least 5 characters' }
          })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Project Inquiry: Web Development"
          disabled={isSubmitting}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>
        )}
      </div>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Budget Range (Optional)
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
            Project Timeline (Optional)
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

      {/* Inquiry Type (Hidden) */}
      <input type="hidden" {...register('inquiryType')} />

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('contact.form.message')} *
        </label>
        <textarea
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
            maxLength: { value: 2000, message: 'Message must be less than 2000 characters' }
          })}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="Tell me about your project, requirements, and goals..."
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
        )}
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Please include details about your project scope, technical requirements, and any specific deadlines.
        </div>
      </div>

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-700 dark:text-green-400 font-medium">
              Message sent successfully!
            </p>
            <p className="text-green-600 dark:text-green-500 text-sm mt-1">
              {submitMessage}
            </p>
          </div>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-700 dark:text-red-400 font-medium">
              Failed to send message
            </p>
            <p className="text-red-600 dark:text-red-500 text-sm mt-1">
              {submitMessage}
            </p>
          </div>
        </motion.div>
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
            <span>Sending...</span>
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
          Your information is secure and will only be used to respond to your inquiry.
          I never share your data with third parties.
        </p>
      </div>
    </motion.form>
  );
};

export default ContactForm;