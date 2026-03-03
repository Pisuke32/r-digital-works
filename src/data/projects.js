const projects = [
  {
    id: 1,
    category: "Video Editing",
    title: "Professional Video Editing Portfolio",
    description: "High-quality video edits for YouTube and Social Media.",
    image: "/images/video-edit.png",
    reviews: [
      { client: "John Doe", rating: 5, comment: "Amazing editing skills!" },
      { client: "Sarah K.", rating: 4, comment: "Very creative work." }
    ],
    results: "100% Client Satisfaction",
    tools: ["Premiere Pro", "After Effects"]
  },
  {
    id: 2,
    category: "Email Marketing",
    title: "Email Campaign Management",
    description: "High conversion email marketing strategies.",
    image: "/images/email-mkt.png",
    reviews: [
      { client: "Mike R.", rating: 5, comment: "Open rates increased by 40%!" }
    ],
    results: "Average 35% Open Rate",
    tools: ["Mailchimp", "Klaviyo"]
  },
  {
    id: 3,
    category: "Meta Marketing",
    title: "Facebook & Instagram Ads",
    description: "Driving sales through targeted Meta Ads.",
    image: "/images/meta-ads.png",
    reviews: [
      { client: "Tech Store", rating: 5, comment: "ROAS was 4x!" }
    ],
    results: "Total Ad Spend Managed: $5000+",
    tools: ["Ads Manager", "Pixel"]
  }
];

export default projects;