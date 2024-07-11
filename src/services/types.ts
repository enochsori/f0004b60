export type Activity = {
  call_type: 'missed' | 'answered' | 'voicemail';
  created_at: Date;
  direction: 'outbound' | 'inbound';
  duration: number;
  from: number;
  id: string;
  is_archived: boolean;
  to: number;
  via: number;
};

export interface ArchiveCall {
  is_archived: boolean;
}

export interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
