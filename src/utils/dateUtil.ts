function formatDate(date: Date, offset: number): string {
  const adjustedDate: Date = new Date(date.getTime() + offset * 1440 * 60000);
  const year: number = adjustedDate.getFullYear();
  const month: string = (adjustedDate.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const day: string = adjustedDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export { formatDate };
