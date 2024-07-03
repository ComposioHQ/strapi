import { getACtionsNTriggers, getFAQForTools, getToolsForUseCase, getUseCasesForTheme } from "./claude";
import { createTag } from "./strapi";
const useCaseTags = [
  {
    slug: "coding-review-assistant",
    name: "Coding Review Assistant",
    type: "usecasetype",
    description: "Analyzes code, detects errors, suggests improvements, and enhances code quality.",
  },
  {
    slug: "email-agent",
    name: "Email Agent",
    type: "usecasetype",
    description: "Manages emails, schedules responses, prioritizes messages, and organizes inbox content efficiently.",
  },
  {
    slug: "customer-support-agent",
    name: "Customer Support Agent",
    type: "usecasetype",
    description: "Handles customer inquiries, provides automated responses, escalates issues, and maintains a knowledge base.",
  },
  {
    slug: "personal-assistant",
    name: "Personal Assistant",
    type: "usecasetype",
    description: "Schedules appointments, sets reminders, manages tasks, and provides personalized recommendations.",
  },
  {
    slug: "sales-assistant",
    name: "Sales Assistant",
    type: "usecasetype",
    description: "Analyzes customer data, identifies sales opportunities, predicts behavior, and provides sales strategy insights.",
  },
  {
    slug: "healthcare-assistant",
    name: "Healthcare Assistant",
    type: "usecasetype",
    description: "Assists in diagnosing illnesses, analyzing medical records, recommending treatments, and providing patient care insights.",
  },
  {
    slug: "legal-assistant",
    name: "Legal Assistant",
    type: "usecasetype",
    description: "Researches case law, drafts legal documents, summarizes contracts, and provides legal advice.",
  },
  {
    slug: "hr-assistant",
    name: "HR Assistant",
    type: "usecasetype",
    description: "Automates recruitment processes, screens applicants, schedules interviews, manages employee data, and assists in workforce planning.",
  },
  {
    slug: "marketing-assistant",
    name: "Marketing Assistant",
    type: "usecasetype",
    description: "Analyzes market trends, segments audiences, recommends strategies, optimizes campaigns, and measures performance metrics.",
  },
  {
    slug: "financial-assistant",
    name: "Financial Assistant",
    type: "usecasetype",
    description: "Monitors financial markets, analyzes investment opportunities, manages finances, generates reports, and provides budgeting advice.",
  },
  {
    slug: "travel-assistant",
    name: "Travel Assistant",
    type: "usecasetype",
    description: "Recommends destinations, books travel arrangements, provides itineraries, suggests activities, and offers travel updates.",
  },
  {
    slug: "education-assistant",
    name: "Education Assistant",
    type: "usecasetype",
    description: "Provides personalized learning experiences, tutors in subjects, recommends educational resources, and tracks academic progress.",
  },
  {
    slug: "virtual-event-coordinator",
    name: "Virtual Event Coordinator",
    type: "usecasetype",
    description: "Plans virtual events, manages registrations, schedules sessions, handles technical support, and provides attendee engagement insights.",
  },
  {
    slug: "content-creation-assistant",
    name: "Content Creation Assistant",
    type: "usecasetype",
    description: "Generates content ideas, writes articles, edits text, optimizes SEO, and schedules content publication.",
  },
  {
    slug: "social-media-manager",
    name: "Social Media Manager",
    type: "usecasetype",
    description: "Manages social media accounts, schedules posts, analyzes engagement metrics, and suggests content strategies.",
  },
  {
    slug: "research-assistant",
    name: "Research Assistant",
    type: "usecasetype",
    description: "Conducts literature reviews, gathers data, analyzes findings, and summarizes research papers.",
  },
  {
    slug: "real-estate-agent",
    name: "Real Estate Agent",
    type: "usecasetype",
    description: "Recommends properties, schedules viewings, manages listings, negotiates contracts, and provides market analysis.",
  },
  {
    slug: "personal-finance-advisor",
    name: "Personal Finance Advisor",
    type: "usecasetype",
    description: "Creates budgets, tracks expenses, monitors investments, recommends financial products, and offers retirement planning advice.",
  },
  {
    slug: "event-planner",
    name: "Event Planner",
    type: "usecasetype",
    description: "Plans events, manages budgets, coordinates vendors, schedules activities, and oversees event logistics.",
  },
  {
    slug: "recipe-creator-and-nutritionist",
    name: "Recipe Creator and Nutritionist",
    type: "usecasetype",
    description: "Suggests recipes, calculates nutritional values, creates meal plans, and provides dietary advice.",
  },
  {
    slug: "fashion-stylist",
    name: "Fashion Stylist",
    type: "usecasetype",
    description: "Recommends outfits, suggests wardrobe combinations, tracks fashion trends, and provides shopping recommendations.",
  },
  {
    slug: "music-composer",
    name: "Music Composer",
    type: "usecasetype",
    description: "Generates musical compositions, arranges scores, mixes tracks, and assists in music production.",
  },
  {
    slug: "language-translator-and-interpreter",
    name: "Language Translator and Interpreter",
    type: "usecasetype",
    description: "Translates text, interprets conversations, provides language learning tips, and offers cultural insights.",
  },
  {
    slug: "environmental-advisor",
    name: "Environmental Advisor",
    type: "usecasetype",
    description: "Monitors environmental data, analyzes sustainability practices, recommends eco-friendly solutions, and educates on environmental issues.",
  },
  {
    slug: "fitness-coach",
    name: "Fitness Coach",
    type: "usecasetype",
    description: "Creates workout plans, tracks fitness progress, suggests exercises, and provides motivational tips.",
  },
  {
    slug: "home-automation-manager",
    name: "Home Automation Manager",
    type: "usecasetype",
    description: "Controls smart home devices, schedules routines, monitors energy usage, and ensures home security.",
  },
  {
    slug: "legal-compliance-advisor",
    name: "Legal Compliance Advisor",
    type: "usecasetype",
    description: "Ensures regulatory compliance, reviews policies, conducts audits, and provides compliance training.",
  },
  {
    slug: "pet-care-advisor",
    name: "Pet Care Advisor",
    type: "usecasetype",
    description: "Provides pet care tips, schedules vet appointments, recommends pet products, and tracks pet health records.",
  },
  {
    slug: "parenting-assistant",
    name: "Parenting Assistant",
    type: "usecasetype",
    description: "Offers parenting advice, schedules family activities, provides child development tips, and suggests educational resources.",
  },
  {
    slug: "gardening-consultant",
    name: "Gardening Consultant",
    type: "usecasetype",
    description: "Recommends plant varieties, schedules garden maintenance tasks, provides gardening tips, and identifies plant diseases.",
  },
];


(async () => {
    // const tools = await getACtionsNTriggers("salesforce", {});
    // const tools = await getToolsForUseCase("Developer productivity or coding review on github", {});
    // const useCases = await getUseCasesForTheme("Developer productivity", {});
    // //const faq = await getFAQForTools("Developer productivity", {});
    // console.log(useCases);

    for (const tag of useCaseTags) {
        console.log(tag);
        await createTag({
            slug: tag.slug,
            name: tag.name,
            type: tag.type,
            description: tag.description,
            faq: []
        })
}
})();
