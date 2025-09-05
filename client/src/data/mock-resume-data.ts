import type { ResumeData } from "@/types/resume";

export const mockResumeData: ResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson"
  },
  summary: "Experienced Software Engineer with 5+ years of expertise in full-stack development, cloud technologies, and agile methodologies. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve business objectives.",
  experiences: [
    {
      jobTitle: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "",
      isCurrentJob: true,
      description: "Led development of microservices architecture serving 1M+ users\nImplemented CI/CD pipelines reducing deployment time by 60%\nMentored junior developers and conducted technical interviews\nCollaborated with product teams to define technical requirements"
    },
    {
      jobTitle: "Software Engineer",
      company: "StartupXYZ",
      location: "Palo Alto, CA",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      isCurrentJob: false,
      description: "Developed REST APIs and web applications using React and Node.js\nOptimized database queries improving application performance by 40%\nParticipated in agile development and sprint planning\nImplemented automated testing increasing code coverage to 90%"
    },
    {
      jobTitle: "Junior Developer",
      company: "Digital Solutions",
      location: "San Jose, CA",
      startDate: "Aug 2018",
      endDate: "May 2019",
      isCurrentJob: false,
      description: "Built responsive web interfaces using HTML, CSS, and JavaScript\nAssisted in debugging and troubleshooting production issues\nContributed to code reviews and documentation\nLearned modern development frameworks and best practices"
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      graduationYear: "2018",
      gpa: "3.8",
      relevantCoursework: "Data Structures, Algorithms, Database Systems, Software Engineering, Machine Learning"
    },
    {
      degree: "Full Stack Web Development Certificate",
      institution: "UC Berkeley Extension",
      location: "Berkeley, CA",
      graduationYear: "2017",
      gpa: "",
      relevantCoursework: "JavaScript, React, Node.js, MongoDB, Express.js"
    }
  ],
  skills: [
    { name: "JavaScript", category: "Programming Languages", level: "Expert" },
    { name: "TypeScript", category: "Programming Languages", level: "Advanced" },
    { name: "Python", category: "Programming Languages", level: "Advanced" },
    { name: "Java", category: "Programming Languages", level: "Intermediate" },
    { name: "React", category: "Frontend", level: "Expert" },
    { name: "Vue.js", category: "Frontend", level: "Advanced" },
    { name: "Angular", category: "Frontend", level: "Intermediate" },
    { name: "HTML/CSS", category: "Frontend", level: "Expert" },
    { name: "Node.js", category: "Backend", level: "Advanced" },
    { name: "Express.js", category: "Backend", level: "Advanced" },
    { name: "Django", category: "Backend", level: "Intermediate" },
    { name: "Spring Boot", category: "Backend", level: "Beginner" },
    { name: "PostgreSQL", category: "Databases", level: "Advanced" },
    { name: "MongoDB", category: "Databases", level: "Advanced" },
    { name: "Redis", category: "Databases", level: "Intermediate" },
    { name: "MySQL", category: "Databases", level: "Intermediate" },
    { name: "AWS", category: "Cloud & DevOps", level: "Advanced" },
    { name: "Docker", category: "Cloud & DevOps", level: "Advanced" },
    { name: "Kubernetes", category: "Cloud & DevOps", level: "Intermediate" },
    { name: "Jenkins", category: "Cloud & DevOps", level: "Intermediate" },
    { name: "Git", category: "Tools", level: "Expert" },
    { name: "Jest", category: "Tools", level: "Advanced" },
    { name: "Webpack", category: "Tools", level: "Intermediate" },
    { name: "Figma", category: "Tools", level: "Intermediate" }
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Built a full-stack e-commerce application with payment integration, inventory management, and admin dashboard. Implemented real-time notifications and advanced search functionality.",
      technologies: "React, Node.js, PostgreSQL, Stripe API, Redis",
      startDate: "2023",
      endDate: "2024",
      link: "https://ecommerce-demo.com",
      github: "https://github.com/alexjohnson/ecommerce"
    },
    {
      name: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates, team collaboration features, and analytics dashboard.",
      technologies: "Vue.js, Express.js, MongoDB, Socket.io",
      startDate: "2022",
      endDate: "2023",
      link: "https://taskapp-demo.com",
      github: "https://github.com/alexjohnson/taskapp"
    },
    {
      name: "Weather Analytics Dashboard",
      description: "Created a data visualization dashboard that aggregates weather data from multiple APIs and provides insights through interactive charts and graphs.",
      technologies: "Python, Django, D3.js, PostgreSQL, OpenWeatherMap API",
      startDate: "2021",
      endDate: "2022",
      link: "https://weather-dashboard.com",
      github: "https://github.com/alexjohnson/weather-dashboard"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-SA-12345"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022",
      credentialId: "GCP-PD-67890"
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2023",
      credentialId: "CKA-54321"
    }
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Spanish", proficiency: "Conversational" },
    { name: "Mandarin", proficiency: "Basic" },
    { name: "French", proficiency: "Intermediate" }
  ],
  awards: [
    {
      name: "Employee of the Year",
      issuer: "TechCorp Inc.",
      date: "2023",
      description: "Recognized for outstanding performance and leadership in driving technical innovation"
    },
    {
      name: "Hackathon Winner",
      issuer: "Bay Area Tech Challenge",
      date: "2022",
      description: "First place for developing an AI-powered customer service chatbot"
    },
    {
      name: "Dean's List",
      issuer: "Stanford University",
      date: "2016-2018",
      description: "Consistently maintained GPA above 3.5 for six consecutive semesters"
    }
  ],
  volunteering: [
    {
      role: "Code Mentor",
      organization: "Code.org",
      startDate: "2020",
      endDate: "",
      description: "Mentor high school students learning programming fundamentals\nLead weekly coding workshops and hackathons\nHelp students build portfolio projects and prepare for technical interviews"
    },
    {
      role: "Technical Volunteer",
      organization: "Non-Profit Tech Solutions",
      startDate: "2019",
      endDate: "2021",
      description: "Developed websites and digital tools for local non-profit organizations\nProvided technical support and training to staff members\nCreated documentation and user guides for ongoing maintenance"
    }
  ],
  interests: [
    "Machine Learning",
    "Open Source Contributions",
    "Rock Climbing",
    "Photography",
    "Cooking",
    "Travel",
    "Chess",
    "Podcast Hosting"
  ],
  customSections: [],
  settings: {
    templateId: "71d5bc3e-c71c-427c-b244-12d0903cc288",
    colorScheme: "blue",
    fontSize: "medium"
  }
};

