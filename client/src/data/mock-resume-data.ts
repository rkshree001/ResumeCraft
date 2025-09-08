import type { ResumeData } from "@/types/resume";

// Get all available mock profiles
export const getAllMockProfiles = () => {
  const staticProfiles = Object.values(mockDataVariations);
  const generatedProfiles = generateMockProfiles();
  return [...staticProfiles, ...generatedProfiles];
};

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

// Comprehensive collection of 120+ realistic names and diverse professions
export const mockDataVariations = {
  // Software Engineers
  john_doe: {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      website: "johndoe.dev",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe"
    },
    summary: "Full-stack software engineer with 5+ years of experience building scalable web applications.",
    experiences: [{
      jobTitle: "Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "",
      isCurrentJob: true,
      description: "Developed React applications serving 1M+ users\nImplemented microservices architecture\nOptimized database performance by 40%"
    }]
  },
  jane_smith: {
    personalInfo: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "(555) 234-5678",
      location: "New York, NY",
      website: "janesmith.io",
      linkedin: "linkedin.com/in/janesmith",
      github: "github.com/janesmith"
    },
    summary: "Senior frontend developer specializing in React and modern JavaScript frameworks.",
    experiences: [{
      jobTitle: "Senior Frontend Developer",
      company: "Innovation Labs",
      location: "New York, NY",
      startDate: "Mar 2021",
      endDate: "",
      isCurrentJob: true,
      description: "Built responsive web interfaces\nImplemented accessibility standards\nMentored junior developers"
    }]
  },
  michael_johnson: {
    personalInfo: {
      name: "Michael Johnson",
      email: "michael.johnson@email.com",
      phone: "(555) 345-6789",
      location: "Austin, TX",
      website: "michaeljohnson.dev",
      linkedin: "linkedin.com/in/michaeljohnson",
      github: "github.com/michaeljohnson"
    },
    summary: "Backend engineer with expertise in distributed systems and cloud architecture.",
    experiences: [{
      jobTitle: "Backend Engineer",
      company: "Cloud Systems Inc",
      location: "Austin, TX",
      startDate: "Jun 2020",
      endDate: "",
      isCurrentJob: true,
      description: "Designed scalable APIs\nImplemented CI/CD pipelines\nReduced server costs by 30%"
    }]
  },
  sarah_williams: {
    personalInfo: {
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "(555) 456-7890",
      location: "Seattle, WA",
      website: "sarahwilliams.tech",
      linkedin: "linkedin.com/in/sarahwilliams",
      github: "github.com/sarahwilliams"
    },
    summary: "DevOps engineer focused on automation and infrastructure optimization.",
    experiences: [{
      jobTitle: "DevOps Engineer",
      company: "Seattle Tech",
      location: "Seattle, WA",
      startDate: "Feb 2021",
      endDate: "",
      isCurrentJob: true,
      description: "Automated deployment processes\nManaged Kubernetes clusters\nImproved system reliability to 99.9%"
    }]
  },
  david_brown: {
    personalInfo: {
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "(555) 567-8901",
      location: "Boston, MA",
      website: "davidbrown.dev",
      linkedin: "linkedin.com/in/davidbrown",
      github: "github.com/davidbrown"
    },
    summary: "Data engineer specializing in big data processing and machine learning pipelines.",
    experiences: [{
      jobTitle: "Data Engineer",
      company: "Data Analytics Corp",
      location: "Boston, MA",
      startDate: "Apr 2020",
      endDate: "",
      isCurrentJob: true,
      description: "Built data processing pipelines\nImplemented ML model deployment\nProcessed 10TB+ daily data"
    }]
  },
  
  // Marketing Professionals
  emily_davis: {
    personalInfo: {
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "(555) 678-9012",
      location: "Los Angeles, CA",
      website: "emilydavis.marketing",
      linkedin: "linkedin.com/in/emilydavis",
      github: ""
    },
    summary: "Digital marketing specialist with 4+ years driving customer acquisition and brand growth.",
    experiences: [{
      jobTitle: "Digital Marketing Manager",
      company: "Brand Builders",
      location: "Los Angeles, CA",
      startDate: "Jan 2022",
      endDate: "",
      isCurrentJob: true,
      description: "Increased lead generation by 65%\nManaged $1.5M marketing budget\nDeveloped social media strategy"
    }]
  },
  robert_wilson: {
    personalInfo: {
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      phone: "(555) 789-0123",
      location: "Chicago, IL",
      website: "robertwilson.marketing",
      linkedin: "linkedin.com/in/robertwilson",
      github: ""
    },
    summary: "Content marketing strategist focused on B2B lead generation and thought leadership.",
    experiences: [{
      jobTitle: "Content Marketing Manager",
      company: "B2B Solutions",
      location: "Chicago, IL",
      startDate: "Mar 2021",
      endDate: "",
      isCurrentJob: true,
      description: "Created content strategy\nIncreased organic traffic by 200%\nDeveloped thought leadership campaigns"
    }]
  }
};

