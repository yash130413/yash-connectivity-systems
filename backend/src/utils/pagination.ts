const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;

export function parsePagination(
  page: string | undefined,
  limit: string | undefined,
): { page: number; limit: number; skip: number } {
  const pageNum = Math.max(1, parseInt(page ?? '1', 10) || 1);
  const rawLimit = parseInt(limit ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT;
  const limitNum = Math.min(MAX_LIMIT, Math.max(1, rawLimit));
  const skip = (pageNum - 1) * limitNum;

  return { page: pageNum, limit: limitNum, skip };
}
