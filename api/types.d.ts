export type TPaginatedResource<T> = {
  data: T[];
  meta: {
    pagination: {
      total: number;
      current_page: number;
      prev_page: number | null;
      next_page: number | null;
      total_pages: number;
    };
  };
};
