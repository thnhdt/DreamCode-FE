// Utility function to call API with mock data fallback
export async function apiWithMock<T>(
  apiCall: () => Promise<T>,
  mockData: T,
  errorMessage?: string
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    console.warn(
      errorMessage || "API call failed, using mock data:",
      error
    );
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockData;
  }
}

// Utility function for paginated responses
export async function apiWithMockPaginated<T>(
  apiCall: () => Promise<T[] | { data: T[] }>,
  mockData: T[],
  errorMessage?: string
): Promise<T[] | { data: T[] }> {
  try {
    return await apiCall();
  } catch (error) {
    console.warn(
      errorMessage || "API call failed, using mock data:",
      error
    );
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockData;
  }
}

