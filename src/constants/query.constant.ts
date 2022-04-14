import { PagingStrategies } from '@nestjs-query/query-graphql';

export const queryOption = {
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1
};

export const relationOption = (nullable = false) => ({
  disableUpdate: true,
  disableRemove: true,
  nullable,
  maxResultsSize: -1
});
