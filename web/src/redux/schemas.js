import { schema } from 'normalizr';

export const TRENDING_SCHEMA = new schema.Entity('trending');
export const NETFLIX_SCHEMA = new schema.Entity('netflixOriginals');
export const TOP_RATED_SCHEMA = new schema.Entity('topRated');
export const ACTION_SCHEMA = new schema.Entity('action');
export const COMEDY_SCHEMA = new schema.Entity('comedy');
export const HORROR_SCHEMA = new schema.Entity('horror');
export const ROMANCE_SCHEMA = new schema.Entity('romance');
export const DOCUMENTARY_SCHEMA = new schema.Entity('documentary');