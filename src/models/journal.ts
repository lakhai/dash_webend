export interface JournalEntry {
  id?: number;
  title: string;
  body: string;
  created: string;
  updated: string;
}

export interface JournalReducer {
  isLoading: boolean;
  entries: JournalEntry[];
}

export interface CreateJournalEntryDto {
  title: string;
  body: string;
}

export interface UpdateJournalEntryDto {
  title?: string;
  body?: string;
}