import { SCHEDULED_SELECTED, COMPLETED_SELECTED } from "./constants/index.constants";

export const switchScheduleScreens = (type) => {
    return { type: type ? SCHEDULED_SELECTED : COMPLETED_SELECTED}
 }