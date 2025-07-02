import React from 'react';

export default function GameStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": "Tango Game Unlimited",
    "description": "The unlimited version of LinkedIn's hugely popular daily Tango puzzle! Same addictive logic gameplay that millions love, but play as many as you want. Fill grids with circles and crescents following constraint rules. Completely free, no daily limits.",
    "genre": ["Puzzle Game", "Logic Game", "Brain Training"],
    "gamePlatform": "Web Browser",
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "url": "https://tango-game-unlimited.com",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "keywords": "tango game unlimited, linkedin tango game, tango puzzle free, unlimited tango, logic puzzle, constraint puzzle, symbol puzzle",
    "gameItem": [
      {
        "@type": "Thing",
        "name": "Circle Symbol",
        "description": "One of two symbols used in Tango Game represented as ☀️ or circle"
      },
      {
        "@type": "Thing", 
        "name": "Crescent Symbol",
        "description": "One of two symbols used in Tango Game represented as 🌙 or crescent"
      }
    ],
    "playMode": ["SinglePlayer"],
    "numberOfPlayers": 1,
    "contentRating": "Everyone",
    "educationalUse": "Logic and critical thinking skills development",
    "learningResourceType": "Interactive Game",
    "interactivityType": "active",
    "typicalAgeRange": "8-99",
    "gameLocation": {
      "@type": "Place",
      "name": "Online Web Browser"
    },
    "accessibilityFeature": [
      "keyboard navigation",
      "mouse interaction", 
      "touch interaction",
      "unlimited plays",
      "no registration required"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "LinkedIn Tango Game players seeking unlimited play"
    },
    "instruction": [
      {
        "@type": "HowTo",
        "name": "How to Play Tango Game Unlimited",
        "description": "Complete guide to playing Tango Game - the unlimited version of LinkedIn's popular daily puzzle",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Fill the Grid",
            "text": "Fill each cell with either a circle (☀️) or crescent (🌙) symbol"
          },
          {
            "@type": "HowToStep", 
            "name": "Balance Rule",
            "text": "Each row and column must have equal numbers of circles and crescents"
          },
          {
            "@type": "HowToStep",
            "name": "Adjacent Rule", 
            "text": "No more than 2 consecutive identical symbols in any direction"
          },
          {
            "@type": "HowToStep",
            "name": "Constraint Rules",
            "text": "Cells connected by = must contain the same symbol, cells connected by × must contain different symbols"
          }
        ]
      }
    ],
    "review": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247",
      "bestRating": "5"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}