// Additional mock data variations for different professions
export const mockDataVariations = {
  marketing: {
    personalInfo: {
      name: "Sarah Martinez",
      email: "sarah.martinez@email.com",
      phone: "(555) 987-6543",
      location: "New York, NY",
      website: "sarahmarketing.com",
      linkedin: "linkedin.com/in/sarahmartinez",
      github: ""
    },
    summary: "Creative Marketing Professional with 6+ years of experience in digital marketing, brand strategy, and campaign management. Proven track record of increasing brand awareness and driving customer engagement through innovative marketing solutions.",
    experiences: [
      {
        jobTitle: "Senior Marketing Manager",
        company: "Global Brands Co.",
        location: "New York, NY",
        startDate: "Mar 2021",
        endDate: "",
        isCurrentJob: true,
        description: "Led multi-channel marketing campaigns resulting in 45% increase in lead generation\nManaged $2M annual marketing budget across digital and traditional channels\nDeveloped brand guidelines and messaging strategy for product launches\nCollaborated with sales team to align marketing efforts with revenue goals"
      }
    ],
    skills: [
      { name: "Google Analytics", category: "Analytics" },
      { name: "Facebook Ads", category: "Paid Advertising" },
      { name: "SEO/SEM", category: "Digital Marketing" },
      { name: "Content Marketing", category: "Strategy" },
      { name: "Adobe Creative Suite", category: "Design" },
      { name: "HubSpot", category: "Marketing Automation" }
    ]
  },
  designer: {
    personalInfo: {
      name: "David Chen",
      email: "david.chen@email.com",
      phone: "(555) 456-7890",
      location: "Los Angeles, CA",
      website: "davidchen.design",
      linkedin: "linkedin.com/in/davidchen",
      github: "github.com/davidchen"
    },
    summary: "Innovative UX/UI Designer with 4+ years of experience creating user-centered digital experiences. Expertise in design thinking, prototyping, and collaborating with cross-functional teams to deliver impactful design solutions.",
    experiences: [
      {
        jobTitle: "Senior UX Designer",
        company: "Design Studio Inc.",
        location: "Los Angeles, CA",
        startDate: "Jan 2022",
        endDate: "",
        isCurrentJob: true,
        description: "Designed user interfaces for mobile and web applications serving 500K+ users\nConducted user research and usability testing to inform design decisions\nCreated design systems and component libraries for consistent user experience\nCollaborated with developers to ensure accurate implementation of designs"
      }
    ],
    skills: [
      { name: "Figma", category: "Design Tools" },
      { name: "Sketch", category: "Design Tools" },
      { name: "Adobe XD", category: "Design Tools" },
      { name: "Prototyping", category: "UX Skills" },
      { name: "User Research", category: "UX Skills" },
      { name: "Wireframing", category: "UX Skills" }
    ]
  }
};