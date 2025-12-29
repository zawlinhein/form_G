export const forms = [
  {
    name: "Surveys Form",
    icon: "📋",
    comments: 0,
    responses: 0,
    timestamp: "32 minutes ago",
  },
  {
    name: "Job Application",
    icon: "💼",
    comments: 0,
    responses: 0,
    timestamp: "7 days ago",
  },
  {
    name: "Survey Form",
    icon: "📊",
    comments: 0,
    responses: 0,
    timestamp: "7 days ago",
  },
  {
    name: "Birthdays Party 🎂",
    icon: "🎂",
    comments: 0,
    responses: 0,
    timestamp: "9 days ago",
  },
  {
    name: "Booking form",
    icon: "📅",
    comments: 0,
    responses: 0,
    timestamp: "9 days ago",
  },
  {
    name: "Event Forms",
    icon: "🎪",
    comments: 0,
    responses: 0,
    timestamp: "10 days ago",
  },
  {
    name: "Job application",
    icon: "👔",
    comments: 0,
    responses: 0,
    timestamp: "10 days ago",
  },
  {
    name: "Work Request",
    icon: "📝",
    comments: 0,
    responses: 0,
    timestamp: "13 days ago",
  },
];

export const metrics = [
  {
    title: "Total Forms",
    value: "8",
    description: "All forms created on your account",
    change: "+12%",
    positive: true,
  },
  {
    title: "Total Responses",
    value: "4",
    description: "Responses submitted to your forms",
    change: "+8%",
    positive: true,
  },
  {
    title: "Conversion Rate",
    value: "0.0%",
    description: "% of views that resulted in responses",
    change: "-2%",
    positive: false,
  },
  {
    title: "Engagement Rate",
    value: "50.0%",
    description: "% of forms that received responses",
    change: "+5%",
    positive: true,
  },
];

// Dummy form data with survey content
export const dummyFormFields = [
  {
    id: "header",
    type: "heading",
    content: "Customer Satisfaction Survey",
  },
  {
    id: "intro",
    type: "paragraph",
    content:
      "We value your feedback! Please take a few moments to complete this survey and share your thoughts. Your responses will help us improve our services and better meet your needs.",
  },
  {
    id: "name",
    type: "text-input",
    label: "Full Name",
    placeholder: "Please enter your full name",
    required: true,
  },
  {
    id: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter to provide your email address for follow-up (optional)",
    required: false,
  },
  {
    id: "age",
    type: "radio",
    label: "Select your age group",
    required: true,
    options: ["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"],
  },
  {
    id: "satisfaction",
    type: "rating",
    label: "How satisfied are you with our service?",
    required: true,
  },
];

// Dummy form blocks data
/* const formBlocks = [
  { id: "heading", icon: Type, label: "Heading", type: "text" },
  { id: "paragraph", icon: AlignLeft, label: "Paragraph", type: "text" },
  { id: "text-input", icon: Type, label: "Text Input", type: "input" },
  { id: "email", icon: Mail, label: "Email", type: "input" },
  { id: "phone", icon: Phone, label: "Phone", type: "input" },
  { id: "date", icon: Calendar, label: "Date", type: "input" },
  { id: "dropdown", icon: List, label: "Dropdown", type: "input" },
  { id: "checkbox", icon: CheckSquare, label: "Checkbox", type: "input" },
  { id: "radio", icon: Circle, label: "Radio", type: "input" },
  { id: "rating", icon: Star, label: "Star Rating", type: "input" },
  { id: "image", icon: ImageIcon, label: "Image", type: "media" },
]; */
