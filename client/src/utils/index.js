// Format date as "day-month-year"
export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

// Format date from string as "YYYY-MM-DD"
export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

// Get initials from full name
export const getInitials = (fullName) => {
  if (!fullName) return ''; // Handle cases where no name is provided
  const names = fullName.split(' '); // Split the name by spaces
  return names.length > 1 
    ? names[0][0] + names[1][0] // Use initials from first two parts
    : names[0][0]; // Use initial from the single part
};

// Styles for priority levels
export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

// Styles for task types
export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

// Background styles
export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];
