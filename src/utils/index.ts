import _ from 'lodash';
import async from 'async';
import { ReadStream } from 'fs';

/** Remove white space in string */
export const trimString = (str: string): string => {
  if (!str) return str;
  if (!_.isString(str)) return str;
  return str.replace(/^\s+|\s+$/g, '');
};

export const splitStringToArray = (str: string, symbol: string): string[] => {
  if (!str) return [];
  const result = str.split(symbol);
  result.forEach((val, index) => {
    result[index] = trimString(val);
  });
  return _.isEmpty(result) ? [] : result;
};

export const streamToBuffer = (stream: ReadStream): Promise<Buffer> => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks)))
      .on('error', (err) => reject(err));
  });
};

export const asyncForEach = (array: any[], callback: (data: any, index: number, array: any[]) => Promise<void>) =>
  new Promise(async (resolve, reject) => {
    for (let index = 0; index < array.length; index++) {
      try {
        await callback(array[index], index, array); //eslint-disable-line
      } catch (e) {
        reject(e);
      }
    }
    resolve(true);
  });

type GenerateRunningNumberOptions = { length?: number; suffix?: string };
export const generateRunningNumber = (number: number, prefix: string, options?: GenerateRunningNumberOptions) => {
  const length = _.get(options, 'length') || 8;
  const suffix = _.get(options, 'suffix') || '8';
  return `${prefix}${_.padStart(`${number}`, length, '0')}${suffix || ''}`;
};

export const numberToArray = (value: number): number[] => {
  const result: number[] = [];
  for (let i = 1; i <= value; i++) {
    result.push(i);
  }
  return result;
};

export const createCargo = (size?: number) => {
  return async.cargo(async (tasks: Array<() => Promise<void>>, callback) => {
    await Promise.all(
      _.map(tasks, async (task) => {
        if (task) await task();
      })
    );
    callback();
  }, size || 5);
};
