export type Activity = {
  call_type: 'outbound' | 'inbound';
  created_at: Date;
  direction: string;
  duration: number;
  from: number;
  id: string;
  is_archived: boolean;
  to: number;
  via: number;
};
