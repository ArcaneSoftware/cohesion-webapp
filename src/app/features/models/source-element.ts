export interface SourceElement {
  sourceId: number;
  sourceName: string;
  sourceTypeName: string;
  address: string;
}

export const DEMO_SOURCES: SourceElement[] = [
  {
    sourceId: 1,
    sourceName: 'PRODUCTION_DB_1',
    sourceTypeName: 'DATABASE',
    address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_1;Port=5432',
  },
  {
    sourceId: 2,
    sourceName: 'PRODUCTION_DB_2',
    sourceTypeName: 'DATABASE',
    address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_2;Port=5432',
  },
  {
    sourceId: 3,
    sourceName: 'PRODUCTION_DB_3',
    sourceTypeName: 'DATABASE',
    address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_3;Port=5432',
  },
  {
    sourceId: 4,
    sourceName: 'PRODUCTION_DB_4',
    sourceTypeName: 'DATABASE',
    address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_41;Port=5432',
  },
  {
    sourceId: 5,
    sourceName: 'PRODUCTION_DB_5',
    sourceTypeName: 'DATABASE',
    address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_5;Port=5432',
  },
  {
    sourceId: 6,
    sourceName: 'PRODUCTION_DB_6',
    sourceTypeName: 'DATABASE',
    address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_6;Port=5432',
  },
];
