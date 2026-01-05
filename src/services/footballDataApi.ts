// Football-Data.org API Service
const DEFAULT_API_KEY = 'dbd55109f3ac402d927b0e1c7e1f3d9c';
const API_BASE_URL = 'https://api.football-data.org/v4';
export interface FootballDataMatch {
  id: number;
  utcDate: string;
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'CANCELLED';
  matchday: number;
  stage: string;
  group: string | null;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
  venue: string;
}
export interface FootballDataResponse {
  matches: FootballDataMatch[];
  competition: {
    id: number;
    name: string;
    emblem: string;
  };
}

// Country code to flag emoji mapping
const countryToFlag: Record<string, string> = {
  ARG: '🇦🇷',
  BRA: '🇧🇷',
  FRA: '🇫🇷',
  GER: '🇩🇪',
  ESP: '🇪🇸',
  ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  POR: '🇵🇹',
  NED: '🇳🇱',
  BEL: '🇧🇪',
  ITA: '🇮🇹',
  URU: '🇺🇾',
  MEX: '🇲🇽',
  USA: '🇺🇸',
  CAN: '🇨🇦',
  CRO: '🇭🇷',
  DEN: '🇩🇰',
  SUI: '🇨🇭',
  POL: '🇵🇱',
  SEN: '🇸🇳',
  MAR: '🇲🇦',
  TUN: '🇹🇳',
  EGY: '🇪🇬',
  NGA: '🇳🇬',
  GHA: '🇬🇭',
  CMR: '🇨🇲',
  JPN: '🇯🇵',
  KOR: '🇰🇷',
  AUS: '🇦🇺',
  IRN: '🇮🇷',
  SAU: '🇸🇦',
  QAT: '🇶🇦',
  ECU: '🇪🇨',
  COL: '🇨🇴',
  CHI: '🇨🇱',
  PER: '🇵🇪',
  CRC: '🇨🇷',
  WAL: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  SRB: '🇷🇸',
  UKR: '🇺🇦'
};
export class FootballDataService {
  private apiKey: string;
  constructor(apiKey?: string) {
    this.apiKey = apiKey || this.getStoredApiKey() || DEFAULT_API_KEY;
  }
  private getStoredApiKey(): string | null {
    return localStorage.getItem('footballDataApiKey');
  }
  public setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('footballDataApiKey', key);
  }
  public getApiKey(): string {
    return this.apiKey;
  }
  private async fetchFromApi(endpoint: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'X-Auth-Token': this.apiKey
      }
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  public async getWorldCupMatches(): Promise<FootballDataResponse> {
    try {
      return await this.fetchFromApi('/competitions/WC/matches');
    } catch (error) {
      console.error('Error fetching World Cup matches:', error);
      throw error;
    }
  }
  public async getMatchesByStatus(status: string): Promise<FootballDataMatch[]> {
    try {
      const data = await this.getWorldCupMatches();
      return data.matches.filter(match => match.status === status);
    } catch (error) {
      console.error('Error fetching matches by status:', error);
      return [];
    }
  }
  public async getLiveMatches(): Promise<FootballDataMatch[]> {
    return this.getMatchesByStatus('IN_PLAY');
  }

  // Convert API match to our app format
  public static convertToAppFormat(apiMatch: FootballDataMatch, customUrl?: string): any {
    const homeScore = apiMatch.score.fullTime.home ?? 0;
    const awayScore = apiMatch.score.fullTime.away ?? 0;
    const isLive = apiMatch.status === 'IN_PLAY' || apiMatch.status === 'PAUSED';

    // Format date and time
    const matchDate = new Date(apiMatch.utcDate);
    const dateStr = matchDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const timeStr = matchDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    return {
      id: apiMatch.id.toString(),
      date: dateStr,
      time: timeStr,
      venue: apiMatch.venue || 'TBD',
      team1: apiMatch.homeTeam.shortName || apiMatch.homeTeam.name,
      flag1: countryToFlag[apiMatch.homeTeam.tla] || '🏳️',
      team2: apiMatch.awayTeam.shortName || apiMatch.awayTeam.name,
      flag2: countryToFlag[apiMatch.awayTeam.tla] || '🏳️',
      group: apiMatch.group || apiMatch.stage || `Matchday ${apiMatch.matchday}`,
      customUrl: customUrl || `#match-${apiMatch.id}`,
      homeScore,
      awayScore,
      isLive,
      status: apiMatch.status,
      matchday: apiMatch.matchday,
      stage: apiMatch.stage
    };
  }
}
export const footballDataService = new FootballDataService();