import { formatDate, formatDateTime } from "common/utils/extends";

export function dateFilter(value: string | Date)
{
    return formatDate(value) || "-";
}

export function dateTimeFilter(value: string | Date)
{
    return formatDateTime(value) || "-";
}
