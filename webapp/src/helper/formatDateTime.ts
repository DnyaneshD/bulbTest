export function dateFormatter(dateValue: string): string {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  try {
    const finalValue = new Date(dateValue).toLocaleDateString('en-US', options);
    return finalValue;
  } catch {
    return 'Invalid Date';
  }
}
