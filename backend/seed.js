const mongoose = require('mongoose');
require('dotenv').config();
const SearchResult = require('./models/SearchResult');

const sampleResults = [
    {
        title: "Google",
        url: "https://www.google.com",
        description: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
        domain: "google.com"
    },
    {
        title: "Wikipedia, the free encyclopedia",
        url: "https://www.wikipedia.org",
        description: "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.",
        domain: "wikipedia.org"
    },
    {
        title: "React – A JavaScript library for building user interfaces",
        url: "https://reactjs.org",
        description: "A JavaScript library for building user interfaces. Declarative. React makes it painless to create interactive UIs. Component-Based.",
        domain: "reactjs.org"
    },
    {
        title: "GitHub: Let's build from here",
        url: "https://github.com",
        description: "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories...",
        domain: "github.com"
    },
    {
        title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
        url: "https://stackoverflow.com",
        description: "Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.",
        domain: "stackoverflow.com"
    },
    {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        description: "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
        domain: "developer.mozilla.org"
    },
    {
        title: "Node.js",
        url: "https://nodejs.org",
        description: "Node.js® is an open-source, cross-platform JavaScript runtime environment.",
        domain: "nodejs.org"
    },
    {
        title: "MongoDB: The Developer Data Platform",
        url: "https://www.mongodb.com",
        description: "Build faster. Build smarter. Get your ideas to market faster with a developer data platform built on the leading modern database.",
        domain: "mongodb.com"
    },
    {
        title: "Apple",
        url: "https://www.apple.com",
        description: "Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, and expert...",
        domain: "apple.com"
    },
    {
        title: "Amazon.com. Spend less. Smile more.",
        url: "https://www.amazon.com",
        description: "Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime. Enjoy low prices and great deals on the largest selection of...",
        domain: "amazon.com"
    }
];

const seedDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI is missing in .env file");
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('Connected!');

        console.log('Clearing existing SearchResult data...');
        await SearchResult.deleteMany({});
        
        console.log('Inserting sample search results...');
        await SearchResult.insertMany(sampleResults);
        
        console.log('Database seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
