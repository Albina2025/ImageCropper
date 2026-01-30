export function arrayMove<T>(array: T[], from: number, to: number): T[] {
    const newArray = [...array];
    const item = newArray[from];
    newArray.splice(from, 1);
    newArray.splice(to, 0, item);
    return newArray;
}
