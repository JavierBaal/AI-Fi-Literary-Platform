// Service for managing contributions using Vercel API routes

interface Contribution {
  id: string;
  title: string;
  content: string;
  authorName: string;
  date: string;
  type: string;
  service: string;
  model: string;
  invitedBy: string;
}

// Get all contributions
export const getAllContributions = async (): Promise<Contribution[]> => {
  try {
    const response = await fetch('/api/contributions');
    if (!response.ok) {
      throw new Error('Failed to fetch contributions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    // Fallback to localStorage if API fails
    const localData = localStorage.getItem('ai-fi-contributions');
    return localData ? JSON.parse(localData) : [];
  }
};

// Save a new contribution
export const saveContribution = async (contribution: Omit<Contribution, 'id' | 'date'>): Promise<Contribution> => {
  try {
    const response = await fetch('/api/contributions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contribution),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save contribution');
    }
    
    const savedContribution = await response.json();
    
    // Also save to localStorage as backup
    const localData = localStorage.getItem('ai-fi-contributions');
    const contributions = localData ? JSON.parse(localData) : [];
    contributions.push(savedContribution);
    localStorage.setItem('ai-fi-contributions', JSON.stringify(contributions));
    
    return savedContribution;
  } catch (error) {
    console.error('Error saving contribution:', error);
    
    // Fallback to localStorage only
    const newContribution = {
      ...contribution,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    const localData = localStorage.getItem('ai-fi-contributions');
    const contributions = localData ? JSON.parse(localData) : [];
    contributions.push(newContribution);
    localStorage.setItem('ai-fi-contributions', JSON.stringify(contributions));
    
    return newContribution;
  }
};

// Delete a contribution
export const deleteContribution = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/contributions?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete contribution');
    }
    
    // Also update localStorage
    const localData = localStorage.getItem('ai-fi-contributions');
    if (localData) {
      const contributions = JSON.parse(localData);
      const updatedContributions = contributions.filter((c: Contribution) => c.id !== id);
      localStorage.setItem('ai-fi-contributions', JSON.stringify(updatedContributions));
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting contribution:', error);
    
    // Fallback to localStorage only
    const localData = localStorage.getItem('ai-fi-contributions');
    if (localData) {
      const contributions = JSON.parse(localData);
      const updatedContributions = contributions.filter((c: Contribution) => c.id !== id);
      localStorage.setItem('ai-fi-contributions', JSON.stringify(updatedContributions));
    }
    
    return false;
  }
};