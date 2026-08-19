export type IELTSModule = 'reading' | 'listening' | 'writing' | 'speaking';

export type TestType = 'academic' | 'general_training';

export type TestStatus = 'draft' | 'published';

export type AttemptStatus = 'not_started' | 'in_progress' | 'completed';

export interface IELTSScore {
  overall: number;
  reading?: number;
  listening?: number;
  writing?: number;
  speaking?: number;
}
