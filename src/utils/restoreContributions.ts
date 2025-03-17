import { initialContributions } from './initialContributions';

export const restoreInitialContributions = () => {
  // Check if contributions exist in localStorage
  const existingContributions = localStorage.getItem('ai-fi-contributions');
  
  // Only restore if no contributions exist
  if (!existingContributions || JSON.parse(existingContributions).length === 0) {
    localStorage.setItem('ai-fi-contributions', JSON.stringify(initialContributions));
    console.log('Initial AI-Fi contributions restored successfully');
  }
};