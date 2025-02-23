// Helper function for validate strings
export const validateString = (field: any): boolean => typeof field === 'string' && field.trim() !== '';

// Validate dates
export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

export const validateBoolean = (field: boolean) => typeof field === 'boolean';
