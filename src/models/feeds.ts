export interface Feed {
  id: number;
  url: string;
  alias?: string;
  titleKey: string;
  bodyKey: string;
  imageKey?: string;
  authorKey?: string;
  dateKey?: string;
  created: string;
  updated: string;
}

export interface FeedsReducer {
  isLoading: boolean;
  feeds: Feed[];
}

export interface CreateFeedDto {
  alias?: string;
  url: string;
  titleKey: string;
  bodyKey: string;
  imageKey?: string;
  authorKey?: string;
  dateKey?: string;
}

export interface UpdateFeedDto {
  url?: string;
  alias?: string;
  titleKey?: string;
  bodyKey?: string;
  imageKey?: string;
  authorKey?: string;
  dateKey?: string;
}