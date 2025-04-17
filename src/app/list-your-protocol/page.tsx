'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { supabase } from '@/utils/supabase';

export default function ListProtocol() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    features: '',
    tags: '',
    githubUrl: '',
    createdBy: '',
    contactEmail: '',
    websiteLink: '',
    logoUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.features || !formData.createdBy || !formData.contactEmail) {
        throw new Error('Name, description, features, creator name, and contact email are required');
      }

      // Convert camelCase to snake_case for database
      const dbData = {
        name: formData.name,
        description: formData.description,
        features: formData.features,
        tags: formData.tags || null,
        github_url: formData.githubUrl || null,
        created_by: formData.createdBy,
        contact_email: formData.contactEmail,
        website_link: formData.websiteLink || null,
        logo_url: formData.logoUrl || null,
        status: 'pending' // Add pending status
      };

      // Insert data into Supabase
      const { error } = await supabase
        .from('protocols')
        .insert([dbData])
        .select();

      if (error) throw error;

      // Show success message
      toast.success('Protocol successfully submitted! It is now pending approval.');
      
      // Redirect to a thank you or submission confirmation page
      router.push('/submission-success');
    } catch (error) {
      console.error('Error submitting protocol:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit protocol');
      toast.error(error instanceof Error ? error.message : 'Failed to submit protocol');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">List Your A2A Protocol</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg">
            <h3 className="font-semibold mb-2">Submission Guidelines</h3>
            <p className="text-sm mb-2">
              Your submission is subject to verification by our team to ensure quality and adherence to our standards. We typically review submissions within 2-3 business days.
            </p>
            <p className="text-sm">
              All protocols must include proper documentation and demonstrate clear use cases for agent-to-agent communication. You&apos;ll be notified via email once your protocol is approved and listed.
            </p>
          </div>
          
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Protocol Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="e.g., ChatGPT Plugin Protocol"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="Describe what your protocol does and how it enables agent-to-agent communication..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Features*</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="List key features, separate with commas or new lines"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="e.g., chatbot, api, nlp (comma separated)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <input
                  type="url"
                  name="logoUrl"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="https://example.com/logo.png"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Provide a URL to your protocol&apos;s logo (recommended size: 192x192px)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="https://github.com/your-repo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Created By*</label>
                <input
                  type="text"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="Your name or organization"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email*</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="contact@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  name="websiteLink"
                  value={formData.websiteLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center font-medium disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Protocol'
                  )}
                </button>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
                  By submitting, you agree to our <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 