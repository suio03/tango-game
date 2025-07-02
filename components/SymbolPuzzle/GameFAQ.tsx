import React from 'react';

export default function GameFAQ() {
  const faqs = [
    {
      question: "What is Tango Game Unlimited?",
      answer: "Tango Game Unlimited is the free, unlimited version of LinkedIn's popular daily Tango puzzle. It uses the exact same rules and gameplay that millions love on LinkedIn, but without the daily limit - play as many puzzles as you want, anytime!"
    },
    {
      question: "How is this different from LinkedIn's Tango Game?",
      answer: "LinkedIn limits you to one Tango puzzle per day. Here you can play unlimited puzzles anytime - same addictive gameplay, same logic rules, but no 24-hour waiting period. Plus, no LinkedIn account required!"
    },
    {
      question: "Is Tango Game Unlimited really free?",
      answer: "Yes! Tango Game Unlimited is completely free forever. No sign-ups, no subscriptions, no ads interrupting your gameplay. Just unlimited Tango puzzles whenever you want to play."
    },
    {
      question: "How do I play Tango Game?",
      answer: "Click on empty cells to place symbols. Each row and column must have equal numbers of both symbols, with no more than 2 consecutive identical symbols. Follow constraint indicators: = means same symbols, × means different symbols."
    },
    {
      question: "What difficulty levels are available?",
      answer: "Choose from 6×6 grids (easier, perfect for beginners) or 8×8 grids (harder, for experienced players). Both have the same Tango rules but different constraint densities and solving complexity."
    },
    {
      question: "Can I play on mobile devices?",
      answer: "Absolutely! Tango Game Unlimited works perfectly on phones, tablets, and desktop computers. The game automatically adapts to your screen size for the best playing experience."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! Unlike LinkedIn's version, you can start playing Tango Game Unlimited immediately. Your game statistics are saved locally on your device."
    },
    {
      question: "Are these the same rules as LinkedIn Tango?",
      answer: "Absolutely! 100% identical rules to LinkedIn's Tango puzzle. If you can solve LinkedIn's daily challenge, you'll feel right at home here. Same logic, same constraints, same satisfaction - just unlimited!"
    }
  ];

  return (
    <>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
            <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-sm text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
      
      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </>
  );
}