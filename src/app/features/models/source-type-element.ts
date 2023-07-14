export interface SourceTypeElement {
  SourceTypeId: number;
  SourceTypeName: string;
  SourceTypeDescription: string;
}

export const DEMO_SOURCE_TYPES: SourceTypeElement[] = [
  {
    SourceTypeId: 1,
    SourceTypeName: 'DATABASE',
    SourceTypeDescription: 'Connect to a database to fetch primitive',
  },
  {
    SourceTypeId: 2,
    SourceTypeName: 'WEBAPI',
    SourceTypeDescription: 'Connect to a Web Api to fetch primitive',
  },
];
