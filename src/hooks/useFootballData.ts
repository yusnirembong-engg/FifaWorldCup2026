import { useState, useEffect, useCallback } from 'react';
import { FootballDataService, FootballDataMatch } from '../services/footballDataApi';
const footballService = new FootballDataService();
export function useFootballData() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await footballService.getWorldCupMatches();

      // Convert API matches to app format
      const convertedMatches = data.matches.map(match => FootballDataService.convertToAppFormat(match));
      setMatches(convertedMatches);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || 'Failed to fetch match data');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  const updateApiKey = useCallback((newKey: string) => {
    footballService.setApiKey(newKey);
    fetchMatches(); // Refetch with new key
  }, [fetchMatches]);
  const getApiKey = useCallback(() => {
    return footballService.getApiKey();
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  // Auto-refresh every 60 seconds for live matches
  useEffect(() => {
    const interval = setInterval(() => {
      const hasLiveMatches = matches.some(m => m.isLive);
      if (hasLiveMatches) {
        fetchMatches();
      }
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [matches, fetchMatches]);
  return {
    matches,
    loading,
    error,
    lastUpdated,
    refetch: fetchMatches,
    updateApiKey,
    getApiKey
  };
}