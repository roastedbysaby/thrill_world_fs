export function validateDate(dateString){
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return 'Date format must be YYYY-MM-DD.';

    const [ year, month, day ] = dateString.split('-').map(Number);
    const date = new Date(dateString);
    const isValidDate =
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day;

    if (!isValidDate) return 'Invalid dates.';

    return date;
};