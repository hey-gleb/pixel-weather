// TODO replace with moment.js

import { WeekDays } from '../types/days';
import { Dayjs } from 'dayjs';

const dayOfWeek: Record<number, WeekDays> = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
};

export const getDayOfWeek = (date: Dayjs): WeekDays => dayOfWeek[date.day()];
