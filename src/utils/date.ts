import dayjs from 'dayjs'

export const formatDate = (date: dayjs.ConfigType, format = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format)
}

export const formatDateRange = (
  dates: [dayjs.ConfigType, dayjs.ConfigType],
  format = 'YYYY-MM-DD',
) => {
  if (!dates || !Array.isArray(dates) || dates.length !== 2) {
    return []
  }
  return [formatDate(dates[0], format), formatDate(dates[1], format)]
}

/**
 * 日期范围转换成对象
 * @param key1
 * @param key2
 * @param value 时间范围 数组
 * @returns object
 */
export const dateRange2Obj = (
  key1: string,
  key2: string,
  value: [dayjs.ConfigType, dayjs.ConfigType],
) => {
  const val1 = isValidDate(value?.[0]) ? value?.[0] : undefined
  const val2 = isValidDate(value?.[1]) ? value?.[1] : undefined
  return {
    [key1]: val1,
    [key2]: val2,
  }
}

export const parseDate = (date: string): dayjs.Dayjs => {
  return dayjs(date)
}

export const isValidDate = (date: dayjs.ConfigType): boolean => {
  return dayjs(date).isValid()
}
