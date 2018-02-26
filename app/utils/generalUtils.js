import moment from "moment"
import { API_DATE_FORMAT } from "services/constants"

export const relativeTime = string => moment(string, API_DATE_FORMAT).fromNow()