export interface SourceElement {
  SourceId: number;
  SourceName: string;
  SourceTypeName: string;
  Address: string;
}

export const DEMO_SOURCES: SourceElement[] = [
  {
    SourceId: 1,
    SourceName: 'PRODUCTION_DB_1',
    SourceTypeName: 'DATABASE',
    Address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_1;Port=5432'
  },
  {
    SourceId: 2,
    SourceName: 'PRODUCTION_DB_2',
    SourceTypeName: 'DATABASE',
    Address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_2;Port=5432'
  },
  {
    SourceId: 3,
    SourceName: 'PRODUCTION_DB_3',
    SourceTypeName: 'DATABASE',
    Address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_3;Port=5432'
  },
  {
    SourceId: 4,
    SourceName: 'PRODUCTION_DB_4',
    SourceTypeName: 'DATABASE',
    Address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_41;Port=5432'
  },
  {
    SourceId: 5,
    SourceName: 'PRODUCTION_DB_5',
    SourceTypeName: 'DATABASE',
    Address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_5;Port=5432'
  },
  {
    SourceId: 6,
    SourceName: 'PRODUCTION_DB_6',
    SourceTypeName: 'DATABASE',
    Address: 'UserID=postgres;Password=postgres;Host=host.docker.internal;Database=PRODUCTION_DB_6;Port=5432'
  },
];
