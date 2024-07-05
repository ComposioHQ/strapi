import { generateFAQForExample } from '../claude';
import { createOrUpdatePlaygroundExample, getPlaygroundExample } from '../strapi';

const PLAYGROUND_EXAMPLES: {
    unique_id: string;
    name: string;
    description: string;
    config_url: string;
    imageURL: string;
    color: "purple";
}[] = [
    {
        unique_id: "ai-email-assistant",
        name: "AI Email Assistant",
        description: "An AI assistant that can help you draft, organize, and send emails more efficiently, as well as summarize emails, categorize emails, generate email templates, draft email responses, and more.",
        config_url: "https://example.com/ai-email-assistant",
        imageURL: "https://example.com/ai-email-assistant.png",
        color: "purple"
    },
    {
        unique_id: "ai-scheduling-assistant",
        name: "AI Scheduling Assistant",
        description: "An AI assistant that can help you schedule meetings, appointments, and events, as well as create project timelines, manage calendars, and send reminders.",
        config_url: "https://example.com/ai-scheduling-assistant",
        imageURL: "https://example.com/ai-scheduling-assistant.png",
        color: "purple"
    },
    {
        unique_id: "ai-personal-assistant",
        name: "AI Personal Assistant",
        description: "A versatile AI assistant that can help with a wide range of tasks, including scheduling, email management, research, data analysis, content creation, and more.",
        config_url: "https://example.com/ai-personal-assistant",
        imageURL: "https://example.com/ai-personal-assistant.png",
        color: "purple"
    },
    {
        unique_id: "ai-code-generator",
        name: "AI Code Generator",
        description: "An AI assistant that can generate code in various programming languages, including HTML, CSS, Python, and more, as well as review and test code.",
        config_url: "https://example.com/ai-code-generator",
        imageURL: "https://example.com/ai-code-generator.png",
        color: "purple"
    },
    {
        unique_id: "ai-workout-generator",
        name: "AI Workout Generator",
        description: "An AI assistant that can create personalized workout plans and routines based on your fitness goals, preferences, and abilities.",
        config_url: "https://example.com/ai-workout-generator",
        imageURL: "https://example.com/ai-workout-generator.png",
        color: "purple"
    },
    {
        unique_id: "ai-graph-generator",
        name: "AI Graph Generator",
        description: "An AI assistant that can generate various types of graphs and visualizations based on data input, making it easier to analyze and present information.",
        config_url: "https://example.com/ai-graph-generator",
        imageURL: "https://example.com/ai-graph-generator.png",
        color: "purple"
    },
    {
        unique_id: "ai-report-generator",
        name: "AI Report Generator",
        description: "An AI assistant that can generate comprehensive reports on various topics, including market trends, customer feedback, team performance, and more.",
        config_url: "https://example.com/ai-report-generator",
        imageURL: "https://example.com/ai-report-generator.png",
        color: "purple"
    },
    {
        unique_id: "google-sheets-formula-generator",
        name: "Google Sheets Formula Generator",
        description: "An AI assistant that can generate complex formulas and functions for Google Sheets, making data analysis and calculations more efficient.",
        config_url: "https://example.com/google-sheets-formula-generator",
        imageURL: "https://example.com/google-sheets-formula-generator.png",
        color: "purple"
    },
    {
        unique_id: "book-summary-generator",
        name: "Book Summary Generator",
        description: "An AI assistant that can generate concise and insightful summaries of books, making it easier to quickly grasp the key ideas and concepts.",
        config_url: "https://example.com/book-summary-generator",
        imageURL: "https://example.com/book-summary-generator.png",
        color: "purple"
    },
    {
        unique_id: "elevator-pitch-generator",
        name: "Elevator Pitch Generator",
        description: "An AI assistant that can help you craft compelling and persuasive elevator pitches for your business, product, or idea.",
        config_url: "https://example.com/elevator-pitch-generator",
        imageURL: "https://example.com/elevator-pitch-generator.png",
        color: "purple"
    },
    {
        unique_id: "pdf-analyzer-ai",
        name: "PDF Analyzer AI",
        description: "An AI assistant that can analyze and extract key information from PDF documents, making it easier to process and organize large amounts of data.",
        config_url: "https://example.com/pdf-analyzer-ai",
        imageURL: "https://example.com/pdf-analyzer-ai.png",
        color: "purple"
    },
    {
        unique_id: "email-summarizer-ai",
        name: "Email Summarizer AI",
        description: "An AI assistant that can summarize long email threads, making it easier to quickly grasp the key points and action items.",
        config_url: "https://example.com/email-summarizer-ai",
        imageURL: "https://example.com/email-summarizer-ai.png",
        color: "purple"
    },
    {
        unique_id: "meeting-notes-generator",
        name: "Meeting Notes Generator",
        description: "An AI assistant that can generate comprehensive and organized meeting notes, including action items and key decisions, based on audio or text input.",
        config_url: "https://example.com/meeting-notes-generator",
        imageURL: "https://example.com/meeting-notes-generator.png",
        color: "purple"
    },
    {
        unique_id: "expense-report-generator",
        name: "Expense Report Generator",
        description: "An AI assistant that can generate expense reports based on receipts and other input, making it easier to track and manage business expenses.",
        config_url: "https://example.com/expense-report-generator",
        imageURL: "https://example.com/expense-report-generator.png",
        color: "purple"
    },
    {
        unique_id: "customer-feedback-analyzer",
        name: "Customer Feedback Analyzer",
        description: "An AI assistant that can analyze and provide insights from customer feedback, reviews, and surveys, helping businesses improve their products and services.",
        config_url: "https://example.com/customer-feedback-analyzer",
        imageURL: "https://example.com/customer-feedback-analyzer.png",
        color: "purple"
    },
    {
        unique_id: "ai-interview-question-generator",
        name: "AI Interview Question Generator",
        description: "An AI assistant that can generate relevant and insightful interview questions based on job descriptions and candidate profiles, helping streamline the hiring process.",
        config_url: "https://example.com/ai-interview-question-generator",
        imageURL: "https://example.com/ai-interview-question-generator.png",
        color: "purple"
    },
    {
        unique_id: "project-timeline-creator",
        name: "Project Timeline Creator",
        description: "An AI assistant that can create detailed project timelines based on task lists, dependencies, and resource availability, helping teams stay organized and on track.",
        config_url: "https://example.com/project-timeline-creator",
        imageURL: "https://example.com/project-timeline-creator.png",
        color: "purple"
    },
    {
        unique_id: "ai-meeting-scheduler",
        name: "AI Meeting Scheduler",
        description: "An AI assistant that can schedule meetings based on attendee availability, location, and other preferences, making it easier to coordinate across teams and organizations.",
        config_url: "https://example.com/ai-meeting-scheduler",
        imageURL: "https://example.com/ai-meeting-scheduler.png",
        color: "purple"
    },
    {
        unique_id: "automated-invoice-generator",
        name: "Automated Invoice Generator",
        description: "An AI assistant that can generate invoices based on project details, hours worked, and other input, streamlining the billing process for businesses.",
        config_url: "https://example.com/automated-invoice-generator",
        imageURL: "https://example.com/automated-invoice-generator.png",
        color: "purple"
    },
    {
        unique_id: "ai-email-response-drafter",
        name: "AI Email Response Drafter",
        description: "An AI assistant that can draft professional and contextually relevant email responses based on the original message and any provided context or instructions.",
        config_url: "https://example.com/ai-email-response-drafter",
        imageURL: "https://example.com/ai-email-response-drafter.png",
        color: "purple"
    },
    {
        unique_id: "database-query-generator",
        name: "Database Query Generator",
        description: "An AI assistant that can generate SQL queries based on natural language input, making it easier to interact with and analyze database data.",
        config_url: "https://example.com/database-query-generator",
        imageURL: "https://example.com/database-query-generator.png",
        color: "purple"
    },
    {
        unique_id: "ai-content-calendar-planner",
        name: "AI Content Calendar Planner",
        description: "An AI assistant that can help plan and organize content calendars for social media, blogs, and other channels, ensuring a consistent and strategic content strategy.",
        config_url: "https://example.com/ai-content-calendar-planner",
        imageURL: "https://example.com/ai-content-calendar-planner.png",
        color: "purple"
    },
    {
        unique_id: "ai-customer-service-chatbot",
        name: "AI Customer Service Chatbot",
        description: "An AI-powered chatbot that can provide personalized and efficient customer support, answering common questions and resolving issues in real-time.",
        config_url: "https://example.com/ai-customer-service-chatbot",
        imageURL: "https://example.com/ai-customer-service-chatbot.png",
        color: "purple"
    },
    {
        unique_id: "sentiment-analysis-reporter",
        name: "Sentiment Analysis Reporter",
        description: "An AI assistant that can analyze and report on the sentiment expressed in text data, such as customer reviews, social media posts, and survey responses.",
        config_url: "https://example.com/sentiment-analysis-reporter",
        imageURL: "https://example.com/sentiment-analysis-reporter.png",
        color: "purple"
    },
    {
        unique_id: "ai-code-reviewer",
        name: "AI Code Reviewer",
        description: "An AI assistant that can review code for quality, security, and best practices, providing feedback and suggestions for improvement.",
        config_url: "https://example.com/ai-code-reviewer",
        imageURL: "https://example.com/ai-code-reviewer.png",
        color: "purple"
    },
    {
        unique_id: "ai-meeting-action-item-extractor",
        name: "AI Meeting Action Item Extractor",
        description: "An AI assistant that can extract and organize action items from meeting notes or transcripts, making it easier to track and follow up on tasks and responsibilities.",
        config_url: "https://example.com/ai-meeting-action-item-extractor",
        imageURL: "https://example.com/ai-meeting-action-item-extractor.png",
        color: "purple"
    },
    {
        unique_id: "ai-email-categorizer",
        name: "AI Email Categorizer",
        description: "An AI assistant that can automatically categorize and organize emails based on their content and context, helping to keep inboxes tidy and prioritize important messages.",
        config_url: "https://example.com/ai-email-categorizer",
        imageURL: "https://example.com/ai-email-categorizer.png",
        color: "purple"
    },
    {
        unique_id: "ai-resume-screener",
        name: "AI Resume Screener",
        description: "An AI assistant that can screen and rank resumes based on job requirements and candidate qualifications, streamlining the recruitment process for businesses.",
        config_url: "https://example.com/ai-resume-screener",
        imageURL: "https://example.com/ai-resume-screener.png",
        color: "purple"
    },
    {
        unique_id: "ai-meeting-summarizer",
        name: "AI Meeting Summarizer",
        description: "An AI assistant that can generate concise and insightful summaries of meetings, capturing key discussions, decisions, and action items.",
        config_url: "https://example.com/ai-meeting-summarizer",
        imageURL: "https://example.com/ai-meeting-summarizer.png",
        color: "purple"
    },
    {
        unique_id: "automated-proofreading-assistant",
        name: "Automated Proofreading Assistant",
        description: "An AI assistant that can proofread and correct text for grammar, spelling, and style errors, ensuring high-quality written content.",
        config_url: "https://example.com/automated-proofreading-assistant",
        imageURL: "https://example.com/automated-proofreading-assistant.png",
        color: "purple"
    },
    {
        unique_id: "automated-email-template-creator",
        name: "Automated Email Template Creator",
        description: "An AI assistant that can generate customizable email templates for various purposes, such as marketing campaigns, newsletters, and transactional emails.",
        config_url: "https://example.com/automated-email-template-creator",
        imageURL: "https://example.com/automated-email-template-creator.png",
        color: "purple"
    },
    {
        unique_id: "automated-data-visualization-creator",
        name: "Automated Data Visualization Creator",
        description: "An AI assistant that can generate insightful and visually appealing data visualizations, such as charts, graphs, and dashboards, based on input data.",
        config_url: "https://example.com/automated-data-visualization-creator",
        imageURL: "https://example.com/automated-data-visualization-creator.png",
        color: "purple"
    },
    {
        unique_id: "ai-market-trend-analyzer",
        name: "AI Market Trend Analyzer",
        description: "An AI assistant that can analyze and report on market trends, consumer behavior, and industry developments, providing valuable insights for businesses and investors.",
        config_url: "https://example.com/ai-market-trend-analyzer",
        imageURL: "https://example.com/ai-market-trend-analyzer.png",
        color: "purple"
    },
    {
        unique_id: "automated-meeting-scheduler",
        name: "Automated Meeting Scheduler",
        description: "An AI assistant that can schedule meetings based on attendee availability, location, and other preferences, making it easier to coordinate across teams and organizations.",
        config_url: "https://example.com/automated-meeting-scheduler",
        imageURL: "https://example.com/automated-meeting-scheduler.png",
        color: "purple"
    },
    {
        unique_id: "ai-performance-review-generator",
        name: "AI Performance Review Generator",
        description: "An AI assistant that can generate comprehensive and objective performance reviews for employees, based on input from managers, peers, and other relevant data.",
        config_url: "https://example.com/ai-performance-review-generator",
        imageURL: "https://example.com/ai-performance-review-generator.png",
        color: "purple"
    },
    {
        unique_id: "github-issue-prioritizer",
        name: "GitHub Issue Prioritizer",
        description: "An AI assistant that can prioritize and triage GitHub issues based on their severity, impact, and other factors, helping development teams focus on the most critical tasks.",
        config_url: "https://example.com/github-issue-prioritizer",
        imageURL: "https://example.com/github-issue-prioritizer.png",
        color: "purple"
    },
    {
        unique_id: "notion-google-calendar-integrator",
        name: "Notion-Google Calendar Integrator",
        description: "An AI assistant that can integrate Notion tasks and events with Google Calendar, helping users stay organized and on top of their schedules.",
        config_url: "https://example.com/notion-google-calendar-integrator",
        imageURL: "https://example.com/notion-google-calendar-integrator.png",
        color: "purple"
    },
    {
        unique_id: "multi-source-research-assistant",
        name: "Multi-Source Research Assistant",
        description: "An AI assistant that can gather and synthesize information from multiple sources, such as academic journals, news articles, and online databases, to support research projects.",
        config_url: "https://example.com/multi-source-research-assistant",
        imageURL: "https://example.com/multi-source-research-assistant.png",
        color: "purple"
    },
    {
        unique_id: "slack-github-pr-notifier",
        name: "Slack-GitHub PR Notifier",
        description: "An AI assistant that can monitor GitHub repositories and send notifications to Slack channels when new pull requests are created or updated, streamlining code review processes.",
        config_url: "https://example.com/slack-github-pr-notifier",
        imageURL: "https://example.com/slack-github-pr-notifier.png",
        color: "purple"
    },
    {
        unique_id: "ai-document-summarizer-and-organizer",
        name: "AI Document Summarizer and Organizer",
        description: "An AI assistant that can summarize and organize large documents, such as research papers or legal contracts, making it easier to quickly grasp key information and insights.",
        config_url: "https://example.com/ai-document-summarizer-and-organizer",
        imageURL: "https://example.com/ai-document-summarizer-and-organizer.png",
        color: "purple"
    },
    {
        unique_id: "automated-bug-tracker",
        name: "Automated Bug Tracker",
        description: "An AI assistant that can automatically track and prioritize software bugs, helping development teams stay on top of issues and improve code quality.",
        config_url: "https://example.com/automated-bug-tracker",
        imageURL: "https://example.com/automated-bug-tracker.png",
        color: "purple"
    },
    {
        unique_id: "ai-enhanced-project-manager",
        name: "AI-Enhanced Project Manager",
        description: "An AI assistant that can assist with project planning, task assignment, and progress tracking, providing insights and recommendations to help teams stay on schedule and within budget.",
        config_url: "https://example.com/ai-enhanced-project-manager",
        imageURL: "https://example.com/ai-enhanced-project-manager.png",
        color: "purple"
    },
    {
        unique_id: "smart-meeting-scheduler-and-reminder",
        name: "Smart Meeting Scheduler and Reminder",
        description: "An AI assistant that can schedule meetings based on attendee availability and preferences, and send reminders to ensure everyone stays on track.",
        config_url: "https://example.com/smart-meeting-scheduler-and-reminder",
        imageURL: "https://example.com/smart-meeting-scheduler-and-reminder.png",
        color: "purple"
    },
    {
        unique_id: "collaborative-research-paper-writer",
        name: "Collaborative Research Paper Writer",
        description: "An AI assistant that can facilitate the collaborative writing of research papers, providing suggestions, tracking changes, and ensuring consistency across sections and authors.",
        config_url: "https://example.com/collaborative-research-paper-writer",
        imageURL: "https://example.com/collaborative-research-paper-writer.png",
        color: "purple"
    },
    {
        unique_id: "ai-powered-code-reviewer-and-tester",
        name: "AI-Powered Code Reviewer and Tester",
        description: "An AI assistant that can review code for potential issues, suggest improvements, and automatically generate and run tests, helping to ensure code quality and catch bugs early in the development process.",
        config_url: "https://example.com/ai-powered-code-reviewer-and-tester",
        imageURL: "https://example.com/ai-powered-code-reviewer-and-tester.png",
        color: "purple"
    },
    {
        unique_id: "discord-server-moderator-and-analyzer",
        name: "Discord Server Moderator and Analyzer",
        description: "An AI assistant that can moderate Discord servers, enforcing rules and guidelines, and provide insights and analytics on server activity and user engagement.",
        config_url: "https://example.com/discord-server-moderator-and-analyzer",
        imageURL: "https://example.com/discord-server-moderator-and-analyzer.png",
        color: "purple"
    },
    {
        unique_id: "intelligent-code-dependency-analyzer",
        name: "Intelligent Code Dependency Analyzer",
        description: "An AI assistant that can analyze code dependencies and provide insights on potential issues, such as circular dependencies or outdated libraries, helping to improve code maintainability and reduce technical debt.",
        config_url: "https://example.com/intelligent-code-dependency-analyzer",
        imageURL: "https://example.com/intelligent-code-dependency-analyzer.png",
        color: "purple"
    },
    {
        unique_id: "automated-project-status-reporter",
        name: "Automated Project Status Reporter",
        description: "An AI assistant that can generate comprehensive project status reports, consolidating information from various sources and providing stakeholders with up-to-date insights on progress, risks, and issues.",
        config_url: "https://example.com/automated-project-status-reporter",
        imageURL: "https://example.com/automated-project-status-reporter.png",
        color: "purple"
    },
    {
        unique_id: "smart-research-paper-formatter",
        name: "Smart Research Paper Formatter",
        description: "An AI assistant that can format research papers according to specific style guides and journal requirements, ensuring consistency and adherence to formatting rules.",
        config_url: "https://example.com/smart-research-paper-formatter",
        imageURL: "https://example.com/smart-research-paper-formatter.png",
        color: "purple"
    },
    {
        unique_id: "ai-powered-team-performance-analyzer",
        name: "AI-Powered Team Performance Analyzer",
        description: "An AI assistant that can analyze team performance metrics, such as productivity, collaboration, and communication, and provide insights and recommendations for improvement.",
        config_url: "https://example.com/ai-powered-team-performance-analyzer",
        imageURL: "https://example.com/ai-powered-team-performance-analyzer.png",
        color: "purple"
    },
    {
        unique_id: "intelligent-meeting-action-item-tracker",
        name: "Intelligent Meeting Action Item Tracker",
        description: "An AI assistant that can track and follow up on action items from meetings, ensuring tasks are assigned, deadlines are set, and progress is monitored.",
        config_url: "https://example.com/intelligent-meeting-action-item-tracker",
        imageURL: "https://example.com/intelligent-meeting-action-item-tracker.png",
        color: "purple"
    },
    {
        unique_id: "automated-code-documentation-generator",
        name: "Automated Code Documentation Generator",
        description: "An AI assistant that can generate comprehensive code documentation, including API references, usage examples, and inline comments, helping to improve code readability and maintainability.",
        config_url: "https://example.com/automated-code-documentation-generator",
        imageURL: "https://example.com/automated-code-documentation-generator.png",
        color: "purple"
    }
];

// DON'T CHANGE THE BELOW CODE
async function main() {
    for (const example of PLAYGROUND_EXAMPLES) {
        console.log("Creating tool", example.unique_id);

        const playgroundExample = await getPlaygroundExample(example.unique_id);
        let FAQ = await generateFAQForExample(example.unique_id);
        console.log("FAQ", FAQ.length);
        if (!playgroundExample) {
            await createOrUpdatePlaygroundExample({...example, faq: FAQ},playgroundExample?.id)
        }
    }

}

main();