// Generate additional 100+ mock profiles with realistic names
export const generateMockProfiles = () => {
  const firstNames = [
    "Alexander", "Isabella", "Christopher", "Sophia", "Matthew", "Emma", "Joshua", "Olivia", "Andrew", "Ava",
    "Daniel", "Emily", "Anthony", "Abigail", "Mark", "Madison", "Donald", "Mia", "Steven", "Chloe",
    "Kenneth", "Elizabeth", "Paul", "Ella", "Joshua", "Avery", "Kevin", "Sofia", "Brian", "Camila",
    "George", "Aria", "Timothy", "Scarlett", "Ronald", "Victoria", "Jason", "Grace", "Edward", "Luna",
    "Jeffrey", "Penelope", "Ryan", "Riley", "Jacob", "Zoey", "Gary", "Nora", "Nicholas", "Lily",
    "Eric", "Eleanor", "Jonathan", "Hannah", "Stephen", "Lillian", "Larry", "Addison", "Justin", "Aubrey",
    "Scott", "Ellie", "Brandon", "Stella", "Benjamin", "Natalie", "Samuel", "Zoe", "Gregory", "Leah",
    "Patrick", "Hazel", "Frank", "Violet", "Raymond", "Aurora", "Jack", "Savannah", "Dennis", "Audrey",
    "Jerry", "Brooklyn", "Tyler", "Bella", "Aaron", "Claire", "Henry", "Skylar", "Jose", "Lucy",
    "Douglas", "Paisley", "Adam", "Evelyn", "Nathan", "Anna", "Peter", "Caroline", "Zachary", "Nova",
    "Kyle", "Genesis", "Noah", "Emilia", "William", "Kennedy", "Jordan", "Samantha", "Jacob", "Maya"
  ];
  
  const lastNames = [
    "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez",
    "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee",
    "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
    "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
    "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez",
    "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart",
    "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson",
    "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson",
    "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price",
    "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell"
  ];
  
  const jobTitles = [
    "Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Manager",
    "Sales Representative", "Business Analyst", "Project Manager", "DevOps Engineer", "Quality Assurance",
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer", "Database Administrator",
    "System Administrator", "Network Engineer", "Security Analyst", "Cloud Architect", "Technical Writer",
    "Graphic Designer", "Content Creator", "Social Media Manager", "Digital Marketer", "SEO Specialist",
    "Customer Success Manager", "Account Executive", "Operations Manager", "HR Specialist", "Financial Analyst",
    "Accountant", "Legal Counsel", "Research Scientist", "Machine Learning Engineer", "AI Researcher",
    "Product Designer", "Brand Manager", "Event Coordinator", "Public Relations", "Content Strategist"
  ];
  
  const companies = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "Tesla", "Netflix", "Spotify", "Uber", "Airbnb",
    "Stripe", "Square", "PayPal", "Adobe", "Salesforce", "Oracle", "IBM", "Intel", "NVIDIA", "AMD",
    "Twitter", "LinkedIn", "GitHub", "Atlassian", "Slack", "Zoom", "DocuSign", "Shopify", "Twilio", "Datadog",
    "MongoDB", "Elastic", "Redis", "Cloudflare", "DigitalOcean", "Linode", "Heroku", "Vercel", "Netlify", "Auth0",
    "TechCorp", "InnovateLab", "DataSystems", "CloudTech", "StartupXYZ", "DevSolutions", "AI Innovations", "WebWorks",
    "MobileTech", "CyberSecure", "GrowthHacker", "ScaleUp", "FinTech Pro", "HealthTech", "EduTech Solutions"
  ];
  
  const cities = [
    "San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Boston, MA", "Los Angeles, CA",
    "Chicago, IL", "Miami, FL", "Denver, CO", "Atlanta, GA", "Portland, OR", "Nashville, TN",
    "Raleigh, NC", "Phoenix, AZ", "Salt Lake City, UT", "Minneapolis, MN", "Detroit, MI", "Philadelphia, PA",
    "San Diego, CA", "Tampa, FL", "Orlando, FL", "Charlotte, NC", "Dallas, TX", "Houston, TX"
  ];
  
  const profiles: any[] = [];
  
  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const location = cities[Math.floor(Math.random() * cities.length)];
    
    profiles.push({
      personalInfo: {
        name: fullName,
        email: email,
        phone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        location: location,
        website: `${firstName.toLowerCase()}${lastName.toLowerCase()}.dev`,
        linkedin: `linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        github: Math.random() > 0.3 ? `github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : ""
      },
      summary: `Experienced ${jobTitle.toLowerCase()} with ${Math.floor(Math.random() * 8) + 2}+ years of expertise in modern technologies and best practices.`,
      experiences: [{
        jobTitle: jobTitle,
        company: company,
        location: location,
        startDate: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][Math.floor(Math.random() * 6)]} ${2020 + Math.floor(Math.random() * 4)}`,
        endDate: "",
        isCurrentJob: true,
        description: `Delivered high-quality solutions\nCollaborated with cross-functional teams\nImproved system performance and user experience`
      }]
    });
  }
  
  return profiles;
};