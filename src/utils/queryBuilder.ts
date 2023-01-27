import { convertToSnakeCase } from './string';

export const buildQueryString = (record: Record<string, any>): string => {
    return Object.entries(record)
        .reduce(
            (acc: string, [key, value]: [string, string]) =>
                `${acc}${convertToSnakeCase(key)}=${value}&`,
            '?'
        )
        .slice(0, -1);
};
